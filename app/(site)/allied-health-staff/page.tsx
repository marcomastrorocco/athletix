import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import { getAlliedHealth, type PracLink } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/allied-health-staff");
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.01 3.62 4.63V19z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.34 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.56 2.91.3.78.7 1.44 1.38 2.13.69.69 1.35 1.08 2.13 1.38.76.29 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.29-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.34 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm7.94 7h-3.38a15.7 15.7 0 0 0-1.32-3.41A8.03 8.03 0 0 1 19.94 7zM12 2.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM2.26 14a7.96 7.96 0 0 1 0-4h3.87a16.6 16.6 0 0 0 0 4H2.26zm.82 2h3.38c.34 1.2.79 2.35 1.32 3.41A8.03 8.03 0 0 1 3.08 16zm3.38-9H3.08a8.03 8.03 0 0 1 4.7-3.41A15.7 15.7 0 0 0 6.46 7zM12 21.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 16H9.66a14.6 14.6 0 0 1 0-4h4.68a14.6 14.6 0 0 1 0 4zm.22 3.41c.53-1.06.98-2.21 1.32-3.41h3.38a8.03 8.03 0 0 1-4.7 3.41zM17.87 14a16.6 16.6 0 0 0 0-4h3.87a7.96 7.96 0 0 1 0 4h-3.87z" />
    </svg>
  );
}

function linkIcon(type: string) {
  if (type === "linkedin") return <LinkedInIcon />;
  if (type === "instagram") return <InstagramIcon />;
  return <WebsiteIcon />;
}

function socialLabel(p: { name: string }, l: PracLink) {
  return l.label ? `${p.name} — ${l.label}` : `${p.name} link`;
}

export default async function AlliedHealthPage() {
  const data = await getAlliedHealth();
  const { intro, practitioners, faqs } = data;

  return (
    <>
      <link rel="stylesheet" href="/css/allied-health-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about-us">About</Link>{" "}
            <span>/</span> Allied Health
          </p>
          <h1>
            ALLIED <span className="accent">HEALTH</span>
          </h1>
          <p className="lede">
            Sports Rehab, Physiotherapists &amp; Exercise Physiologists —
            integrated with your training under one roof.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="ah-intro">
        <div className="container ah-intro-grid">
          <div className="ah-intro-copy">
            <p className="ah-eyebrow">{intro.eyebrow}</p>
            <h2
              className="ah-h2"
              dangerouslySetInnerHTML={{ __html: intro.heading }}
            />
            <div dangerouslySetInnerHTML={{ __html: intro.bodyHtml }} />
          </div>
          <div className="ah-intro-media">
            <img src={intro.image.src} alt={intro.image.alt} />
          </div>
        </div>
      </section>

      {/* PRACTITIONERS HEAD */}
      <section className="ah-prac-head">
        <div className="container">
          <p className="ah-eyebrow ah-eyebrow--center">Meet the Team</p>
          <h2 className="ah-h2 ah-h2--center">Our Practitioners</h2>
          <span className="ah-divider" />
        </div>
      </section>

      {/* PRACTITIONERS */}
      <section>
        <div className="container ah-pracs">
          {practitioners.map((p, i) => (
            <article
              key={p.id}
              className={`ah-prac${i % 2 === 1 ? " is-flipped" : ""}`}
            >
              <div className="ah-prac-media">
                <div className="ah-prac-photo">
                  <img
                    src={p.image || "/image/athlethix-logo.png"}
                    alt={`${p.name} — ${p.role}`}
                  />
                  <span className="ah-prac-photo-tag">{p.role}</span>
                </div>
              </div>
              <div className="ah-prac-body">
                <span className="ah-prac-role">{p.role}</span>
                <h3 className="ah-prac-name">{p.name}</h3>
                <p className="ah-prac-title">{p.title}</p>
                <div dangerouslySetInnerHTML={{ __html: p.bioHtml }} />
                {p.qualifications.length > 0 && (
                  <>
                    <p className="ah-prac-sub">Qualifications</p>
                    <ul className="ah-prac-list">
                      {p.qualifications.map((q) => (
                        <li key={q}>
                          <span className="ah-tick">✓</span> {q}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {p.experience.length > 0 && (
                  <>
                    <p className="ah-prac-sub">Experience</p>
                    <ul className="ah-prac-list">
                      {p.experience.map((e) => (
                        <li key={e}>
                          <span className="ah-tick">✓</span> {e}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {p.links.length > 0 && (
                  <div className="ah-prac-socials">
                    {p.links
                      .filter((l) => l.href)
                      .map((l, li) => (
                        <a
                          key={li}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={socialLabel(p, l)}
                        >
                          {linkIcon(l.type)}
                        </a>
                      ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="ah-faq">
        <div className="container">
          <h2 className="ah-faq-title">Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <details key={i} className="ah-faq-item" open={f.open}>
              <summary>{f.q}</summary>
              <div className="ah-faq-body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="home-v2">
        <div className="cta-section">
          <div className="cta-grid-bg" />
          <div className="cta-inner">
            <div className="cta-tag">Book In</div>
            <h2 className="cta-h">
              Train, recover,
              <br />
              <em>return.</em>
            </h2>
            <p className="cta-sub">
              Integrated physio, rehab and exercise physiology — built around
              your training, not bolted on.
            </p>
            <p className="cta-detail">
              Same-roof care · Specialist team · Sports-specific rehab
            </p>
            <div className="cta-btns">
              <Link href="/contact-us" className="btn-primary">
                Book a Consultation
              </Link>
              <Link href="/our-team" className="btn-ghost">
                Meet the Coaches
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
