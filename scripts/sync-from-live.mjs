/**
 * sync-from-live.mjs
 * ------------------------------------------------------------------
 * Pulls all live CONTENT (edited via the admin dashboard, stored in
 * Vercel Blob) down into the repo's `data/` folder, then commits and
 * pushes to GitHub. After running this, local files === live site, so a
 * fresh download / `git clone` matches exactly what the live site shows.
 *
 * Usage:   npm run sync-live
 *
 * Two modes (auto-detected):
 *   1. TOKEN MODE  — if `.blob-token.local` (git-ignored, one line) holds
 *      your Vercel BLOB_READ_WRITE_TOKEN, every data blob is discovered
 *      automatically (catches brand-new pages too).
 *   2. PUBLIC MODE — no token needed. Pulls the known content files plus
 *      every page already present in `data/pages/`, using public Blob URLs.
 *
 * The token file is NOT loaded by Next.js, so `npm run dev` stays in safe
 * "local files" mode and never writes to the live site.
 * ------------------------------------------------------------------
 */
import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();

// Public Blob store base for this project (from the live site HTML).
const BLOB_BASE =
  "https://o0aibyc5xwhg4z00.public.blob.vercel-storage.com";

// Content we never sync: login password hash + the edit-history log.
const SKIP = new Set(["data/admin.json", "data/activity.json"]);

async function readToken() {
  try {
    const raw = await fs.readFile(path.join(root, ".blob-token.local"), "utf8");
    return raw.trim() || null;
  } catch {
    return null;
  }
}

/** Write one file if the fetch succeeds; returns true on success. */
async function pull(pathname, url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) return false;
  const dest = path.join(root, pathname);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, await r.text(), "utf8");
  console.log(`  ✓ ${pathname}`);
  return true;
}

/** TOKEN MODE: enumerate every data/*.json blob and download it. */
async function syncWithToken(token) {
  const { list } = await import("@vercel/blob");
  let cursor;
  let count = 0;
  do {
    const res = await list({ prefix: "data/", cursor, limit: 1000, token });
    for (const blob of res.blobs) {
      if (!blob.pathname.endsWith(".json")) continue;
      if (SKIP.has(blob.pathname)) continue;
      if (await pull(blob.pathname, blob.url)) count++;
    }
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return count;
}

/** PUBLIC MODE: pull known files + every page already in data/pages/. */
async function syncPublic() {
  const topLevel = [
    "site",
    "team",
    "membership",
    "membership-categories",
    "timetable",
    "blog",
  ];
  // Discover page slugs from what's already in the repo.
  let pageSlugs = [];
  try {
    const entries = await fs.readdir(path.join(root, "data", "pages"));
    pageSlugs = entries
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  } catch {
    /* no pages dir */
  }

  const targets = [
    ...topLevel.map((n) => `data/${n}.json`),
    ...pageSlugs.map((s) => `data/pages/${s}.json`),
  ];

  let count = 0;
  for (const pathname of targets) {
    if (SKIP.has(pathname)) continue;
    // 404 => not edited on live; bundled GitHub copy is already correct.
    if (await pull(pathname, `${BLOB_BASE}/${pathname}`)) count++;
  }
  return count;
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: root, stdio: "pipe" }).toString().trim();
}

async function main() {
  const token = await readToken();
  console.log(
    `→ Live theke content download kortechi (${token ? "token" : "public"} mode)...`
  );

  const n = token ? await syncWithToken(token) : await syncPublic();
  console.log(`\n✓ ${n} ta file download holo.`);

  // In CI the workflow handles git itself; just download and exit.
  if (process.env.SYNC_SKIP_GIT) {
    console.log("\n✓ Download done (git skipped — CI will commit).");
    return;
  }

  const status = git("status --porcelain -- data/");
  if (!status) {
    console.log("\n✅ GitHub already up-to-date — kono notun change nai.");
    return;
  }

  console.log("\n→ GitHub e push kortechi...");
  git("add data/");
  git('commit -m "Sync content from live admin (Blob) to GitHub"');
  git("push");
  console.log("\n✅ Done! GitHub ekhon live er sathe sync. Vercel auto-deploy korbe.");
}

main().catch((e) => {
  console.error("\n❌ Error:", e.message);
  process.exit(1);
});
