// One-off: migrate SEO from the old WordPress export (seo-export-raw.json) into
// the new site's dashboard overrides (data/seo-overrides.json).
//
// Decisions baked in (see migration discussion):
//   - title + description: taken from the old site (faithful overwrite)
//   - description that is a placeholder (opening-hours / a bare URL / too short)
//     is dropped so the new site's own default wins instead
//   - og:title/og:description/og:image + twitter mirror are carried over as-is
//     (og:image stays the absolute old /wp-content/ URL, per decision)
//   - canonical / robots / schema are NOT migrated: paths changed (canonical is
//     regenerated from the new path), every old page was index,follow (the new
//     default), and the old site emitted no JSON-LD to carry.
//   - obvious brand-name typos in titles ("ATHELETIX") are corrected.

import fs from "fs";

const RAW = JSON.parse(fs.readFileSync("seo-export-raw.json", "utf8"));
const OUT = "data/seo-overrides.json";

// new site path (now identical to the old URL)  <-  old export source path
const MAP = {
  "/": "/",
  "/about-us": "/about-us",
  "/adult-classes": "/adult-classes",
  "/allied-health-staff": "/allied-health-staff",
  "/athletes-program": "/athletes-program",
  "/blog": "/blog",
  "/careers": "/careers",
  "/classes": "/classes",
  "/contact-us": "/contact-us",
  "/family-classes": "/family-classes",
  "/classes/hiit-push-and-drag": "/classes/hiit-push-and-drag",
  "/classes/weightlifting": "/classes/weightlifting",
  "/classes/mat-pilates": "/classes/mat-pilates",
  "/memberships": "/memberships",
  "/classes/met-con": "/classes/met-con",
  "/classes/mobility": "/classes/mobility",
  "/ndis-program": "/ndis-program",
  "/our-gym": "/our-gym",
  "/our-team": "/our-team",
  "/class-timetable": "/timetable",
  "/classes/youth-agility-development": "/classes/youth-agility-development",
  "/classes/youth-agility-foundations": "/classes/youth-agility-foundations",
  "/youth-classes": "/youth-classes-2",
  "/classes/youth-fitness-development": "/classes/youth-fitness-development",
  "/classes/youth-fitness-foundations": "/classes/youth-fitness-foundations",
  "/classes/youth-speed-development": "/classes/youth-speed-development",
  "/classes/youth-speed-foundation": "/classes/youth-speed-foundation",
  // No clean old equivalent — left on the new site's own default:
  //   /strength-con, /youth-open-workout
};

const fixTypos = (s) => (s || "").replace(/ATHELETIX/g, "ATHLETIX");

// A description we should NOT carry over (opening hours, a bare link, a stub).
function isPlaceholderDesc(s) {
  const t = (s || "").trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true; // e.g. about-us = a YouTube URL
  if (/^(MON|TUE|WED|THU|FRI|SAT|SUN)\b/i.test(t)) return true; // hours table
  if (/\b\d{1,2}:\d{2}\s*(AM|PM)\b/i.test(t)) return true; // contains a time
  if (/^CLASSES AND WORKING HOURS/i.test(t)) return true;
  if (t.length < 40) return true; // too short to be a real meta description
  return false;
}

const overrides = {};
const report = [];

for (const [newPath, oldPath] of Object.entries(MAP)) {
  const e = RAW[oldPath];
  if (!e || e.error) {
    report.push(`SKIP ${newPath}  (no export for ${oldPath})`);
    continue;
  }
  const seo = {};

  if (e.title) seo.title = fixTypos(e.title);

  const descDropped = isPlaceholderDesc(e.description);
  if (!descDropped) seo.description = e.description;

  // Open Graph
  const og = {};
  if (e.og?.title) og.title = fixTypos(e.og.title);
  if (e.og?.description && !isPlaceholderDesc(e.og.description))
    og.description = e.og.description;
  if (e.og?.image) og.image = e.og.image;
  if (Object.keys(og).length) seo.og = og;

  // Twitter (mirror of OG on the old site)
  const tw = {};
  if (e.twitter?.title) tw.title = fixTypos(e.twitter.title);
  if (e.twitter?.description && !isPlaceholderDesc(e.twitter.description))
    tw.description = e.twitter.description;
  if (e.twitter?.image) tw.image = e.twitter.image;
  if (Object.keys(tw).length) seo.twitter = tw;

  overrides[newPath] = seo;
  report.push(
    `OK   ${newPath.padEnd(28)} <- ${oldPath}` +
      (descDropped ? "   [desc=placeholder, kept new default]" : "")
  );
}

fs.writeFileSync(OUT, JSON.stringify(overrides, null, 2) + "\n");

console.log(report.join("\n"));
console.log(
  `\nWrote ${OUT}: ${Object.keys(overrides).length} pages migrated.` +
    `\nNo old source (left on new default): /strength-con, /youth-open-workout`
);
