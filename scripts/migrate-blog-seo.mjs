// Migrate per-post SEO (title + meta description + OG) from the extracted
// WordPress dump into data/blog.json. Matches posts to the live export by slug.
//
//   node scripts/migrate-blog-seo.mjs          # dry run (prints a report, writes nothing)
//   node scripts/migrate-blog-seo.mjs --apply  # writes data/blog.json
//
// Only fills posts that have NO seo yet; never clobbers hand-edited SEO.

import fs from "fs";

const APPLY = process.argv.includes("--apply");
const RAW = "seo-export-raw.json";
const BLOG = "data/blog.json";

const raw = JSON.parse(fs.readFileSync(RAW, "utf8"));
const blog = JSON.parse(fs.readFileSync(BLOG, "utf8"));
const posts = Array.isArray(blog) ? blog : blog.posts;
if (!Array.isArray(posts)) throw new Error("Unexpected blog.json shape");

// case-insensitive lookup of raw entries keyed by "/slug"
const rawByKey = new Map(Object.keys(raw).map((k) => [k.toLowerCase(), raw[k]]));
const lookup = (slug) => rawByKey.get(("/" + String(slug || "").replace(/^\/+|\/+$/g, "")).toLowerCase());

const clean = (s) => (typeof s === "string" ? s.trim() : "");

let filled = 0, skippedHasSeo = 0, noSource = 0, noMeta = 0;
const report = [];

for (const p of posts) {
  if (p.seo && (p.seo.title || p.seo.description)) { skippedHasSeo++; continue; }
  const src = lookup(p.slug);
  if (!src || src.error) { noSource++; report.push(["NO-SOURCE", p.slug]); continue; }

  const title = clean(src.title);
  const description = clean(src.description);
  if (!title && !description) { noMeta++; report.push(["NO-META", p.slug]); continue; }

  const seo = {};
  if (title) seo.title = title;
  if (description) seo.description = description;

  const og = {};
  if (clean(src.og?.title)) og.title = clean(src.og.title);
  if (clean(src.og?.description)) og.description = clean(src.og.description);
  if (clean(src.og?.image)) og.image = clean(src.og.image);
  if (Object.keys(og).length) seo.og = og;

  p.seo = seo;
  filled++;
  report.push(["FILL", p.slug, title.slice(0, 60)]);
}

console.log(`Posts total        : ${posts.length}`);
console.log(`Filled SEO         : ${filled}`);
console.log(`Already had SEO    : ${skippedHasSeo}`);
console.log(`No source in dump  : ${noSource}`);
console.log(`Source but no meta : ${noMeta}`);
console.log("");
for (const r of report.filter((r) => r[0] === "FILL").slice(0, 8))
  console.log(`  ✓ ${r[1]}\n      → ${r[2]}…`);
console.log("");
console.log("Unmatched (no source) slugs:");
console.log(report.filter((r) => r[0] === "NO-SOURCE").map((r) => "  · " + r[1]).join("\n") || "  (none)");

if (APPLY) {
  fs.writeFileSync(BLOG, JSON.stringify(blog, null, 2) + "\n");
  console.log(`\n✅ Wrote ${BLOG} (${filled} posts updated)`);
} else {
  console.log(`\n(dry run — nothing written. Re-run with --apply to save.)`);
}
