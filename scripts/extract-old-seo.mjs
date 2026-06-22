// One-off: extract all SEO data from the old WordPress (Rank Math) site.
// Reads page-sitemap.xml + post-sitemap.xml, fetches each URL, and parses
// <title>, meta description, canonical, robots, OG/Twitter, and JSON-LD.
// Output: seo-export-raw.json (keyed by old path).

const ORIGIN = "https://athletix.com.au";
const SITEMAPS = ["page-sitemap.xml", "post-sitemap.xml"];
const CONCURRENCY = 6;

const decode = (s) =>
  (s ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 SEO-migration-bot" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseMetaTags(head) {
  const byKey = {};
  const tagRe = /<meta\b[^>]*>/gi;
  let m;
  while ((m = tagRe.exec(head))) {
    const tag = m[0];
    const key =
      (tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i) || [])[1];
    const content = (tag.match(/\bcontent\s*=\s*["']([\s\S]*?)["']/i) || [])[1];
    if (key && content != null) byKey[key.toLowerCase()] = decode(content);
  }
  return byKey;
}

function extract(html) {
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [html])[0];
  const meta = parseMetaTags(head);
  const title = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]);
  const canonical = (head.match(
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i
  ) || [])[1];

  // All JSON-LD blocks (Rank Math emits a @graph).
  const jsonld = [];
  const ldRe =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let l;
  while ((l = ldRe.exec(html))) {
    try {
      jsonld.push(JSON.parse(l[1].trim()));
    } catch {
      /* skip malformed */
    }
  }

  return {
    title,
    description: meta["description"] || "",
    canonical: canonical || "",
    robots: meta["robots"] || "",
    og: {
      title: meta["og:title"] || "",
      description: meta["og:description"] || "",
      image: meta["og:image"] || "",
      type: meta["og:type"] || "",
    },
    twitter: {
      card: meta["twitter:card"] || "",
      title: meta["twitter:title"] || "",
      description: meta["twitter:description"] || "",
      image: meta["twitter:image"] || "",
    },
    jsonld,
  };
}

async function getUrls() {
  const urls = new Set();
  for (const sm of SITEMAPS) {
    try {
      const xml = await fetchText(`${ORIGIN}/${sm}`);
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
    } catch (e) {
      console.error(`! ${sm}: ${e.message}`);
    }
  }
  return [...urls];
}

async function run() {
  const urls = await getUrls();
  console.error(`Found ${urls.length} URLs`);
  const out = {};
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      const path = new URL(url).pathname.replace(/\/$/, "") || "/";
      try {
        const html = await fetchText(url);
        out[path] = { url, ...extract(html) };
        console.error(`  ok  ${path}`);
      } catch (e) {
        out[path] = { url, error: e.message };
        console.error(`  ERR ${path}: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  const fs = await import("fs");
  fs.writeFileSync("seo-export-raw.json", JSON.stringify(out, null, 2));
  console.error(`\nWrote seo-export-raw.json (${Object.keys(out).length} pages)`);
}

run();
