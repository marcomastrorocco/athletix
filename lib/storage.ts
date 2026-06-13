/**
 * Storage abstraction:
 *   - Local dev (no BLOB_READ_WRITE_TOKEN): reads/writes from filesystem
 *   - Vercel (token present): reads/writes from Vercel Blob
 *
 * Bundled JSON files in `data/` and images in `public/` act as fallback
 * defaults — admin writes only go to Blob in production, so a fresh
 * deployment reads bundled defaults until first save.
 */
import { promises as fs } from "fs";
import path from "path";
import { put, list, del, type ListBlobResult } from "@vercel/blob";

const dataDir = path.join(process.cwd(), "data");
const publicDir = path.join(process.cwd(), "public");
const uploadsDir = path.join(publicDir, "uploads");

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ---------- Git-backed content (single source of truth = the repo) ----------
//
// When GH_CONTENT_TOKEN + GH_CONTENT_REPO are set (on Vercel), admin saves
// of content JSON are committed straight to the GitHub repo, and reads come
// from the deployed bundle (which always reflects the latest commit). This
// means admin edits and local `git push` edits share ONE source — no merge.
//
// These files must NEVER land in the public repo (password hash, edit log),
// so they always use Blob (or local fs in dev), never GitHub.
const GIT_SENSITIVE = new Set(["admin.json", "activity.json"]);

type GitHubCfg = { token: string; owner: string; name: string; branch: string };

function githubConfig(): GitHubCfg | null {
  const token = process.env.GH_CONTENT_TOKEN;
  const repo = process.env.GH_CONTENT_REPO; // "owner/name"
  if (!token || !repo) return null;
  const [owner, name] = repo.split("/");
  if (!owner || !name) return null;
  return { token, owner, name, branch: process.env.GH_CONTENT_BRANCH || "main" };
}

function githubEnabled(): boolean {
  return !!githubConfig();
}

function ghContents(
  cfg: GitHubCfg,
  filePath: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(
    `https://api.github.com/repos/${cfg.owner}/${cfg.name}/contents/${filePath}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    }
  );
}

/** Create/update data/<key> in the repo. Retries on SHA races. */
async function commitJson(
  cfg: GitHubCfg,
  key: string,
  body: string
): Promise<void> {
  const filePath = `data/${key}`;
  const contentB64 = Buffer.from(body, "utf8").toString("base64");
  for (let attempt = 0; attempt < 3; attempt++) {
    let sha: string | undefined;
    const head = await ghContents(cfg, `${filePath}?ref=${cfg.branch}`);
    if (head.status === 200) sha = (await head.json()).sha;
    else if (head.status !== 404)
      throw new Error(`GitHub read failed (${head.status})`);

    const res = await ghContents(cfg, filePath, {
      method: "PUT",
      body: JSON.stringify({
        message: `Update ${key} via admin`,
        content: contentB64,
        branch: cfg.branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (res.ok) return;
    if (res.status === 409 || res.status === 422) continue; // SHA race — retry
    throw new Error(`GitHub commit failed (${res.status}): ${await res.text()}`);
  }
  throw new Error("GitHub commit failed after retries");
}

async function findBlob(pathname: string) {
  // list() returns up to 1000 by default; for a small CMS this is plenty.
  let cursor: string | undefined;
  do {
    const result: ListBlobResult = await list({ prefix: pathname, cursor });
    const match = result.blobs.find((b) => b.pathname === pathname);
    if (match) return match;
    cursor = result.cursor;
    if (!result.hasMore) break;
  } while (cursor);
  return null;
}

// ---------- JSON ----------

async function readBundledJson<T>(key: string): Promise<T> {
  const raw = await fs.readFile(path.join(dataDir, key), "utf8");
  return JSON.parse(raw) as T;
}

async function readFromBlob<T>(key: string): Promise<T | null> {
  try {
    const blob = await findBlob(`data/${key}`);
    if (blob) {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (res.ok) return (await res.json()) as T;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export async function readJson<T>(key: string): Promise<T> {
  // Sensitive files (password hash, log) live in Blob, never git.
  if (GIT_SENSITIVE.has(key)) {
    if (blobEnabled()) {
      const fromBlob = await readFromBlob<T>(key);
      if (fromBlob !== null) return fromBlob;
    }
    return readBundledJson<T>(key);
  }
  // Git-backed: the deployed bundle IS the latest committed content.
  if (githubEnabled()) {
    return readBundledJson<T>(key);
  }
  // Legacy/transition (no git token yet): Blob if configured, else bundled.
  if (blobEnabled()) {
    const fromBlob = await readFromBlob<T>(key);
    if (fromBlob !== null) return fromBlob;
  }
  return readBundledJson<T>(key);
}

export async function writeJson<T>(key: string, data: T): Promise<void> {
  const body = JSON.stringify(data, null, 2) + "\n";
  // Content -> commit to the git repo (single source of truth) when set up.
  if (!GIT_SENSITIVE.has(key)) {
    const cfg = githubConfig();
    if (cfg) {
      await commitJson(cfg, key, body);
      return;
    }
  }
  // Sensitive files, or git not configured yet: Blob if available.
  if (blobEnabled()) {
    await put(`data/${key}`, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  // Local dev: filesystem.
  await fs.mkdir(path.dirname(path.join(dataDir, key)), { recursive: true });
  await fs.writeFile(path.join(dataDir, key), body, "utf8");
}

export async function tryReadJson<T>(key: string): Promise<T | null> {
  try {
    return await readJson<T>(key);
  } catch {
    return null;
  }
}

/** List JSON keys under a directory prefix (e.g., "pages"). */
export async function listJsonKeys(prefix: string): Promise<string[]> {
  const out = new Set<string>();
  // Bundled file system entries
  try {
    const entries = await fs.readdir(path.join(dataDir, prefix));
    for (const f of entries) {
      if (f.endsWith(".json")) out.add(`${prefix}/${f}`);
    }
  } catch {
    /* directory may not exist */
  }
  // Blob entries (only on Vercel)
  if (blobEnabled()) {
    try {
      let cursor: string | undefined;
      do {
        const result = await list({ prefix: `data/${prefix}/`, cursor });
        for (const b of result.blobs) {
          if (!b.pathname.endsWith(".json")) continue;
          // strip the leading "data/" so callers get the storage-layer key
          out.add(b.pathname.replace(/^data\//, ""));
        }
        cursor = result.cursor;
        if (!result.hasMore) break;
      } while (cursor);
    } catch {
      /* ignore */
    }
  }
  return Array.from(out).sort();
}

// ---------- Uploads (images/files) ----------

export type UploadInfo = {
  name: string;
  url: string;
  size: number;
  mtime: string;
};

function safeUploadName(filename: string): string | null {
  if (!filename) return null;
  if (
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    return null;
  }
  return filename;
}

export async function saveUpload(
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<{ url: string; name: string }> {
  const safe = safeUploadName(filename);
  if (!safe) throw new Error("Invalid filename");

  if (blobEnabled()) {
    const result = await put(`uploads/${safe}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return { url: result.url, name: safe };
  }

  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, safe), buffer);
  return { url: `/uploads/${safe}`, name: safe };
}

