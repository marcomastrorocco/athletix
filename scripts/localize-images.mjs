/**
 * Downloads every remote image referenced by the active Next.js source
 * (data JSON + app/**) into public/image/cdn/, then rewrites those
 * references in place. Run once after pulling new content.
 *
 *   node scripts/localize-images.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CDN_DIR = path.join(ROOT, "public", "image", "cdn");
const PUBLIC_PREFIX = "/image/cdn/";

// Folders to scan for references
const SCAN_DIRS = ["data", "app", "components", "lib"];
const SCAN_EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".json", ".css", ".md"]);

// URLs we DO NOT want to localise:
// - the SEO dashboard's placeholder example URL
const URL_DENYLIST = new Set([
  "https://athletix.com.au/image/social-cover.jpg",
]);

const HOST_ALLOWLIST = new Set([
  "athletix.com.au",
  "agrobanglapharma.com",
]);

const IMAGE_EXT_RE = /\.(?:jpg|jpeg|png|webp|gif|svg)(?:\?.*)?$/i;
const URL_RE = /https?:\/\/[^\s"'<>)`]+\.(?:jpg|jpeg|png|webp|gif|svg)(?:\?[^\s"'<>)`]*)?/gi;

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, out);
    } else if (SCAN_EXTS.has(path.extname(e.name))) {
      out.push(full);
    }
  }
  return out;
}

function localFilenameFor(urlStr) {
  const u = new URL(urlStr);
  const base = path.posix.basename(decodeURIComponent(u.pathname));
  // 6-char hash of full URL keeps disambiguation across paths
  const hash = crypto.createHash("sha1").update(urlStr).digest("hex").slice(0, 6);
  const ext = (base.match(IMAGE_EXT_RE)?.[0] ?? ".jpg").split("?")[0];
  const stem = base.replace(IMAGE_EXT_RE, "").replace(/[^a-z0-9._-]+/gi, "-").slice(0, 80) || "img";
  return `${stem}-${hash}${ext}`;
}

async function downloadOnce(url, target) {
  try {
    await fs.access(target);
    return { skipped: true };
  } catch {}
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, buf);
  return { bytes: buf.length };
}

(async () => {
  const files = [];
  for (const dir of SCAN_DIRS) {
    await walk(path.join(ROOT, dir), files);
  }

  // 1. Collect every external image URL
  const urls = new Set();
  for (const file of files) {
    const txt = await fs.readFile(file, "utf8");
    for (const match of txt.matchAll(URL_RE)) {
      const url = match[0];
      if (URL_DENYLIST.has(url)) continue;
      let host;
      try {
        host = new URL(url).hostname;
      } catch {
        continue;
      }
      if (!HOST_ALLOWLIST.has(host)) continue;
      urls.add(url);
    }
  }

  console.log(`Found ${urls.size} unique remote image URLs.`);
  await fs.mkdir(CDN_DIR, { recursive: true });

  // 2. Download each, build a URL → local-path map
  const mapping = new Map();
  let downloaded = 0;
  let skipped = 0;
  for (const url of urls) {
    const filename = localFilenameFor(url);
    const target = path.join(CDN_DIR, filename);
    try {
      const r = await downloadOnce(url, target);
      if (r.skipped) skipped++;
      else downloaded++;
      mapping.set(url, PUBLIC_PREFIX + filename);
      process.stdout.write(r.skipped ? "·" : ".");
    } catch (err) {
      console.error(`\n  ✗ FAILED ${url} — ${err.message}`);
    }
  }
  process.stdout.write("\n");
  console.log(`Downloaded ${downloaded}, already on disk ${skipped}, mapped ${mapping.size}.`);

  // 3. Rewrite references in every scanned file
  let touched = 0;
  for (const file of files) {
    const orig = await fs.readFile(file, "utf8");
    let next = orig;
    for (const [url, localPath] of mapping) {
      if (next.includes(url)) {
        next = next.split(url).join(localPath);
      }
    }
    if (next !== orig) {
      await fs.writeFile(file, next);
      touched++;
      console.log(`  ✎ ${path.relative(ROOT, file)}`);
    }
  }
  console.log(`Rewrote ${touched} file(s).`);
})();
