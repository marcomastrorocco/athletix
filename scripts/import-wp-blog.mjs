// One-off importer: parses a WordPress WXR export and writes data/blog.json
// Usage: node scripts/import-wp-blog.mjs <path-to-wp-export.xml>

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error("Usage: node scripts/import-wp-blog.mjs <wp-export.xml>");
  process.exit(1);
}

const xml = readFileSync(xmlPath, "utf8");

// Extract every <item>...</item> block (XML is well-formed, items don't nest).
const itemRegex = /<item>([\s\S]*?)<\/item>/g;
const items = [];
let match;
while ((match = itemRegex.exec(xml)) !== null) {
  items.push(match[1]);
}

function decodeEntities(s) {
  if (!s) return s;
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&hellip;/g, "…")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—");
}

function pick(block, tag) {
  // Match <tag>...</tag> OR <tag><![CDATA[...]]></tag>
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`);
  const m = re.exec(block);
  if (!m) return "";
  let v = m[1].trim();
  // Strip a single CDATA wrapper if present
  const cdata = /^<!\[CDATA\[([\s\S]*)\]\]>$/.exec(v);
  if (cdata) v = cdata[1];
  return v;
}

function pickAll(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "g");
  const out = [];
  let m;
  while ((m = re.exec(block)) !== null) {
    let v = m[1].trim();
    const cdata = /^<!\[CDATA\[([\s\S]*)\]\]>$/.exec(v);
    if (cdata) v = cdata[1];
    out.push(v);
  }
  return out;
}

function pickCategory(block) {
  // <category domain="category" nicename="strength"><![CDATA[Strength]]></category>
  const re = /<category[^>]*domain="category"[^>]*>([\s\S]*?)<\/category>/g;
  const out = [];
  let m;
  while ((m = re.exec(block)) !== null) {
    let v = m[1].trim();
    const cdata = /^<!\[CDATA\[([\s\S]*)\]\]>$/.exec(v);
    if (cdata) v = cdata[1];
    if (v && v.toLowerCase() !== "uncategorized") out.push(v);
  }
  return out;
}

function pickTags(block) {
  const re = /<category[^>]*domain="post_tag"[^>]*>([\s\S]*?)<\/category>/g;
  const out = [];
  let m;
  while ((m = re.exec(block)) !== null) {
    let v = m[1].trim();
    const cdata = /^<!\[CDATA\[([\s\S]*)\]\]>$/.exec(v);
    if (cdata) v = cdata[1];
    if (v) out.push(v);
  }
  return out;
}

// Strip WP-specific Gutenberg block comments & shortcodes from content,
// then aggressively clean WP-paste artifacts (inline styles, redundant spans,
// <b> tags, &nbsp; runs) so the body renders cleanly on this site.
function cleanContent(html) {
  if (!html) return "";
  let out = html;

  // Remove Gutenberg block comments + any HTML comments
  out = out.replace(/<!--\s*\/?wp:[^>]*-->/g, "");
  out = out.replace(/<!--[\s\S]*?-->/g, "");

  // <span style="font-weight: 700">X</span>  ->  <strong>X</strong>
  out = out.replace(
    /<span[^>]*font-weight\s*:\s*(?:6\d\d|700|800|900|bold)[^>]*>([\s\S]*?)<\/span>/gi,
    "<strong>$1</strong>",
  );

  // Strip any remaining <span ...>X</span> wrappers (font-weight 400, colors, etc.)
  // Run twice to handle nested spans.
  for (let i = 0; i < 3; i++) {
    out = out.replace(/<span\b[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  }

  // Normalize <b> -> <strong>
  out = out.replace(/<b\b[^>]*>([\s\S]*?)<\/b>/gi, "<strong>$1</strong>");

  // Remove every remaining inline style="..." attribute
  out = out.replace(/\s+style\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+style\s*=\s*'[^']*'/gi, "");

  // Drop WP class/id/data-* noise so output stays compact
  out = out.replace(/\s+class\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+class\s*=\s*'[^']*'/gi, "");
  out = out.replace(/\s+id\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+id\s*=\s*'[^']*'/gi, "");
  out = out.replace(/\s+data-[a-z0-9-]+\s*=\s*"[^"]*"/gi, "");

  // Collapse &nbsp; runs to a single space
  out = out.replace(/(?:&nbsp;\s*){1,}/gi, " ");

  // Remove empty inline tags left behind
  for (let i = 0; i < 3; i++) {
    out = out.replace(/<(p|div|span|em|strong|b|i|u)>\s*<\/\1>/gi, "");
  }

  // Strip <img>/<figure> referencing the theme-demo CDN — irrelevant placeholders.
  out = out.replace(
    /<figure[^>]*>[\s\S]*?<img[^>]+powerlift\.qodeinteractive\.com[\s\S]*?<\/figure>/gi,
    "",
  );
  out = out.replace(
    /<img[^>]+powerlift\.qodeinteractive\.com[^>]*>/gi,
    "",
  );

  // Strip <img>/<figure> referencing the local WordPress URL (won't load here).
  out = out.replace(
    /<figure[^>]*>[\s\S]*?<img[^>]+localhost\/athletixx[\s\S]*?<\/figure>/gi,
    "",
  );
  out = out.replace(/<img[^>]+localhost\/athletixx[^>]*>/gi, "");

  // Strip width/height attributes off remaining <img> so CSS can size responsively
  out = out.replace(/<img([^>]*)\s+(?:width|height)\s*=\s*"[^"]*"/gi, "<img$1");

  // Upgrade athletix.com.au thumbnail URLs (-300x200 etc.) to full-res originals
  out = out.replace(
    /(https:\/\/athletix\.com\.au\/[^"' >]+?)-\d+x\d+(\.[a-z]+)/gi,
    "$1$2",
  );

  // Collapse runs of whitespace inside text (but keep newlines between blocks)
  out = out.replace(/[ \t]{2,}/g, " ");
  out = out.replace(/\n{3,}/g, "\n\n");

  return out.trim();
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/gi, "") // strip HTML entities
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function slugFromLink(link) {
  if (!link) return "";
  // Try to extract the last path segment
  const m = /\/([^/]+)\/?$/.exec(link.replace(/\/?$/, "/"));
  return m ? m[1] : "";
}

function deriveExcerpt(body, override) {
  if (override) {
    const txt = override.replace(/<[^>]+>/g, "").trim();
    if (txt) return txt.slice(0, 240);
  }
  const txt = body
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return txt.slice(0, 220) + (txt.length > 220 ? "…" : "");
}

function readTime(body) {
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}

function toIsoDate(pubDate) {
  // pubDate looks like: "Sat, 02 May 2026 05:09:17 +0000"
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

// Curated high-quality athletix.com.au images, used as a fallback rotation
// when a post's body has no usable image of its own.
const FALLBACK_IMAGES = [
  "https://athletix.com.au/wp-content/uploads/2023/05/Strength-Training-athletix.jpg",
  "https://athletix.com.au/wp-content/uploads/2024/05/accel_start_large.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44wtm26f1t8dapegsffv34q_1756806199_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44x9x7qecds9qje4mahc9ze_1756806707_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44ytcepe9xvzv17vh27h2er_1756808295_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44z2zktfpz9dwrvmv4xw3tj_1756808564_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44y8m8eevptxg8f211z7mt2_1756807724_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44w1aqtejsvzyt9mc47mvwz_1756805377_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44wb9xfevxt0fczcqmwkbfs_1756805715_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44sxbc3ee3t61esr79nf1yz_1756803143_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44tf4qaet4rk2k0sdp6pnbm_1756803725_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k44zqg2se3faknb9bygtw2da_1756809243_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k45060xgfz1vxbf52ngvnr17_1756809723_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k451enzyeq3vmnm6df3vpsc8_1756811056_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k4524xe4fhpaxsxrrgc1snn9_1756811779_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k4535zeme1qsvsahxmj7cm8j_1756812953_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k453gqahert859j17xmw9wbe_1756813217_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k454pn17ebyt8xxrye8ydv0c_1756814475_img_1.webp",
  "https://athletix.com.au/wp-content/uploads/2025/09/assets_task_01k4565dt2fkrs02zdcn1bxpxp_1756816031_img_0.webp",
  "https://athletix.com.au/wp-content/uploads/2025/10/assets_task_01k74gpmmme7g9gapsh0chkfxz_1760014702_img_0.webp",
];

// WordPress uses -WIDTHxHEIGHT thumbnail suffixes (e.g. -300x200) before the
// extension. Strip them to fetch the original full-resolution upload.
function upscaleAthletixUrl(url) {
  if (!url || !/athletix\.com\.au/i.test(url)) return url;
  return url.replace(/-\d+x\d+(\.[a-z]+)(?:$|\?)/i, "$1");
}

function pickFirstImage(body, fallbackIdx) {
  // Collect every <img src> in body. Pick the best one:
  //   1) real athletix.com.au image (the live CDN — high quality)
  //   2) any other absolute http(s) image that isn't the theme-demo placeholder
  //   3) curated athletix CDN fallback rotation
  const urls = [];
  const re = /<img[^>]+src=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const u = m[1];
    if (!u || u.startsWith("data:")) continue;
    urls.push(u);
  }
  const athletix = urls.find((u) => /athletix\.com\.au/i.test(u));
  if (athletix) return upscaleAthletixUrl(athletix);
  const other = urls.find(
    (u) =>
      /^https?:\/\//.test(u) &&
      !/powerlift\.qodeinteractive\.com/i.test(u) &&
      !/localhost\/athletixx/i.test(u),
  );
  if (other) return other;
  return FALLBACK_IMAGES[fallbackIdx % FALLBACK_IMAGES.length];
}

const posts = [];
const seenSlugs = new Set();
let fallbackIdx = 0;

for (const block of items) {
  const postType = pick(block, "wp:post_type");
  const status = pick(block, "wp:status");
  if (postType !== "post") continue;
  if (status !== "publish") continue;

  const title = decodeEntities(pick(block, "title"));
  const link = pick(block, "link");
  const rawContent = pick(block, "content:encoded");
  const rawExcerpt = pick(block, "excerpt:encoded");
  const pubDate = pick(block, "pubDate");
  const creator = decodeEntities(pick(block, "dc:creator"));
  const postName = pick(block, "wp:post_name");
  const categories = pickCategory(block).map(decodeEntities);
  const tags = pickTags(block).map(decodeEntities);

  let body = cleanContent(rawContent);
  if (!title || !body) continue;

  // Strip a leading <h1>...</h1> that just duplicates the post title
  // (the banner already shows the title, so this avoids double-rendering).
  body = body.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");

  // Strip any <strong>/<b> wrapping inside remaining <h1>/<h2> so headings
  // aren't doubly bolded (WP exporters often wrap heading text in <b>).
  body = body.replace(
    /<(h[1-3])([^>]*)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/\1>/gi,
    "<$1$2>$3</$1>",
  );

  let slug = postName || slugFromLink(link) || slugify(title);

  // Skip the default WordPress "Hello world!" sample post
  if (slug === "hello-world") continue;

  // Ensure unique
  let base = slug;
  let n = 2;
  while (seenSlugs.has(slug)) slug = `${base}-${n++}`;
  seenSlugs.add(slug);

  posts.push({
    slug,
    title,
    excerpt: decodeEntities(deriveExcerpt(body, rawExcerpt)),
    image: pickFirstImage(body, fallbackIdx++),
    category: categories[0] || "Blog",
    readTime: readTime(body),
    date: toIsoDate(pubDate),
    published: true,
    body,
    author: creator || undefined,
    tags: tags.length ? tags : undefined,
  });
}

// Sort newest first
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

const outPath = path.join(process.cwd(), "data", "blog.json");
writeFileSync(outPath, JSON.stringify(posts, null, 2) + "\n", "utf8");

console.log(`Imported ${posts.length} published posts → ${outPath}`);
