// Build an HTML SEO-migration report from data/blog.json + data/seo-overrides.json.
// Writes the path given as argv[2] (default: seo-report.html).
import fs from "fs";

const out = process.argv[2] || "seo-report.html";
const blog = JSON.parse(fs.readFileSync("data/blog.json", "utf8"));
const posts = Array.isArray(blog) ? blog : blog.posts;
const over = JSON.parse(fs.readFileSync("data/seo-overrides.json", "utf8"));

const migrated = posts.filter((p) => p.seo && (p.seo.title || p.seo.description));
const fallback = posts.filter((p) => !(p.seo && (p.seo.title || p.seo.description)));
const pages = Object.keys(over).filter((k) => over[k] && (over[k].title || over[k].description));

const esc = (s) =>
  String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const today = "2026-06-23";

const blogRows = migrated
  .map(
    (p, i) =>
      `<tr><td class="n">${i + 1}</td><td class="slug">/blog/${esc(p.slug)}</td><td class="t">${esc(p.seo.title)}</td><td class="d">${esc(p.seo.description)}</td></tr>`
  )
  .join("\n");
const pageRows = pages
  .map(
    (k, i) =>
      `<tr><td class="n">${i + 1}</td><td class="slug">${esc(k)}</td><td class="t">${esc(over[k].title)}</td><td class="d">${esc(over[k].description)}</td></tr>`
  )
  .join("\n");
const fbRows = fallback.map((p) => `<span class="chip">/${esc(p.slug)}</span>`).join(" ");

const html = `<!doctype html><html><head><meta charset="utf-8"><title>ATHLETIX SEO Migration Report</title>
<style>
@page{size:A4;margin:14mm 12mm}
*{box-sizing:border-box}
body{font-family:'Segoe UI',Roboto,Arial,sans-serif;color:#16202b;margin:0;font-size:11px;line-height:1.45}
.head{display:flex;align-items:center;gap:14px;border-bottom:3px solid #00b8ef;padding-bottom:14px;margin-bottom:18px}
.head h1{font-size:20px;margin:0}
.head .sub{color:#5e6b78;font-size:11px;margin-top:3px}
.brand{font-weight:800;font-size:22px;color:#0084c8;letter-spacing:1px}
.cards{display:flex;gap:10px;margin-bottom:22px}
.card{flex:1;border:1px solid #e3e8ee;border-radius:10px;padding:12px 14px;background:#f8fafc}
.card .num{font-size:26px;font-weight:800;color:#0084c8;line-height:1}
.card .lbl{font-size:10px;color:#5e6b78;margin-top:4px;text-transform:uppercase;letter-spacing:.04em}
h2{font-size:13px;margin:22px 0 8px;padding-left:8px;border-left:4px solid #00b8ef}
.part{page-break-before:always;padding-top:4px}
.parthd{display:flex;align-items:baseline;gap:10px;border-bottom:2px solid #0e2a3d;padding-bottom:8px;margin-bottom:14px}
.parthd .tag{background:#00b8ef;color:#001018;font-weight:800;font-size:10px;padding:3px 9px;border-radius:6px;letter-spacing:.05em}
.parthd .ttl{font-size:16px;font-weight:700}
.parthd .cnt{margin-left:auto;color:#5e6b78;font-size:11px}
table{width:100%;border-collapse:collapse;table-layout:fixed}
th{background:#0e2a3d;color:#fff;text-align:left;padding:6px 8px;font-size:9.5px;text-transform:uppercase}
td{padding:6px 8px;border-bottom:1px solid #eef2f6;vertical-align:top;word-wrap:break-word;overflow-wrap:anywhere}
tr:nth-child(even) td{background:#f8fafc}
.n{width:26px;color:#9aa6b2;text-align:right}
.slug{width:128px;font-family:Consolas,monospace;font-size:9px;color:#0084c8}
.t{width:160px;font-weight:600}
.d{color:#3a4754}
.chip{display:inline-block;background:#eef2f6;border-radius:6px;padding:2px 7px;font-size:9px;margin:2px;color:#5e6b78}
.foot{margin-top:10px;color:#9aa6b2;font-size:9px}
</style></head><body>
<div class="head"><span class="brand">ATHLETIX</span><div><h1>SEO Migration Report</h1><div class="sub">WordPress (Rank Math) &rarr; athletix.com.au new site &middot; Generated ${today}</div></div></div>
<div class="cards">
<div class="card"><div class="num">${pages.length}</div><div class="lbl">Static pages with SEO</div></div>
<div class="card"><div class="num">${migrated.length}</div><div class="lbl">Blog posts migrated</div></div>
<div class="card"><div class="num">${fallback.length}</div><div class="lbl">Blog on fallback</div></div>
<div class="card"><div class="num">${migrated.length + fallback.length}</div><div class="lbl">Total blog posts</div></div>
</div>
<div class="parthd"><span class="tag">PART 1</span><span class="ttl">Static Pages</span><span class="cnt">${pages.length} pages with migrated SEO</span></div>
<table><thead><tr><th class="n">#</th><th class="slug">Path</th><th class="t">Meta Title</th><th class="d">Meta Description</th></tr></thead><tbody>${pageRows}</tbody></table>

<div class="part"></div>
<div class="parthd"><span class="tag">PART 2</span><span class="ttl">Blog Posts</span><span class="cnt">${migrated.length} migrated &middot; ${fallback.length} on fallback</span></div>
<h2>Migrated meta title &amp; description (${migrated.length})</h2>
<table><thead><tr><th class="n">#</th><th class="slug">URL</th><th class="t">Meta Title</th><th class="d">Meta Description</th></tr></thead><tbody>${blogRows}</tbody></table>
<h2>On auto-fallback &mdash; no WP source meta (${fallback.length})</h2>
<p style="color:#5e6b78;margin:4px 0 8px">These had no custom SEO on the old site (short caption / author posts); they use title + excerpt automatically.</p>
<div>${fbRows}</div>
<div class="foot">Source: scripts/extract-old-seo.mjs (124 live URLs) + scripts/migrate-blog-seo.mjs</div>
</body></html>`;

fs.writeFileSync(out, html);
console.log(`Wrote ${out} | pages:${pages.length} blogMigrated:${migrated.length} fallback:${fallback.length}`);
