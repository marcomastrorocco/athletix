import type { Metadata } from "next";
import type {
  Block,
  PageContent,
  PageSchema,
  PageSeo,
  SeoSettings,
} from "./data";

// NOTE: this module is imported by client components (the SEO editor), so it
// must stay free of server-only deps. Anything needing storage/fs lives in
// `lib/seo-server.ts`.

// ===========================================================================
// 1. Next.js metadata builder
// ===========================================================================
// Turns stored per-page SEO + global settings into a Next `Metadata` object.
// Used inside `generateMetadata()` on the public pages so the admin dashboard
// drives the real <head> tags (title, description, canonical, robots, OG,
// Twitter). Relative image/canonical paths resolve against `metadataBase`.

function absolute(siteUrl: string, value?: string): string | undefined {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl.replace(/\/$/, "")}${value.startsWith("/") ? "" : "/"}${value}`;
}

export function buildPageMetadata(
  page: Pick<PageContent, "path" | "title" | "seo">,
  settings: SeoSettings
): Metadata {
  const seo: PageSeo = page.seo ?? {};
  const siteUrl = settings.siteUrl.replace(/\/$/, "");

  const title = seo.title || page.title || settings.defaultTitle;
  const description = seo.description || settings.defaultDescription;
  const canonical = seo.canonical || page.path || "/";
  const ogImage =
    absolute(siteUrl, seo.og?.image) ||
    absolute(siteUrl, settings.defaultOgImage);
  const twImage =
    absolute(siteUrl, seo.twitter?.image) || ogImage;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical },
    robots: {
      index: seo.robotsIndex !== "noindex",
      follow: seo.robotsFollow !== "nofollow",
    },
    openGraph: {
      type: "website",
      siteName: settings.organization.name,
      url: absolute(siteUrl, canonical),
      title: seo.og?.title || title,
      description: seo.og?.description || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: settings.twitterHandle || undefined,
      title: seo.twitter?.title || seo.og?.title || title,
      description:
        seo.twitter?.description || seo.og?.description || description,
      images: twImage ? [twImage] : undefined,
    },
  };
}

export type MetaFallback = {
  title?: string;
  description?: string;
  ogImage?: string;
};

// ===========================================================================
// 2. Content signals derived from a page's blocks
// ===========================================================================
// The scoring engine needs to know things the SEO form can't: is there an H1,
// do images have alt text, are there internal links? We derive these from the
// block model so the score reflects the real rendered page.

export type ContentSignals = {
  hasH1: boolean;
  imagesTotal: number;
  imagesWithAlt: number;
  internalLinks: number;
};

type ImgLike = { src?: string; image?: string; alt?: string; imageAlt?: string };

function countImage(b: ImgLike, acc: { total: number; withAlt: number }) {
  const src = b.image || b.src;
  if (!src) return;
  acc.total += 1;
  if ((b.imageAlt || b.alt || "").trim()) acc.withAlt += 1;
}

export function derivePageSignals(blocks: Block[]): ContentSignals {
  const acc = { total: 0, withAlt: 0 };
  let hasH1 = false;

  for (const block of blocks) {
    // H1: page banners and class heroes render the page's main heading.
    if (
      (block.type === "pageBanner" || block.type === "classHero") &&
      "title" in block &&
      block.title
    ) {
      hasH1 = true;
    }

    switch (block.type) {
      case "imageBlock":
      case "classHero":
      case "classCoach":
        countImage(block as ImgLike, acc);
        break;
      case "gallery":
        for (const img of block.images) countImage(img, acc);
        break;
      case "logoStrip":
      case "podcast":
        for (const logo of block.logos ?? []) countImage(logo, acc);
        break;
    }
  }

  // Internal links: count site-relative hrefs anywhere in the block tree,
  // including markdown links inside rich-text bodies.
  const serialized = JSON.stringify(blocks);
  const hrefMatches = serialized.match(/"(?:href|buttonHref|primaryHref|secondaryHref)":"\/[^"]*"/g) ?? [];
  const mdMatches = serialized.match(/\]\(\/[^)]*\)/g) ?? [];
  const internalLinks = hrefMatches.length + mdMatches.length;

  return {
    hasH1,
    imagesTotal: acc.total,
    imagesWithAlt: acc.withAlt,
    internalLinks,
  };
}

// ===========================================================================
// 3. SEO scoring engine (score out of 100)
// ===========================================================================

export type CheckStatus = "pass" | "warn" | "fail";
export type SeoCheck = {
  id: string;
  label: string;
  status: CheckStatus;
  points: number;
  max: number;
  hint: string;
};
export type SeoScore = {
  score: number; // 0-100
  checks: SeoCheck[];
  passed: number;
  total: number;
};

export type ScoreInput = {
  title?: string;
  description?: string;
  focusKeyword?: string;
} & Partial<ContentSignals>;

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

function includesKeyword(haystack: string | undefined, kw: string): boolean {
  if (!haystack) return false;
  return haystack.toLowerCase().includes(kw.toLowerCase());
}

export type ScoreOptions = {
  // When false (hardcoded pages we can't introspect), the H1/alt/internal-link
  // checks are omitted entirely and the score is scaled over the text checks
  // only — honest rather than penalising for things we didn't measure.
  analyzeContent?: boolean;
};

export function scoreSeo(input: ScoreInput, opts?: ScoreOptions): SeoScore {
  const analyzeContent = opts?.analyzeContent !== false;
  const title = (input.title ?? "").trim();
  const description = (input.description ?? "").trim();
  const kw = (input.focusKeyword ?? "").trim();
  const checks: SeoCheck[] = [];

  // 1. Title length — 50-60 ideal, partial credit for "present but off".
  checks.push(
    ((): SeoCheck => {
      const len = title.length;
      if (len >= TITLE_MIN && len <= TITLE_MAX)
        return tick("title-len", "Title length (50–60 chars)", "pass", 15, 15, `${len} chars — ideal.`);
      if (len === 0)
        return tick("title-len", "Title length (50–60 chars)", "fail", 0, 15, "Add an SEO title.");
      return tick("title-len", "Title length (50–60 chars)", "warn", 7, 15, `${len} chars — aim for ${TITLE_MIN}–${TITLE_MAX}.`);
    })()
  );

  // 2. Meta description length — 150-160 ideal.
  checks.push(
    ((): SeoCheck => {
      const len = description.length;
      if (len >= DESC_MIN && len <= DESC_MAX)
        return tick("desc-len", "Meta description (150–160 chars)", "pass", 15, 15, `${len} chars — ideal.`);
      if (len === 0)
        return tick("desc-len", "Meta description (150–160 chars)", "fail", 0, 15, "Add a meta description.");
      return tick("desc-len", "Meta description (150–160 chars)", "warn", 7, 15, `${len} chars — aim for ${DESC_MIN}–${DESC_MAX}.`);
    })()
  );

  // 3. Focus keyword in title.
  checks.push(
    kw
      ? includesKeyword(title, kw)
        ? tick("kw-title", "Focus keyword in title", "pass", 15, 15, "Found in title.")
        : tick("kw-title", "Focus keyword in title", "fail", 0, 15, `Add "${kw}" to the title.`)
      : tick("kw-title", "Focus keyword in title", "warn", 0, 15, "Set a focus keyword first.")
  );

  // 4. Focus keyword in description.
  checks.push(
    kw
      ? includesKeyword(description, kw)
        ? tick("kw-desc", "Focus keyword in description", "pass", 15, 15, "Found in description.")
        : tick("kw-desc", "Focus keyword in description", "fail", 0, 15, `Add "${kw}" to the description.`)
      : tick("kw-desc", "Focus keyword in description", "warn", 0, 15, "Set a focus keyword first.")
  );

  if (analyzeContent) {
    // 5. Presence of an H1.
    checks.push(
      input.hasH1
        ? tick("h1", "Page has an H1 heading", "pass", 12, 12, "H1 detected.")
        : tick("h1", "Page has an H1 heading", "fail", 0, 12, "Add a banner/hero heading.")
    );

    // 6. Image alt-text coverage.
    checks.push(
      ((): SeoCheck => {
        const total = input.imagesTotal ?? 0;
        const withAlt = input.imagesWithAlt ?? 0;
        if (total === 0)
          return tick("alt", "Image alt text", "warn", 8, 14, "No images on this page.");
        const ratio = withAlt / total;
        if (ratio >= 1)
          return tick("alt", "Image alt text", "pass", 14, 14, `All ${total} images have alt text.`);
        if (ratio >= 0.5)
          return tick("alt", "Image alt text", "warn", 8, 14, `${withAlt}/${total} images have alt text.`);
        return tick("alt", "Image alt text", "fail", 2, 14, `${withAlt}/${total} images have alt text.`);
      })()
    );

    // 7. Internal linking present.
    checks.push(
      (input.internalLinks ?? 0) > 0
        ? tick("links", "Internal linking present", "pass", 14, 14, `${input.internalLinks} internal links.`)
        : tick("links", "Internal linking present", "fail", 0, 14, "Add links to other pages.")
    );
  }

  const score = checks.reduce((s, c) => s + c.points, 0);
  const max = checks.reduce((s, c) => s + c.max, 0);
  const passed = checks.filter((c) => c.status === "pass").length;
  return {
    score: Math.round((score / max) * 100),
    checks,
    passed,
    total: checks.length,
  };
}

function tick(
  id: string,
  label: string,
  status: CheckStatus,
  points: number,
  max: number,
  hint: string
): SeoCheck {
  return { id, label, status, points, max, hint };
}

// ===========================================================================
// 4. JSON-LD schema generator
// ===========================================================================
// Produces a schema.org object from the per-page schema builder. Render the
// result as <script type="application/ld+json"> on the page.

export function buildJsonLd(
  schema: PageSchema | undefined,
  settings: SeoSettings,
  page: Pick<PageContent, "path" | "title" | "seo">
): Record<string, unknown> | null {
  if (!schema || schema.type === "none") return null;
  const d = schema.data ?? {};
  const siteUrl = settings.siteUrl.replace(/\/$/, "");
  const url = absolute(siteUrl, page.seo?.canonical || page.path);
  const base = { "@context": "https://schema.org" } as Record<string, unknown>;

  switch (schema.type) {
    case "Organization":
      return {
        ...base,
        "@type": "Organization",
        name: d.name || settings.organization.name,
        url: d.url || siteUrl,
        logo: absolute(siteUrl, d.logo || settings.organization.logo),
        sameAs: settings.organization.sameAs,
      };
    case "LocalBusiness":
      return {
        ...base,
        "@type": d.businessType || "LocalBusiness",
        name: d.name || settings.organization.name,
        image: absolute(siteUrl, d.image || settings.defaultOgImage),
        telephone: d.telephone,
        email: d.email,
        url: d.url || siteUrl,
        priceRange: d.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: d.streetAddress,
          addressLocality: d.addressLocality,
          addressRegion: d.addressRegion,
          postalCode: d.postalCode,
          addressCountry: d.addressCountry,
        },
        ...(d.latitude && d.longitude
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: d.latitude,
                longitude: d.longitude,
              },
            }
          : {}),
      };
    case "Article":
      return {
        ...base,
        "@type": "Article",
        headline: d.headline || page.seo?.title || page.title,
        description: d.description || page.seo?.description,
        image: absolute(siteUrl, d.image || page.seo?.og?.image),
        author: { "@type": "Person", name: d.author || settings.organization.name },
        publisher: {
          "@type": "Organization",
          name: settings.organization.name,
          logo: {
            "@type": "ImageObject",
            url: absolute(siteUrl, settings.organization.logo),
          },
        },
        datePublished: d.datePublished,
        dateModified: d.dateModified || d.datePublished,
        mainEntityOfPage: url,
      };
    case "Product":
      return {
        ...base,
        "@type": "Product",
        name: d.name || page.title,
        description: d.description || page.seo?.description,
        image: absolute(siteUrl, d.image || page.seo?.og?.image),
        brand: { "@type": "Brand", name: d.brand || settings.organization.name },
        ...(d.price
          ? {
              offers: {
                "@type": "Offer",
                price: d.price,
                priceCurrency: d.priceCurrency || "AUD",
                availability:
                  d.availability || "https://schema.org/InStock",
                url,
              },
            }
          : {}),
      };
    case "Event":
      return {
        ...base,
        "@type": "Event",
        name: d.name || page.title,
        description: d.description || page.seo?.description,
        startDate: d.startDate,
        endDate: d.endDate,
        eventStatus: d.eventStatus || "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: d.locationName || settings.organization.name,
          address: d.locationAddress,
        },
        image: absolute(siteUrl, d.image || page.seo?.og?.image),
        url,
      };
    case "FAQPage":
      return {
        ...base,
        "@type": "FAQPage",
        mainEntity: (schema.faq ?? [])
          .filter((f) => f.question && f.answer)
          .map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
      };
    default:
      return null;
  }
}
