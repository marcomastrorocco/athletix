"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Trophy,
  Dumbbell,
  Users,
  Zap,
  Microscope,
  TrendingUp,
  Medal,
  BarChart,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import type { Coach, SiteContent } from "@/lib/data";

const ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  trophy: Trophy,
  dumbbell: Dumbbell,
  users: Users,
  zap: Zap,
  microscope: Microscope,
  "trending-up": TrendingUp,
  medal: Medal,
  "bar-chart": BarChart,
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const C = ICONS[name?.toLowerCase?.()] ?? Trophy;
  return <C size={size} strokeWidth={1.75} />;
}

export default function HomeV2({
  site,
  coaches,
}: {
  site: SiteContent;
  coaches: Coach[];
}) {
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Observer also marks elements as visible if they are above the viewport
    // (already scrolled past) — handles browser back-navigation where scroll
    // restoration lands the user mid-page.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.bottom <= 0) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.07 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));

    // Reveal anything currently at or above the viewport. Called multiple
    // times to catch browser scroll restoration whenever it lands.
    const revealAtOrAbove = () => {
      const vh = window.innerHeight;
      sectionRefs.current.forEach((el) => {
        if (el && el.getBoundingClientRect().top < vh) {
          el.classList.add("visible");
        }
      });
    };
    revealAtOrAbove();
    const raf = requestAnimationFrame(() => {
      revealAtOrAbove();
      requestAnimationFrame(revealAtOrAbove);
    });
    const t1 = window.setTimeout(revealAtOrAbove, 60);
    const t2 = window.setTimeout(revealAtOrAbove, 250);
    const onScrollOnce = () => revealAtOrAbove();
    window.addEventListener("scroll", onScrollOnce, {
      passive: true,
      once: true,
    });
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) revealAtOrAbove();
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onScrollOnce);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  const registerRef = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  const toggleVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = e.currentTarget;
    const v = wrap.querySelector("video") as HTMLVideoElement | null;
    const play = wrap.querySelector(".testi-play") as HTMLElement | null;
    if (!v) return;
    if (v.paused) {
      document
        .querySelectorAll<HTMLVideoElement>(".testi-video video")
        .forEach((x) => x.pause());
      document
        .querySelectorAll<HTMLElement>(".testi-play")
        .forEach((x) => (x.style.opacity = "1"));
      v.play();
      if (play) play.style.opacity = "0";
    } else {
      v.pause();
      if (play) play.style.opacity = "1";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thanks! A coach will call you within 24 hours.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  const { hero, trust, community, vs, classes, disciplines, coaches: coachesCfg, hub, space, testimonials, membership, cta, footer } = site;

  return (
    <>
      <link rel="stylesheet" href="/css/home-v3.css" />

      <div className="ax-home">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg">
            <img src={hero.bgImage} alt="" />
          </div>
          <div className="hero-grid"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-kicker">{hero.kicker}</div>
            <h1 className="hero-h1">
              {hero.h1Top}
              <br />
              <em>{hero.h1Em}</em>
            </h1>
            <p className="hero-sub">
              {hero.sub}{" "}
              {hero.subBoldStart && <strong>{hero.subBoldStart}</strong>}
            </p>
            <div className="hero-btns">
              <a href={hero.primaryBtn.href} className="btn-primary">
                {hero.primaryBtn.label}
              </a>
              <a href={hero.secondaryBtn.href} className="btn-ghost">
                {hero.secondaryBtn.label}
              </a>
            </div>
          </div>
          <div className="hero-stats">
            {hero.stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hstat-n">{s.n}</span>
                <span className="hstat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <div className="trust-wrap reveal" ref={registerRef as never}>
          <div className="trust-inner">
            <h2 className="trust-h">
              {trust.headingTop} <em>{trust.headingEm}</em>
            </h2>
            <span className="trust-label">{trust.label}</span>
            <div className="logo-row">
              {trust.logos.map((l, i) => (
                <div key={i} className="logo-pill">
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMMUNITY */}
        <section
          className="community-section reveal"
          ref={registerRef as never}
        >
          <div className="community-inner">
            <div className="kicker">{community.kicker}</div>
            <h2 className="sec-title">
              {community.h2Top}
              <br />
              <em>{community.h2Em}</em>
            </h2>
            <div className="community-top">
              <div>
                <p className="brand-statement">
                  {community.brandStatementTop}{" "}
                  <em>{community.brandStatementEm}</em>
                </p>
                <p className="sec-body">{community.body}</p>
              </div>
              <div>
                <div className="slogan-block">
                  <span className="slogan-block-label">
                    {community.sloganLabel}
                  </span>
                  <div className="slogan">
                    {community.sloganTop}
                    <br />
                    <em>{community.sloganEm}</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="community-audiences">
              {community.audiences.map((a, i) => (
                <div key={i} className="audience-card">
                  <div className="audience-icon"><Icon name={a.icon} size={24} /></div>
                  <div className="audience-title">{a.title}</div>
                  <p className="audience-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VS */}
        <section className="vs-section reveal" ref={registerRef as never}>
          <div className="vs-inner">
            <div className="kicker">{vs.kicker}</div>
            <h2 className="sec-title">
              {vs.h2Top}
              <br />
              <em>{vs.h2Em}</em>
            </h2>
            <p className="sec-body">{vs.body}</p>
            <div className="vs-grid">
              <div className="vs-head them">{vs.themHead}</div>
              <div className="vs-head mid">{vs.midHead}</div>
              <div className="vs-head us">{vs.usHead}</div>

              {vs.rows.map((r, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div className="vs-c bad">
                    <span className="ic">✗</span>
                    {r.bad}
                  </div>
                  <div className="vs-c midc">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="vs-c good">
                    <span className="ic">✓</span>
                    {r.good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLASSES */}
        <section
          className="classes-section reveal"
          id="classes"
          ref={registerRef as never}
        >
          <div className="classes-inner">
            <div className="kicker">{classes.kicker}</div>
            <h2 className="sec-title">
              {classes.h2Top}
              <br />
              <em>{classes.h2Em}</em>
            </h2>
            <p className="sec-body">{classes.body}</p>
            <div className="classes-grid">
              {classes.items.map((c, i) => {
                const isInternal = c.href?.startsWith("/");
                const inner = (
                  <>
                    <div className="class-img">
                      <img src={c.img} alt={c.alt} />
                      <div className="class-grad"></div>
                      <div className="class-overlay"></div>
                    </div>
                    <div className="class-info">
                      <span className="class-tag">{c.tag}</span>
                      <div className="class-name">{c.name}</div>
                      <p className="class-desc">{c.desc}</p>
                      <div className="class-cta">
                        Learn More <span>→</span>
                      </div>
                    </div>
                  </>
                );
                return isInternal ? (
                  <Link key={i} className="class-card" href={c.href}>
                    {inner}
                  </Link>
                ) : (
                  <a key={i} className="class-card" href={c.href}>
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* DISCIPLINES */}
        <section
          className="disc-section reveal"
          id="disciplines"
          ref={registerRef as never}
        >
          <div className="disc-inner">
            <div className="kicker">{disciplines.kicker}</div>
            <h2 className="sec-title">
              {disciplines.h2Top}
              <br />
              <em>{disciplines.h2Em}</em>
            </h2>
            <div className="disc-grid">
              {disciplines.items.map((d, i) => (
                <div
                  key={i}
                  className={`disc-card${d.hawkin ? " hawkin" : ""}`}
                >
                  <div className="disc-num">{d.num}</div>
                  <div className="disc-name">{d.name}</div>
                  <p className="disc-desc">{d.desc}</p>
                  {d.note && <span className="hawkin-note">{d.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COACHES */}
        <section
          className="coaches-section reveal"
          id="coaches"
          ref={registerRef as never}
        >
          <div className="coaches-inner">
            <div className="coaches-top">
              <div>
                <div className="kicker">{coachesCfg.kicker}</div>
                <h2 className="sec-title">
                  {coachesCfg.h2Top}
                  <br />
                  <em>{coachesCfg.h2Em}</em>
                </h2>
                <p className="sec-body">{coachesCfg.body}</p>
              </div>
              <div
                className="cred-bar"
                style={{
                  gridTemplateColumns: `repeat(${coachesCfg.credBar.length}, 1fr)`,
                }}
              >
                {coachesCfg.credBar.map((c, i) => (
                  <div key={i} className="cred-item">
                    {c.img ? (
                      <img
                        className="cred-logo"
                        src={c.img}
                        alt={c.alt || c.lbl || ""}
                      />
                    ) : (
                      <>
                        <span className="cred-val">{c.val}</span>
                        <span className="cred-lbl">{c.lbl}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="coaches-grid">
              {coaches.map((c) => (
                <div key={c.id} className="coach-card">
                  <div className="coach-photo">
                    <img src={c.image} alt={c.name} />
                    <div className="coach-grad"></div>
                  </div>
                  <div className="coach-info">
                    <div className="coach-name">{c.name}</div>
                    <span className="coach-role">{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HUB */}
        <section
          className="hub-section reveal"
          id="hub"
          ref={registerRef as never}
        >
          <div className="hub-inner">
            <div className="kicker">{hub.kicker}</div>
            <h2 className="sec-title">
              {hub.h2Top}
              <br />
              <em>{hub.h2Em}</em>
            </h2>
            <p className="sec-body" style={{ maxWidth: 760 }}>
              {hub.body}
            </p>

            <div className="hub-stat-row">
              {hub.stats.map((s, i) => (
                <div key={i} className="hub-stat-box">
                  <span className="hub-stat-n">{s.n}</span>
                  <span className="hub-stat-l">{s.l}</span>
                </div>
              ))}
            </div>

            <div className="hub-layout">
              <div>
                <div className="hub-card">
                  <div className="hub-badge">
                    <div className="hub-dot"></div>
                    <span>{hub.cardBadge}</span>
                  </div>
                  <div className="hub-card-title">{hub.cardTitle}</div>
                  <p className="hub-card-desc">{hub.cardDesc}</p>
                  <div className="hub-services">
                    {hub.services.map((s, i) => (
                      <div key={i} className="hub-svc">
                        <div className="hub-svc-icon"><Icon name={s.icon} size={14} /></div>
                        <span className="hub-svc-text">{s.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="hub-physios">
                  {hub.physios.map((p, i) => (
                    <div key={i} className="physio-card">
                      <div className="physio-photo">
                        <img src={p.img} alt={p.name} />
                      </div>
                      <div className="physio-info">
                        <div className="physio-name">{p.name}</div>
                        <span className="physio-role">{p.role}</span>
                        <p className="physio-exp">{p.exp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {(hub.dietLabel ||
                  hub.dietTitleTop ||
                  hub.dietTitleEm ||
                  hub.dietDesc ||
                  hub.dietCreds.length > 0) && (
                  <div className="dietitian-callout">
                    <span className="diet-label">{hub.dietLabel}</span>
                    <div className="diet-title">
                      {hub.dietTitleTop}
                      <br />
                      <em>{hub.dietTitleEm}</em>
                    </div>
                    <p className="diet-desc">{hub.dietDesc}</p>
                    <div className="diet-creds">
                      {hub.dietCreds.map((c, i) => (
                        <span key={i} className="diet-cred">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SPACE */}
        <section className="space-section reveal" ref={registerRef as never}>
          <div className="space-inner">
            <div className="kicker">{space.kicker}</div>
            <h2 className="sec-title">
              {space.h2Top} <em>{space.h2Em}</em>
            </h2>
            <p className="sec-body">{space.body}</p>
            <div className="space-grid">
              {space.cells.map((c, i) => (
                <div
                  key={i}
                  className={`space-cell${c.tall ? " tall" : ""}${c.video ? " has-video" : ""}`}
                >
                  {c.video ? (
                    <iframe
                      src={c.video}
                      title={c.alt || "Athletix video"}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      frameBorder={0}
                    />
                  ) : (
                    <img src={c.img} alt={c.alt} />
                  )}
                  <div className="s-grad"></div>
                  <div className="space-label">
                    <span>{c.labelTop}</span>
                    <strong>{c.labelBottom}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testi-section reveal" ref={registerRef as never}>
          <div className="testi-inner">
            <div className="kicker">{testimonials.kicker}</div>
            <h2 className="sec-title">
              {testimonials.h2Top}
              <br />
              <em>{testimonials.h2Em}</em>
            </h2>

            <div className="hero-quote">
              <p className="hero-quote-text">
                &ldquo;{testimonials.heroQuoteText}
                <em>{testimonials.heroQuoteEm}</em>&rdquo;
              </p>
              <p className="hero-quote-attr">
                {testimonials.heroQuoteAttr}
              </p>
            </div>

            <div className="testi-grid">
              {testimonials.videos.map((t, i) => (
                <div key={i} className="testi-card">
                  <div className="testi-video" onClick={toggleVideo}>
                    <video
                      preload="none"
                      poster={t.src.replace(/\.[^/.]+$/, ".jpg")}
                      loop
                      playsInline
                    >
                      <source src={t.src} type="video/mp4" />
                    </video>
                    <div className="testi-play">
                      <div className="play-ring">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="testi-quote">
                    &ldquo;{t.quote}
                    <strong>{t.bold}</strong>
                    {t.tail}&rdquo;
                  </p>
                  <div className="testi-person">
                    <div className="testi-avatar">{t.avatar}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <span className="testi-meta">{t.meta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="community-stories">
              {testimonials.stories.map((s, i) => (
                <div key={i} className="story-card">
                  <div className="story-head">
                    <span className="story-icon"><Icon name={s.icon} size={20} /></span>
                    <div className="story-title">
                      {s.titleTop} <em>{s.titleEm}</em>
                    </div>
                  </div>
                  <p className={`story-body${s.isQuote ? " quote" : ""}`}>
                    {s.isQuote ? <>&ldquo;{s.body}&rdquo;</> : s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP */}
        <section
          className="membership-section reveal"
          id="membership"
          ref={registerRef as never}
        >
          <div className="membership-inner">
            <div className="kicker">{membership.kicker}</div>
            <h2 className="sec-title">
              {membership.h2Top}
              <br />
              <em>{membership.h2Em}</em>
            </h2>
            <p className="sec-body">{membership.body}</p>
            <div className="membership-grid">
              {membership.plans.map((p, i) => (
                <div
                  key={i}
                  className={`plan-card${p.featured ? " featured" : ""}`}
                >
                  {p.featured && (
                    <div className="plan-badge">★ Most Popular</div>
                  )}
                  <div className="plan-img">
                    <img src={p.img} alt={p.alt} />
                    <div className="plan-img-grad"></div>
                  </div>
                  <div className="plan-content">
                    <div className="plan-tier">{p.tier}</div>
                    <div className="plan-name">{p.name}</div>
                    <div className="plan-price">
                      <span className="plan-price-n">{p.price}</span>
                      <span className="plan-price-p">/ week</span>
                    </div>
                    <ul className="plan-features">
                      {p.features.map((f, j) => (
                        <li key={j}>
                          <span className="check">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    {p.href?.startsWith("/") ? (
                      <Link
                        className={p.featured ? "btn-plan" : "btn-plan-out"}
                        href={p.href}
                      >
                        View Plan
                      </Link>
                    ) : (
                      <a
                        className={p.featured ? "btn-plan" : "btn-plan-out"}
                        href={p.href}
                      >
                        View Plan
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section reveal" ref={registerRef as never}>
          <div className="cta-grid-bg"></div>
          <div className="cta-inner">
            <div className="cta-tag">{cta.tag}</div>
            <h2 className="cta-h">
              {cta.hTop}
              <br />
              <em>{cta.hEm}</em>
            </h2>
            <p className="cta-sub">{cta.sub}</p>
            <p className="cta-detail">{cta.detail}</p>
            <div className="cta-btns">
              <a href={cta.primaryBtn.href} className="btn-primary">
                {cta.primaryBtn.label}
              </a>
              <a href={cta.secondaryBtn.href} className="btn-ghost">
                {cta.secondaryBtn.label}
              </a>
            </div>
          </div>
        </div>

        {/* LEAD FORM */}
        <footer className="footer-section" id="form">
          <div className="footer-top">
            <div>
              <div className="f-brand">
                <img src={footer.brandImg} alt="Athletix" />
              </div>
              <p className="f-tagline">{footer.tagline}</p>
              <div className="f-contacts">
                {footer.contacts.map((c, i) => (
                  <div key={i} className="f-contact-row">
                    <div className="f-contact-icon"><Icon name={c.icon} size={15} /></div>
                    <div>
                      {c.href ? <a href={c.href}>{c.text}</a> : c.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="lead-form" onSubmit={handleSubmit}>
              <h3 className="f-form-title">{footer.formTitle}</h3>
              <p className="f-form-sub">{footer.formSub}</p>

              <div className="ff">
                <label className="flbl" htmlFor="fname">
                  Full Name
                </label>
                <input
                  className="finput"
                  type="text"
                  id="fname"
                  name="name"
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="frow">
                <div className="ff">
                  <label className="flbl" htmlFor="fphone">
                    Phone
                  </label>
                  <input
                    className="finput"
                    type="tel"
                    id="fphone"
                    name="phone"
                    required
                    placeholder="04xx xxx xxx"
                  />
                </div>
                <div className="ff">
                  <label className="flbl" htmlFor="femail">
                    Email
                  </label>
                  <input
                    className="finput"
                    type="email"
                    id="femail"
                    name="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="ff">
                <label className="flbl" htmlFor="fjoin">
                  I'm Joining As
                </label>
                <select
                  className="finput"
                  id="fjoin"
                  name="join"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose one...
                  </option>
                  {footer.joinOptions.map((o, i) => (
                    <option key={i}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="ff">
                <label className="flbl" htmlFor="fgoal">
                  What's Your Goal?
                </label>
                <textarea
                  className="finput"
                  id="fgoal"
                  name="goal"
                  placeholder="Tell us what you're working towards..."
                />
              </div>
              <button type="submit" className="btn-submit">
                {footer.formButtonLabel}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </footer>
      </div>
    </>
  );
}
