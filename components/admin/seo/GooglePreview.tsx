"use client";

import { Globe } from "lucide-react";

type Props = {
  siteUrl: string;
  path: string;
  title: string;
  description: string;
};

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

/** Approximation of a Google desktop search result snippet. */
export default function GooglePreview({
  siteUrl,
  path,
  title,
  description,
}: Props) {
  const host = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const crumb =
    host +
    (path === "/" ? "" : " › " + path.replace(/^\//, "").split("/").join(" › "));

  return (
    <div className="seo-serp">
      <div className="seo-serp-head">
        <span className="seo-serp-favicon">
          <Globe size={14} />
        </span>
        <div className="seo-serp-site">
          <span className="seo-serp-name">ATHLETIX</span>
          <span className="seo-serp-url">{crumb}</span>
        </div>
      </div>
      <div className="seo-serp-title">
        {truncate(title || "Untitled page", 60)}
      </div>
      <div className="seo-serp-desc">
        {truncate(
          description || "No meta description set for this page yet.",
          160
        )}
      </div>
    </div>
  );
}
