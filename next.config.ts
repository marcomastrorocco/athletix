import type { NextConfig } from "next";

// Permanent (308 — treated as 301 by Google) redirects. The site's own pages now
// live at the same URLs the old WordPress site used, so only the old DUPLICATE /
// variant / discontinued URLs need redirecting onto their canonical page here.
const SEO_REDIRECTS: Record<string, string> = {
  // Old timetable URL -> the live timetable page
  "/timetable": "/class-timetable",
  // Duplicate / variant URLs funnelled to the closest current page
  "/youth-classes-2": "/youth-classes",
  "/ndis-dva-program": "/ndis-program",
  "/adults-membership": "/memberships",
  "/athletix-membership": "/memberships",
  "/youth-membership": "/memberships",
  "/family-membership": "/family-classes",
  "/classes/family-fitness": "/family-classes",
  "/classes/push-drag-hit-workout": "/classes/hiit-push-and-drag",
  "/sports-rehab": "/allied-health-staff",
  // Discontinued classes -> the classes hub (better than a 404)
  "/classes/kettlebells": "/classes",
  "/classes/yoga": "/classes",
  "/classes/speed-squad": "/classes",
  "/classes/adult-sprint-training": "/classes",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  productionBrowserSourceMaps: false,
  compress: true,

  async redirects() {
    return Object.entries(SEO_REDIRECTS).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/:path*\\.map",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
