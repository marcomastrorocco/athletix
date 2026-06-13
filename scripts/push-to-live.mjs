/**
 * push-to-live.mjs
 * ------------------------------------------------------------------
 * The REVERSE of sync-from-live.mjs, with a 3-WAY MERGE so the dev's
 * code changes and the client's live admin edits CO-EXIST.
 *
 * For each data file it merges three versions:
 *   base   = the repo version BEFORE this change   (git, via --base-ref)
 *   ours   = the current repo version              (your code change)
 *   theirs = the current LIVE version              (Vercel Blob = client edits)
 *
 * The result starts from `theirs` (so nothing the client edited is lost)
 * and applies ONLY what you changed (base -> ours diff) on top. Objects
 * merge per-section; arrays/scalars are atomic (your value wins only where
 * you actually changed it; on a direct conflict, your code wins).
 *
 * Usage:
 *   npm run push-live                      # merge-push all data/*.json
 *   npm run push-live site.json            # merge-push only site.json (header/nav)
 *   npm run push-live -- --overwrite site.json   # replace live (no merge)
 *   npm run push-live -- --base-ref=<sha> site.json
 *
 * Token (write needs it): env BLOB_READ_WRITE_TOKEN, or a one-line
 * `.blob-token.local` file (git-ignored). CI passes it via env.
 * ------------------------------------------------------------------
 */
import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();

// Public Blob store base for this project (same as sync-from-live).
const BLOB_BASE = "https://o0aibyc5xwhg4z00.public.blob.vercel-storage.com";

// Never push secrets / server-managed state to live.
const SKIP = new Set(["admin.json", "activity.json"]);

async function readToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN.trim();
  try {
    const raw = await fs.readFile(path.join(root, ".blob-token.local"), "utf8");
    return raw.trim() || null;
  } catch {
    return null;
  }
}

const isPlainObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v);
const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * 3-way merge. Result starts from `theirs` (live/client) and applies only
 * the changes the dev made (base -> ours). Objects merge per-key; arrays
 * and scalars are atomic.
 */
function merge3(base, ours, theirs) {
  // Leaf (array/scalar) or type mismatch: dev wins only if they changed it.
  if (!isPlainObject(ours) || !isPlainObject(theirs)) {
    return deepEqual(ours, base) ? theirs : ours;
  }
  const result = { ...theirs };
  const baseObj = isPlainObject(base) ? base : {};
  const keys = new Set([
    ...Object.keys(baseObj),
    ...Object.keys(ours),
    ...Object.keys(theirs),
  ]);
  for (const k of keys) {
    const inOurs = Object.prototype.hasOwnProperty.call(ours, k);
    const inBase = Object.prototype.hasOwnProperty.call(baseObj, k);
    const inTheirs = Object.prototype.hasOwnProperty.call(theirs, k);

    if (!inOurs) {
      // Dev removed this key: drop from live, but only if the client
      // didn't change it themselves (otherwise keep the client's value).
      if (inBase && inTheirs && deepEqual(theirs[k], baseObj[k])) {
        delete result[k];
      }
      continue;
    }
    if (!inTheirs) {
      result[k] = ours[k]; // client doesn't have it yet — add dev's
    } else {
      result[k] = merge3(baseObj[k], ours[k], theirs[k]);
    }
  }
  return result;
}

/** Read a JSON file at a git ref (the "base"); undefined if missing. */
function gitJson(ref, key) {
  if (!ref || /^0+$/.test(ref)) return undefined;
  try {
    const out = execSync(`git show ${ref}:data/${key}`, {
      cwd: root,
      stdio: ["pipe", "pipe", "ignore"],
    }).toString();
    return JSON.parse(out);
  } catch {
    return undefined;
  }
}

/** Fetch the current LIVE version from Blob; undefined if not present. */
async function fetchLive(key) {
  try {
    const r = await fetch(`${BLOB_BASE}/data/${key}`, { cache: "no-store" });
    if (!r.ok) return undefined;
    return JSON.parse(await r.text());
  } catch {
    return undefined;
  }
}

async function discoverKeys() {
  const keys = [];
  const top = await fs.readdir(path.join(root, "data"));
  for (const f of top) if (f.endsWith(".json")) keys.push(f);
  try {
    const pages = await fs.readdir(path.join(root, "data", "pages"));
    for (const f of pages) if (f.endsWith(".json")) keys.push(`pages/${f}`);
  } catch {
    /* no pages dir */
  }
  return keys;
}

async function main() {
  const token = await readToken();
  if (!token) {
    console.error(
      "❌ Token nai. env BLOB_READ_WRITE_TOKEN set koro, ba .blob-token.local file-e ekta line-e rakho."
    );
    process.exit(1);
  }

  const raw = process.argv.slice(2);
  const overwrite = raw.includes("--overwrite");
  const baseRefArg = raw.find((a) => a.startsWith("--base-ref="));
  const baseRef = baseRefArg ? baseRefArg.split("=")[1] : "HEAD~1";
  const files = raw
    .filter((a) => !a.startsWith("--"))
    .map((a) => a.replace(/^data\//, ""));

  let keys = files.length ? files : await discoverKeys();
  keys = keys.filter((k) => !SKIP.has(k.replace(/^pages\//, "")));

  if (!files.length && overwrite) {
    console.log(
      "⚠️  Sob data/*.json OVERWRITE hocche — live admin edit muche jabe.\n"
    );
  }

  const { put } = await import("@vercel/blob");
  console.log(
    `→ ${keys.length} ta file live-e push kortechi (${overwrite ? "overwrite" : "merge"} mode, base=${baseRef})...\n`
  );

  let count = 0;
  for (const key of keys) {
    let ours;
    try {
      ours = JSON.parse(await fs.readFile(path.join(root, "data", key), "utf8"));
    } catch {
      console.log(`  ⚠ skip (repo-te nai/invalid): data/${key}`);
      continue;
    }

    let merged = ours;
    if (!overwrite) {
      const live = await fetchLive(key);
      if (live !== undefined) {
        const base = gitJson(baseRef, key);
        merged = merge3(base, ours, live);
      }
    }

    await put(`data/${key}`, JSON.stringify(merged, null, 2) + "\n", {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token,
    });
    console.log(`  ✓ data/${key}`);
    count++;
  }

  console.log(
    `\n✅ ${count} ta file live-e push holo. Client-er edit thik thakbe, tomar change-o boshbe.`
  );
}

main().catch((e) => {
  console.error("\n❌ Error:", e.message);
  process.exit(1);
});
