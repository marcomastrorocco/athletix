import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CDN_DIR = path.join(ROOT, "public", "image", "cdn");
const BLOG_JSON_PATH = path.join(ROOT, "data", "blog.json");

function localFilenameFor(urlStr) {
  const u = new URL(urlStr);
  const base = path.posix.basename(decodeURIComponent(u.pathname));
  const hash = crypto.createHash("sha1").update(urlStr).digest("hex").slice(0, 6);
  const ext = (base.match(/\.(?:jpg|jpeg|png|webp|gif|svg)/i)?.[0] ?? ".jpg");
  const stem = base.replace(/\.(?:jpg|jpeg|png|webp|gif|svg)/i, "").replace(/[^a-z0-9._-]+/gi, "-").slice(0, 80) || "img";
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

async function getLiveOgImage(slug) {
  const url = `https://athletix.com.au/${slug}/`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      // Try with /blog/ path too
      const resBlog = await fetch(`https://athletix.com.au/blog/${slug}/`, { redirect: "follow" });
      if (!resBlog.ok) return null;
      const html = await resBlog.text();
      return parseOgImage(html);
    }
    const html = await res.text();
    return parseOgImage(html);
  } catch (e) {
    console.error(`Error fetching slug ${slug}: ${e.message}`);
    return null;
  }
}

function parseOgImage(html) {
  // Try og:image first
  const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) || 
                  html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
  if (ogMatch) return ogMatch[1];
  
  // Try twitter:image
  const twMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
                  html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);
  if (twMatch) return twMatch[1];
  
  return null;
}

(async () => {
  try {
    console.log("Loading blog.json...");
    const data = await fs.readFile(BLOG_JSON_PATH, "utf8");
    const posts = JSON.parse(data);
    console.log(`Processing ${posts.length} posts...`);
    
    let updatedCount = 0;
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(`[${i + 1}/${posts.length}] Checking live post for: "${post.title}" (${post.slug})`);
      
      const ogImage = await getLiveOgImage(post.slug);
      if (ogImage) {
        console.log(`  -> Found live og:image: ${ogImage}`);
        const filename = localFilenameFor(ogImage);
        const localPath = `/image/cdn/${filename}`;
        const absoluteDest = path.join(CDN_DIR, filename);
        
        try {
          const dlResult = await downloadOnce(ogImage, absoluteDest);
          if (dlResult.skipped) {
            console.log(`  -> Already exists locally: ${localPath}`);
          } else {
            console.log(`  -> Downloaded locally to: ${localPath}`);
          }
          
          if (post.image !== localPath) {
            console.log(`  -> Updating image path in JSON: ${post.image} -> ${localPath}`);
            post.image = localPath;
            
            // Also update the seo.og.image if present
            if (post.seo && post.seo.og) {
              post.seo.og.image = localPath;
            }
            updatedCount++;
          }
        } catch (downloadError) {
          console.error(`  ✗ Failed to download ${ogImage}: ${downloadError.message}`);
        }
      } else {
        console.log(`  -> ⚠ No live og:image found for this slug. Keeping existing: ${post.image}`);
      }
    }
    
    if (updatedCount > 0) {
      console.log(`Saving changes to blog.json...`);
      await fs.writeFile(BLOG_JSON_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");
      console.log(`Successfully updated ${updatedCount} posts in blog.json!`);
    } else {
      console.log("No image references needed updating in blog.json.");
    }
    
  } catch (err) {
    console.error("Migration failed:", err);
  }
})();
