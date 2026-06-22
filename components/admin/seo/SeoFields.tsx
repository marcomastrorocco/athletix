"use client";

import { useMemo, useState } from "react";
import { Search, Share2, Code2, SlidersHorizontal } from "lucide-react";
import type { PageSeo, SchemaType, SocialMeta } from "@/lib/data";
import { scoreSeo, type ContentSignals, type MetaFallback } from "@/lib/seo";
import GooglePreview from "./GooglePreview";
import SeoScorePanel from "./SeoScorePanel";

type Tab = "general" | "social" | "schema" | "advanced";

const SCHEMA_TYPES: SchemaType[] = [
  "none",
  "Organization",
  "LocalBusiness",
  "Article",
  "Product",
  "FAQPage",
  "Event",
];

// Which free-text data keys each schema type exposes in the builder.
const SCHEMA_FIELDS: Record<string, { key: string; label: string }[]> = {
  Organization: [
    { key: "name", label: "Organization name" },
    { key: "url", label: "URL" },
    { key: "logo", label: "Logo URL" },
  ],
  LocalBusiness: [
    { key: "businessType", label: "Schema @type (e.g. SportsActivityLocation)" },
    { key: "name", label: "Business name" },
    { key: "telephone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "streetAddress", label: "Street address" },
    { key: "addressLocality", label: "Suburb / city" },
    { key: "addressRegion", label: "State" },
    { key: "postalCode", label: "Postcode" },
    { key: "addressCountry", label: "Country code" },
    { key: "priceRange", label: "Price range ($$)" },
    { key: "latitude", label: "Latitude" },
    { key: "longitude", label: "Longitude" },
  ],
  Article: [
    { key: "headline", label: "Headline" },
    { key: "author", label: "Author" },
    { key: "datePublished", label: "Date published (ISO)" },
    { key: "dateModified", label: "Date modified (ISO)" },
    { key: "image", label: "Image URL" },
  ],
  Product: [
    { key: "name", label: "Product name" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "priceCurrency", label: "Currency (AUD)" },
    { key: "availability", label: "Availability URL" },
    { key: "image", label: "Image URL" },
  ],
  Event: [
    { key: "name", label: "Event name" },
    { key: "startDate", label: "Start date (ISO)" },
    { key: "endDate", label: "End date (ISO)" },
    { key: "locationName", label: "Location name" },
    { key: "locationAddress", label: "Location address" },
    { key: "image", label: "Image URL" },
  ],
};

// The full SEO form (General / Social / Schema / Advanced) + live Google preview
// and score. Controlled: it edits the `seo` value through `onChange` and holds no
// data of its own, so it can be embedded anywhere (per-page SEO Manager, or inline
// in another editor such as the blog post editor).
export default function SeoFields({
  seo,
  onChange,
  path,
  siteUrl,
  defaults,
  signals,
  analyzeContent,
}: {
  seo: PageSeo;
  onChange: (next: PageSeo) => void;
  path: string;
  siteUrl: string;
  defaults: MetaFallback;
  signals: ContentSignals;
  analyzeContent: boolean;
}) {
  const [tab, setTab] = useState<Tab>("general");

  const set = (patch: Partial<PageSeo>) => onChange({ ...seo, ...patch });
  const setOg = (patch: Partial<SocialMeta>) =>
    onChange({ ...seo, og: { ...seo.og, ...patch } });
  const setTw = (patch: Partial<SocialMeta>) =>
    onChange({ ...seo, twitter: { ...seo.twitter, ...patch } });

  // What the live page will actually use: override value, else the page's
  // current default. The preview and score reflect this effective value.
  const effectiveTitle = seo.title || defaults.title || "";
  const effectiveDesc = seo.description || defaults.description || "";

  const score = useMemo(
    () =>
      scoreSeo(
        {
          title: effectiveTitle,
          description: effectiveDesc,
          focusKeyword: seo.focusKeyword,
          ...signals,
        },
        { analyzeContent }
      ),
    [effectiveTitle, effectiveDesc, seo.focusKeyword, signals, analyzeContent]
  );

  const schema = seo.schema ?? { type: "none" as SchemaType };
  const titleLen = effectiveTitle.length;
  const descLen = effectiveDesc.length;

  return (
    <div className="seo-editor">
      <div className="seo-editor-main">
        <nav className="tab-bar" aria-label="SEO sections">
          <button className={`tab-btn ${tab === "general" ? "active" : ""}`} onClick={() => setTab("general")} type="button">
            <Search size={14} /> General
          </button>
          <button className={`tab-btn ${tab === "social" ? "active" : ""}`} onClick={() => setTab("social")} type="button">
            <Share2 size={14} /> Social
          </button>
          <button className={`tab-btn ${tab === "schema" ? "active" : ""}`} onClick={() => setTab("schema")} type="button">
            <Code2 size={14} /> Schema
          </button>
          <button className={`tab-btn ${tab === "advanced" ? "active" : ""}`} onClick={() => setTab("advanced")} type="button">
            <SlidersHorizontal size={14} /> Advanced
          </button>
        </nav>

        {tab === "general" && (
          <div className="form-grid">
            <p className="field field-wide muted" style={{ marginBottom: 4, fontSize: 12 }}>
              Leave a field blank to keep the current default (shown as
              placeholder).
            </p>
            <label className="field field-wide">
              <span>
                SEO Title <small className={titleLen >= 50 && titleLen <= 60 ? "ok" : "warn"}>{titleLen} / 60</small>
              </span>
              <input
                type="text"
                value={seo.title ?? ""}
                onChange={(e) => set({ title: e.target.value })}
                placeholder={defaults.title || "Brisbane Strength & Conditioning Gym | ATHLETIX"}
              />
            </label>
            <label className="field field-wide">
              <span>
                Meta Description <small className={descLen >= 150 && descLen <= 160 ? "ok" : "warn"}>{descLen} / 160</small>
              </span>
              <textarea
                rows={3}
                value={seo.description ?? ""}
                onChange={(e) => set({ description: e.target.value })}
                placeholder={defaults.description || "Describe this page in 150–160 characters…"}
              />
            </label>
            <label className="field">
              <span>URL Slug</span>
              <input type="text" value={path} disabled />
            </label>
            <label className="field">
              <span>Focus Keyword</span>
              <input
                type="text"
                value={seo.focusKeyword ?? ""}
                onChange={(e) => set({ focusKeyword: e.target.value })}
                placeholder="brisbane strength and conditioning"
              />
            </label>
          </div>
        )}

        {tab === "social" && (
          <div className="form-grid">
            <div className="field field-wide seo-subhead">Open Graph (Facebook, LinkedIn, WhatsApp)</div>
            <label className="field field-wide">
              <span>OG Title</span>
              <input type="text" value={seo.og?.title ?? ""} onChange={(e) => setOg({ title: e.target.value })} placeholder="Falls back to SEO title" />
            </label>
            <label className="field field-wide">
              <span>OG Description</span>
              <textarea rows={2} value={seo.og?.description ?? ""} onChange={(e) => setOg({ description: e.target.value })} placeholder="Falls back to meta description" />
            </label>
            <label className="field field-wide">
              <span>OG Image URL</span>
              <input type="text" value={seo.og?.image ?? ""} onChange={(e) => setOg({ image: e.target.value })} placeholder={defaults.ogImage ? `Falls back to ${defaults.ogImage}` : "/image/og-cover.jpg or https://…"} />
            </label>

            <div className="field field-wide seo-subhead">Twitter / X Card</div>
            <label className="field field-wide">
              <span>Twitter Title</span>
              <input type="text" value={seo.twitter?.title ?? ""} onChange={(e) => setTw({ title: e.target.value })} placeholder="Falls back to OG / SEO title" />
            </label>
            <label className="field field-wide">
              <span>Twitter Description</span>
              <textarea rows={2} value={seo.twitter?.description ?? ""} onChange={(e) => setTw({ description: e.target.value })} placeholder="Falls back to OG / meta description" />
            </label>
            <label className="field field-wide">
              <span>Twitter Image URL</span>
              <input type="text" value={seo.twitter?.image ?? ""} onChange={(e) => setTw({ image: e.target.value })} placeholder="Falls back to OG image" />
            </label>
          </div>
        )}

        {tab === "schema" && (
          <div className="form-grid">
            <label className="field field-wide">
              <span>Schema Type (JSON-LD)</span>
              <select
                value={schema.type}
                onChange={(e) =>
                  set({ schema: { ...schema, type: e.target.value as SchemaType } })
                }
              >
                {SCHEMA_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t === "none" ? "— None —" : t}
                  </option>
                ))}
              </select>
            </label>

            {(SCHEMA_FIELDS[schema.type] ?? []).map((f) => (
              <label className="field" key={f.key}>
                <span>{f.label}</span>
                <input
                  type="text"
                  value={schema.data?.[f.key] ?? ""}
                  onChange={(e) =>
                    set({
                      schema: {
                        ...schema,
                        data: { ...schema.data, [f.key]: e.target.value },
                      },
                    })
                  }
                />
              </label>
            ))}

            {schema.type === "FAQPage" && (
              <div className="field field-wide">
                <span>FAQ entries</span>
                {(schema.faq ?? []).map((item, i) => (
                  <div className="seo-faq-row" key={i}>
                    <input
                      type="text"
                      placeholder="Question"
                      value={item.question}
                      onChange={(e) => {
                        const faq = [...(schema.faq ?? [])];
                        faq[i] = { ...faq[i], question: e.target.value };
                        set({ schema: { ...schema, faq } });
                      }}
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer"
                      value={item.answer}
                      onChange={(e) => {
                        const faq = [...(schema.faq ?? [])];
                        faq[i] = { ...faq[i], answer: e.target.value };
                        set({ schema: { ...schema, faq } });
                      }}
                    />
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() =>
                        set({
                          schema: {
                            ...schema,
                            faq: (schema.faq ?? []).filter((_, j) => j !== i),
                          },
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn ghost sm"
                  onClick={() =>
                    set({
                      schema: {
                        ...schema,
                        faq: [...(schema.faq ?? []), { question: "", answer: "" }],
                      },
                    })
                  }
                >
                  + Add Q&A
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "advanced" && (
          <div className="form-grid">
            <label className="field field-wide">
              <span>Canonical URL</span>
              <input
                type="text"
                value={seo.canonical ?? ""}
                onChange={(e) => set({ canonical: e.target.value })}
                placeholder={`Defaults to ${path}`}
              />
            </label>
            <label className="field">
              <span>Indexing</span>
              <select
                value={seo.robotsIndex ?? "index"}
                onChange={(e) => set({ robotsIndex: e.target.value as PageSeo["robotsIndex"] })}
              >
                <option value="index">index (show in search)</option>
                <option value="noindex">noindex (hide from search)</option>
              </select>
            </label>
            <label className="field">
              <span>Link following</span>
              <select
                value={seo.robotsFollow ?? "follow"}
                onChange={(e) => set({ robotsFollow: e.target.value as PageSeo["robotsFollow"] })}
              >
                <option value="follow">follow</option>
                <option value="nofollow">nofollow</option>
              </select>
            </label>
          </div>
        )}
      </div>

      <aside className="seo-editor-side">
        <section className="card">
          <h3>Google Preview</h3>
          <GooglePreview
            siteUrl={siteUrl}
            path={path}
            title={effectiveTitle}
            description={effectiveDesc}
          />
        </section>
        <section className="card">
          <h3>SEO Score</h3>
          <SeoScorePanel result={score} />
        </section>
      </aside>
    </div>
  );
}
