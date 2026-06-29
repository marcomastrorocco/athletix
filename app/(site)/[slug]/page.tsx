import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import {
  getBlog,
  getBlogBySlug,
  getSeoSettings,
  type BlogPost,
  type PageSeo,
  type PageSchema,
} from "@/lib/data";
import { buildPageMetadata, buildJsonLd } from "@/lib/seo";

type Ctx = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

// Per-post SEO: the post's own `seo` overrides win; otherwise we fall back to the
// title, excerpt and cover image so every post still has sensible metadata.
function resolvePostSeo(post: BlogPost): PageSeo {
  return {
    ...post.seo,
    title: post.seo?.title || `${post.title} — ATHLETIX Blog`,
    description: post.seo?.description || post.excerpt,
    og: { ...post.seo?.og, image: post.seo?.og?.image || post.image },
  };
}

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogBySlug(slug),
    getSeoSettings(),
  ]);
  if (!post) return { title: "Not found" };
  const seo = resolvePostSeo(post);
  return buildPageMetadata(
    { path: `/${slug}`, title: seo.title || post.title, seo },
    settings
  );
}

export async function generateStaticParams() {
  const posts = await getBlog();
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

function formatDate(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function authorInitials(name?: string) {
  if (!name) return "A";
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function BlogPostPage({ params }: Ctx) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogBySlug(slug),
    getSeoSettings(),
  ]);
  if (!post || !post.published) notFound();

  const html = marked.parse(post.body, { breaks: true, async: false }) as string;

  // Structured data: default to an Article built from the post, unless the editor
  // chose a different schema type. Editor `schema.data` values win per-field.
  const chosenType = post.seo?.schema?.type;
  const schema: PageSchema = {
    type: chosenType && chosenType !== "none" ? chosenType : "Article",
    data: {
      headline: post.title,
      ...(post.author ? { author: post.author } : {}),
      datePublished: post.date,
      dateModified: post.date,
      image: post.image,
      description: post.excerpt,
      ...post.seo?.schema?.data,
    },
    faq: post.seo?.schema?.faq,
  };
  const jsonLd = buildJsonLd(schema, settings, {
    path: `/${slug}`,
    title: post.title,
    seo: resolvePostSeo(post),
  });

  const all = (await getBlog())
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  // Sidebar — 4 small cards (popular / related)
  const sidebarRelated = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 4);
  const sidebarFill = all.filter((p) => p.slug !== post.slug).slice(0, 4);
  const sidebarPosts =
    sidebarRelated.length >= 4
      ? sidebarRelated
      : [...sidebarRelated, ...sidebarFill].slice(0, 4);

  // Bottom row — 4 horizontal cards
  const bottomRelated = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 4);
  const bottomFill = all.filter((p) => p.slug !== post.slug).slice(0, 4);
  const bottomPosts: BlogPost[] =
    bottomRelated.length >= 4
      ? bottomRelated
      : [...bottomRelated, ...bottomFill].slice(0, 4);

  return (
    <>
      <link rel="stylesheet" href="/css/blog-page.css" />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <article className="post-page">
        <div className="container post-page-inner">
          {/* Top — title + meta */}
          <header className="post-top">
            <p className="post-crumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span>{post.category}</span>
            </p>
            <span className="post-category-pill">{post.category}</span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta-bar">
              <span className="post-meta-avatar" aria-hidden="true">
                {authorInitials(post.author)}
              </span>
              <div className="post-meta-text">
                {post.author && (
                  <span className="post-meta-author">By {post.author}</span>
                )}
                <span className="post-meta-line">
                  {formatDate(post.date)}
                  <span className="dot" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Featured image */}
          <figure className="post-featured">
            <img src={post.image} alt={post.title} />
          </figure>

          {/* Two-column: article + sidebar */}
          <div className="post-grid">
            <div className="post-main">
              <div
                className="blog-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  <span className="post-tags-label">Tagged</span>
                  <div className="post-tags-list">
                    {post.tags.map((t) => (
                      <span key={t} className="post-tag">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="post-share">
                <Link href="/blog" className="back-to-blog">
                  <span aria-hidden="true">←</span> Back to all posts
                </Link>
              </div>
            </div>

            <aside className="post-sidebar">
              <div className="sidebar-card sidebar-related">
                <h3 className="sidebar-title">Popular Posts</h3>
                <ul className="sidebar-list">
                  {sidebarPosts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${p.slug}`}
                        className="sidebar-item"
                      >
                        <span className="sidebar-thumb">
                          <img src={p.image} alt="" loading="lazy" />
                        </span>
                        <span className="sidebar-meta">
                          <span className="sidebar-cat">{p.category}</span>
                          <span className="sidebar-item-title">{p.title}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-card sidebar-cta">
                <span className="sidebar-cta-eyebrow">$7 TRIAL</span>
                <h4 className="sidebar-cta-title">
                  Train with the pros for 7 days.
                </h4>
                <p className="sidebar-cta-body">
                  Unlimited classes. Fully refundable. Brisbane&rsquo;s elite
                  S&amp;C gym.
                </p>
                <Link href="/contact-us" className="sidebar-cta-btn">
                  Book Trial
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {bottomPosts.length > 0 && (
        <section className="related-posts">
          <div className="container">
            <div className="related-head">
              <p className="eyebrow">Keep Reading</p>
              <h2>YOU MIGHT ALSO LIKE</h2>
            </div>
            <div className="related-row">
              {bottomPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="related-row-card"
                >
                  <span className="related-row-thumb">
                    <img src={p.image} alt="" loading="lazy" />
                  </span>
                  <span className="related-row-body">
                    <span className="related-row-cat">{p.category}</span>
                    <span className="related-row-title">{p.title}</span>
                    <span className="related-row-date">
                      {formatDate(p.date)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
