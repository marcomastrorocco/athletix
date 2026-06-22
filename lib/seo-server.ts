import type { Metadata } from "next";
import type { PageSeo } from "./data";
import {
  getPage,
  getSite,
  getBlog,
  getBlogBySlug,
  getSeoOverride,
  getSeoOverrides,
  getSeoSettings,
} from "./data";
import {
  SEO_PAGES,
  seoPageByPath,
  seoPageBySlug,
  type SeoPage,
  type SeoGroup,
} from "./seoPages";
import {
  buildPageMetadata,
  derivePageSignals,
  scoreSeo,
  type ContentSignals,
  type MetaFallback,
} from "./seo";

// Server-only SEO helpers (touch storage). Kept out of `lib/seo.ts` because that
// module is imported by client components and must not pull in `fs`/blob.

/**
 * The single entry point every public page calls inside generateMetadata().
 * Per-field resolution order: dashboard override → inline fallback (the page's
 * own dynamic source, e.g. site.meta) → registry default → global setting.
 */
export async function resolvePageMetadata(
  path: string,
  fallback?: MetaFallback
): Promise<Metadata> {
  const [override, settings] = await Promise.all([
    getSeoOverride(path),
    getSeoSettings(),
  ]);
  const reg = seoPageByPath(path);
  const seo: PageSeo = { ...(override ?? {}) };
  if (!seo.title) seo.title = fallback?.title || reg?.defaultTitle;
  if (!seo.description)
    seo.description = fallback?.description || reg?.defaultDescription;
  return buildPageMetadata(
    { path, title: seo.title || reg?.defaultTitle || "", seo },
    settings
  );
}

// Each managed route's "live default" comes from a different place depending on
// its source; this centralises that so the admin pages stay simple.
async function liveDefault(page: SeoPage): Promise<MetaFallback> {
  if (page.source === "home") {
    const site = await getSite();
    return { title: site.meta?.title, description: site.meta?.description };
  }
  if (page.source === "page-json") {
    const p = await getPage(page.slug);
    return { title: p?.seo?.title, description: p?.seo?.description };
  }
  return { title: page.defaultTitle, description: page.defaultDescription };
}

export type SeoEditorContext = {
  page: SeoPage;
  override: PageSeo;
  defaults: MetaFallback;
  signals: ContentSignals;
  analyzeContent: boolean;
  siteUrl: string;
};

/** Everything the per-page SEO editor needs, resolved by registry source. */
export async function getSeoEditorContext(
  slug: string
): Promise<SeoEditorContext | null> {
  const page = seoPageBySlug(slug);
  if (!page) return null;
  const [override, settings, defaults] = await Promise.all([
    getSeoOverride(page.path),
    getSeoSettings(),
    liveDefault(page),
  ]);
  let signals: ContentSignals = {
    hasH1: false,
    imagesTotal: 0,
    imagesWithAlt: 0,
    internalLinks: 0,
  };
  let analyzeContent = false;
  if (page.source === "page-json") {
    const p = await getPage(page.slug);
    if (p) {
      signals = derivePageSignals(p.blocks);
      analyzeContent = true;
    }
  }
  return {
    page,
    override: override ?? {},
    defaults,
    signals,
    analyzeContent,
    siteUrl: settings.siteUrl,
  };
}

export type SeoOverviewRow = {
  slug: string;
  path: string;
  label: string;
  group: SeoGroup;
  score: number;
  hasOverride: boolean;
  focusKeyword?: string;
};

/** One row per managed route for the SEO Manager list, with a live score. */
export async function getSeoOverview(): Promise<SeoOverviewRow[]> {
  const overrides = await getSeoOverrides();
  return Promise.all(
    SEO_PAGES.map(async (p): Promise<SeoOverviewRow> => {
      const ov = overrides[p.path];
      const def = !ov?.title || !ov?.description ? await liveDefault(p) : {};
      const title = ov?.title || def.title;
      const description = ov?.description || def.description;
      let signals: Partial<ContentSignals> = {};
      let analyzeContent = false;
      if (p.source === "page-json") {
        const pg = await getPage(p.slug);
        if (pg) {
          signals = derivePageSignals(pg.blocks);
          analyzeContent = true;
        }
      }
      const score = scoreSeo(
        { title, description, focusKeyword: ov?.focusKeyword, ...signals },
        { analyzeContent }
      ).score;
      return {
        slug: p.slug,
        path: p.path,
        label: p.label,
        group: p.group,
        score,
        hasOverride: !!ov,
        focusKeyword: ov?.focusKeyword,
      };
    })
  );
}

export type SeoBlogRow = {
  slug: string;
  title: string;
  path: string;
  date: string;
  published: boolean;
  score: number;
  hasOverride: boolean;
};

/** One row per blog post for the SEO Manager's "Blog" group, newest first. */
export async function getBlogSeoOverview(): Promise<SeoBlogRow[]> {
  const posts = await getBlog();
  const rows = posts.map((post): SeoBlogRow => {
    const title = post.seo?.title || `${post.title} — ATHLETIX Blog`;
    const description = post.seo?.description || post.excerpt;
    const score = scoreSeo(
      { title, description, focusKeyword: post.seo?.focusKeyword },
      { analyzeContent: false }
    ).score;
    return {
      slug: post.slug,
      title: post.title,
      path: `/blog/${post.slug}`,
      date: post.date,
      published: post.published,
      hasOverride: !!post.seo,
      score,
    };
  });
  return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export type BlogSeoContext = {
  slug: string;
  title: string;
  path: string;
  seo: PageSeo;
  defaults: MetaFallback;
  siteUrl: string;
};

/** Everything the per-post SEO editor (inside the SEO Manager) needs. */
export async function getBlogSeoContext(
  slug: string
): Promise<BlogSeoContext | null> {
  const [post, settings] = await Promise.all([
    getBlogBySlug(slug),
    getSeoSettings(),
  ]);
  if (!post) return null;
  return {
    slug: post.slug,
    title: post.title,
    path: `/blog/${post.slug}`,
    seo: post.seo ?? {},
    defaults: {
      title: `${post.title} — ATHLETIX Blog`,
      description: post.excerpt || undefined,
      ogImage: post.image || undefined,
    },
    siteUrl: settings.siteUrl,
  };
}
