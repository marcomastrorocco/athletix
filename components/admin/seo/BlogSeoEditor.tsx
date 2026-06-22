"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { PageSeo } from "@/lib/data";
import type { MetaFallback } from "@/lib/seo";
import { showToast } from "../Toast";
import SeoFields from "./SeoFields";

const NO_SIGNALS = {
  hasH1: false,
  imagesTotal: 0,
  imagesWithAlt: 0,
  internalLinks: 0,
};

// SEO editor for a single blog post, used inside the SEO Manager. Saves just the
// post's `seo` block via the blog API (the PUT route merges it into the post).
export default function BlogSeoEditor({
  slug,
  path,
  siteUrl,
  initial,
  defaults,
}: {
  slug: string;
  path: string;
  siteUrl: string;
  initial: PageSeo;
  defaults: MetaFallback;
}) {
  const [seo, setSeo] = useState<PageSeo>(initial ?? {});
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seo }),
      });
      if (res.ok) showToast("SEO saved", "ok");
      else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error || `Save failed (HTTP ${res.status})`, "err");
      }
    } catch (e) {
      showToast((e as Error).message, "err");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SeoFields
        seo={seo}
        onChange={setSeo}
        path={path}
        siteUrl={siteUrl}
        defaults={defaults}
        signals={NO_SIGNALS}
        analyzeContent={false}
      />
      <div className="seo-editor-actions">
        <button className="btn primary" type="button" onClick={save} disabled={saving}>
          <Save size={15} /> {saving ? "Saving…" : "Save SEO"}
        </button>
      </div>
    </>
  );
}
