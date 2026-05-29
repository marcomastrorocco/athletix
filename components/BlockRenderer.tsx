import Link from "next/link";
import { Fragment } from "react";
import { marked } from "marked";
import type { Block } from "@/lib/data";
import ClassBookSection from "./ClassBookSection";

function md(body: string): string {
  return marked.parse(body || "", { async: false }) as string;
}

function renderBlock(block: Block): React.ReactNode {
  switch (block.type) {
    case "pageBanner": {
      const isAbout = block.variant === "about";
      const hasTitle = !!block.title?.trim();
      const accent = block.titleAccent ? (
        <>
          {" "}
          <span className="accent">{block.titleAccent}</span>
        </>
      ) : null;
      return (
        <section
          key={block.id}
          className={
            "page-banner" +
            (isAbout ? " page-banner--about" : "") +
            (block.compact ? " page-banner--compact" : "")
          }
        >
          <div className="container">
            {block.crumbs && block.crumbs.length > 0 && (
              <p className="crumbs">
                {block.crumbs.map((c, i) => (
                  <Fragment key={i}>
                    {i > 0 && <span>/</span>}
                    {c.href ? (
                      <Link href={c.href}>{c.label}</Link>
                    ) : (
                      c.label
                    )}
                  </Fragment>
                ))}
              </p>
            )}
            {hasTitle && (
              <h1>
                {block.title}
                {accent}
              </h1>
            )}
            {block.lede && <p className="lede">{block.lede}</p>}
          </div>
        </section>
      );
    }

    case "richText": {
      const narrow = block.width !== "wide";
      return (
        <section key={block.id} className="page-section">
          <div className={"container" + (narrow ? " about-narrow" : "")}>
            {block.eyebrow && (
              <p className="about-eyebrow">{block.eyebrow}</p>
            )}
            {block.heading && (
              <h2 className="about-h2-center">{block.heading}</h2>
            )}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: md(block.body) }}
            />
          </div>
        </section>
      );
    }

    case "video":
      return (
        <section key={block.id} className="about-why">
          <div className="container about-narrow">
            {block.eyebrow && (
              <p className="about-eyebrow">{block.eyebrow}</p>
            )}
            {block.heading && (
              <h2 className="about-h2-center">{block.heading}</h2>
            )}
            {block.lede && <p className="about-why-lede">{block.lede}</p>}
            <div className="about-video">
              <iframe
                src={block.embedUrl}
                title={block.heading || "Video"}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      );

    case "numberedList":
      return (
        <section key={block.id} className="about-body">
          <div className="container about-narrow">
            {block.eyebrow && (
              <p className="about-eyebrow">{block.eyebrow}</p>
            )}
            {block.heading && (
              <h2 className="about-h2-center">{block.heading}</h2>
            )}
            {block.items.map((it, i) => (
              <article key={i} className="about-block">
                <span className="about-num">{it.num}</span>
                <div className="about-block-body">
                  <h3 className="about-block-title">{it.title}</h3>
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: md(it.body) }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      );

    case "featureGrid":
      return (
        <section key={block.id} className="page-section">
          <div className="container">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
            {block.heading && <h2>{block.heading}</h2>}
            {block.lede && <p className="lede">{block.lede}</p>}
            <div className="info-grid">
              {block.items.map((f, i) => (
                <div key={i} className="info-card">
                  <div className="icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "stats":
      return (
        <section key={block.id} className="about-stats">
          <div className="container">
            <div className="about-stats-grid">
              {block.items.map((s, i) => (
                <div key={i} className="about-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "imageBlock":
      return (
        <section key={block.id} className="about-team-photo">
          <div className="container about-narrow">
            {block.eyebrow && (
              <p className="about-eyebrow center">{block.eyebrow}</p>
            )}
            {block.heading && (
              <h2 className="about-h2-center">{block.heading}</h2>
            )}
            {block.lede && <p className="about-team-lede">{block.lede}</p>}
          </div>
          <div className="container">
            <div className="about-team-image">
              <img src={block.image} alt={block.imageAlt} />
            </div>
          </div>
        </section>
      );

    case "gallery":
      return (
        <section key={block.id} className="gallery">
          <div className="container">
            <div className="section-head">
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
              {block.heading && <h2>{block.heading}</h2>}
            </div>
          </div>
          <div className="gallery-strip">
            {block.images.map((im, i) =>
              im.video ? (
                <div key={i} className="gallery-video">
                  <iframe
                    src={im.video}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={im.alt || "Athletix video"}
                  />
                </div>
              ) : (
                <img key={i} src={im.src} alt={im.alt} />
              )
            )}
          </div>
        </section>
      );

    case "cta":
      return (
        <section key={block.id} className="trial-cta">
          {block.bgImage && (
            <div className="trial-media">
              <img src={block.bgImage} alt="" />
            </div>
          )}
          <div className="container trial-inner">
            {block.eyebrow && <p className="eyebrow light">{block.eyebrow}</p>}
            <h2 dangerouslySetInnerHTML={{ __html: block.heading }} />
            {block.body && <p>{block.body}</p>}
            <Link href={block.buttonHref} className="btn btn-primary btn-lg">
              {block.buttonLabel}
            </Link>
          </div>
        </section>
      );

    case "logoStrip":
      // home-v2.css scopes trust-wrap/logo-pill/etc. styles to `.home-v2`,
      // so wrap the block in that namespace to inherit them.
      return (
        <div key={block.id} className="home-v2">
          <div className="trust-wrap">
            <div className="trust-inner">
              {block.heading && <h2 className="trust-h">{block.heading}</h2>}
              {block.tagline && (
                <p
                  className="trust-tagline"
                  dangerouslySetInnerHTML={{ __html: md(block.tagline) }}
                />
              )}
              <div className="logo-row">
                {block.logos.map((l, i) => (
                  <div key={i} className="logo-pill">
                    <img src={l.src} alt={l.alt} />
                  </div>
                ))}
              </div>
              {block.quote && (
                <p
                  className="trust-quote"
                  dangerouslySetInnerHTML={{ __html: md(block.quote) }}
                />
              )}
            </div>
          </div>
        </div>
      );

    case "quote":
      return (
        <section key={block.id} className="page-section">
          <div className="container about-narrow">
            <blockquote className="about-pullquote">{block.text}</blockquote>
            {block.cite && (
              <p className="muted" style={{ textAlign: "right" }}>
                — {block.cite}
              </p>
            )}
          </div>
        </section>
      );

    case "html":
      return (
        <section
          key={block.id}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "podcast":
      return (
        <section key={block.id} className="about-body">
          <div className="container about-narrow">
            <aside className="about-podcast-feature">
              <div className="about-podcast-tag">
                <span className="dot" />
                {block.tag}
              </div>
              <h3 className="about-podcast-title">{block.title}</h3>
              <p
                className="about-podcast-body"
                dangerouslySetInnerHTML={{ __html: md(block.body) }}
              />
              <div className="about-podcast-actions">
                <a
                  href={block.primaryHref}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary"
                >
                  {block.primaryLabel}
                </a>
                {block.secondaryLabel && block.secondaryHref && (
                  <Link href={block.secondaryHref} className="btn btn-outline">
                    {block.secondaryLabel}
                  </Link>
                )}
              </div>
              {block.logos && block.logos.length > 0 && (
                <div className="about-podcast-logos">
                  {block.logos.map((logo, i) => (
                    <img
                      key={`${logo.src}-${i}`}
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </aside>
          </div>
        </section>
      );

    case "coaches":
      // Renderer relies on team data being fetched by the page itself. The
      // block here is just config (headings); team grid is rendered by a
      // dedicated component upstream.
      return null;

    case "classHero": {
      const mediaStyle: React.CSSProperties = {};
      if (block.imageBackground) mediaStyle.background = block.imageBackground;
      const imgStyle: React.CSSProperties = block.imageContain
        ? { objectFit: "contain", objectPosition: "center" }
        : {};
      return (
        <section key={block.id} className="yaf-hero">
          <div className="container yaf-hero-grid">
            <div className="yaf-hero-copy">
              {block.eyebrow && (
                <p className="yaf-eyebrow">
                  <span className="yaf-eyebrow-dot" /> {block.eyebrow}
                </p>
              )}
              <h1 className="yaf-title">{block.title}</h1>
              <hr className="yaf-divider" />
              <div
                className="yaf-lead rich-text"
                dangerouslySetInnerHTML={{ __html: md(block.lead) }}
              />
              {(block.primaryBtn || block.secondaryBtn) && (
                <div className="yaf-hero-cta">
                  {block.primaryBtn && (
                    <Link
                      href={block.primaryBtn.href}
                      className="btn btn-primary"
                    >
                      {block.primaryBtn.label}
                    </Link>
                  )}
                  {block.secondaryBtn && (
                    <Link
                      href={block.secondaryBtn.href}
                      className="btn btn-ghost"
                    >
                      {block.secondaryBtn.label}
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="yaf-media" style={mediaStyle}>
              <img
                src={block.image}
                alt={block.imageAlt}
                loading="lazy"
                style={imgStyle}
              />
              {block.badge && (
                <span className="yaf-media-badge">{block.badge}</span>
              )}
            </div>
          </div>
        </section>
      );
    }

    case "classInfo":
      return (
        <section key={block.id} className="yaf-info">
          <div className="container">
            <div className="yaf-info-grid">
              {block.cards.map((c, i) => (
                <article
                  key={i}
                  className={
                    "yaf-info-card" +
                    (c.variant === "hours" ? " yaf-info-card--hours" : "")
                  }
                >
                  <span className="yaf-info-card-icon" aria-hidden="true">
                    {c.icon}
                  </span>
                  <h3>{c.title}</h3>
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: md(c.body) }}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case "pillars":
      return (
        <section key={block.id} className="yaf-includes">
          <div className="container">
            {(block.eyebrow || block.heading || block.sub) && (
              <header className="yaf-includes-head">
                {block.eyebrow && (
                  <p className="yaf-includes-eyebrow">{block.eyebrow}</p>
                )}
                {block.heading && <h2>{block.heading}</h2>}
                {block.sub && <p className="yaf-includes-sub">{block.sub}</p>}
              </header>
            )}
            <div className="yaf-pillars">
              {block.items.map((p, i) => (
                <article key={i} className="yaf-pillar">
                  <span className="yaf-pillar-num">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case "classBooking":
      return (
        <ClassBookSection
          key={block.id}
          sourceLabel={block.sourceLabel}
          defaultClass={block.defaultClass}
        />
      );

    case "classCoach":
      return (
        <section key={block.id} className="yaf-coach">
          <div className="container">
            <h2>{block.heading || "Class coach"}</h2>
            <div className="yaf-coach-card">
              <div className="yaf-coach-image">
                <img
                  src={block.image}
                  alt={block.imageAlt}
                  loading="lazy"
                  width={320}
                  height={400}
                />
              </div>
              <div className="yaf-coach-info">
                {block.eyebrow && (
                  <p className="yaf-coach-eyebrow">{block.eyebrow}</p>
                )}
                <h3 className="yaf-coach-name">{block.name}</h3>
                <div
                  className="yaf-coach-bio rich-text"
                  dangerouslySetInnerHTML={{ __html: md(block.bio) }}
                />
                {block.links.length > 0 && (
                  <div className="yaf-coach-links">
                    {block.links.map((l, i) => (
                      <Link
                        key={i}
                        href={l.href}
                        className={
                          "btn btn-sm " +
                          (l.style === "outline" ? "btn-outline" : "btn-ghost")
                        }
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case "faq":
      return (
        <section key={block.id} className="yaf-faq">
          <div className="container">
            <header className="yaf-faq-head">
              {block.heading && <h2>{block.heading}</h2>}
              {block.sub && <p>{block.sub}</p>}
            </header>
            <div className="yaf-faq-list">
              {block.items.map((f, i) => (
                <details key={i} className="yaf-faq-item">
                  <summary>{f.q}</summary>
                  <div
                    className="yaf-faq-body rich-text"
                    dangerouslySetInnerHTML={{ __html: md(f.a) }}
                  />
                </details>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b) => renderBlock(b))}</>;
}

export { renderBlock };