async function listLocalDir(
  absDir: string,
  urlPrefix: string
): Promise<UploadInfo[]> {
  try {
    const names = await fs.readdir(absDir);
    const out: UploadInfo[] = [];
    for (const n of names) {
      const full = path.join(absDir, n);
      const stat = await fs.stat(full);
      if (!stat.isFile()) continue;
      out.push({
        name: n,
        url: `${urlPrefix}/${n}`,
        size: stat.size,
        mtime: stat.mtime.toISOString(),
      });
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * List all uploaded/usable images. Combines bundled `/public/image` and
 * `/public/uploads` directories with Blob-stored `uploads/*` entries.
 * Items live under multiple namespaces:
 *   - bundled  → URL like `/image/foo.webp` (served by Next /public)
 *   - uploads  → URL like `/uploads/foo.png` locally, or Blob URL on Vercel
 */
export async function listMedia(): Promise<UploadInfo[]> {
  const bundledImage = await listLocalDir(
    path.join(publicDir, "image"),
    "/image"
  );
  const localUploads = await listLocalDir(uploadsDir, "/uploads");

  const blobUploads: UploadInfo[] = [];
  if (blobEnabled()) {
    try {
      let cursor: string | undefined;
      do {
        const result = await list({ prefix: "uploads/", cursor });
        for (const b of result.blobs) {
          const name = b.pathname.replace(/^uploads\//, "");
          blobUploads.push({
            name,
            url: b.url,
            size: b.size,
            mtime:
              typeof b.uploadedAt === "string"
                ? b.uploadedAt
                : new Date(b.uploadedAt).toISOString(),
          });
        }
        cursor = result.cursor;
        if (!result.hasMore) break;
      } while (cursor);
    } catch {
      /* ignore */
    }
  }

  // Dedupe: if a file is both in local uploads and blob (during local dev with
  // both set up), prefer blob. Bundled /image is a separate namespace, kept.
  const uploadMap = new Map<string, UploadInfo>();
  for (const u of localUploads) uploadMap.set(u.name, u);
  for (const u of blobUploads) uploadMap.set(u.name, u);

  const all = [...bundledImage, ...uploadMap.values()];
  return all.sort((a, b) => (a.mtime < b.mtime ? 1 : -1));
}

export async function deleteUpload(name: string): Promise<void> {
  const safe = safeUploadName(name);
  if (!safe) throw new Error("Invalid filename");

  if (blobEnabled()) {
    const match = await findBlob(`uploads/${safe}`);
    if (match) {
      await del(match.url);
      return;
    }
  }
  // fall through to fs in case it was an old local upload
  try {
    await fs.unlink(path.join(uploadsDir, safe));
  } catch {
    if (!blobEnabled()) throw new Error("File not found");
  }
}

export async function renameUpload(
  from: string,
  to: string
): Promise<string> {
  const safeFrom = safeUploadName(from);
  const safeTo = safeUploadName(to);
  if (!safeFrom || !safeTo) throw new Error("Invalid filename");

  if (blobEnabled()) {
    const src = await findBlob(`uploads/${safeFrom}`);
    if (!src) throw new Error("Source not found");
    const data = await fetch(src.url);
    if (!data.ok) throw new Error("Failed to read source");
    const buf = Buffer.from(await data.arrayBuffer());
    const result = await put(`uploads/${safeTo}`, buf, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: data.headers.get("content-type") ?? undefined,
    });
    await del(src.url);
    return result.url;
  }

  await fs.rename(
    path.join(uploadsDir, safeFrom),
    path.join(uploadsDir, safeTo)
  );
  return `/uploads/${safeTo}`;
}

export function isBlobEnabled(): boolean {
  return blobEnabled();
}
