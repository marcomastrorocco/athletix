import Link from "next/link";
import type { Metadata } from "next";
import { getSite } from "@/lib/data";

export const metadata: Metadata = {
  title: "S & C Gym Brisbane | Cricket, Netball, Soccer, Rugby — ATHLETIX",
  description:
    "ATHLETIX is a top-of-the-line Strength & Conditioning gym and Human and Sports Performance Center dedicated to helping athletes of all levels achieve their goals. Our Brisbane gym with a sprint track, is staffed with experienced Strength and Conditioning Coaches, Sports Scientists, Physiotherapists and Exercise Physiologists, who work together to provide personalised training programs tailored to each individual's needs.",
};

export default async function OurGymPage() {
  const site = await getSite();
  const trust = site.trust;
  const membership = site.membership;
  return (
    <>
      <link rel="stylesheet" href="/css/our-gym-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />
      <link rel="stylesheet" href="/css/home-v3.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> Our Gym
          </p>
          <h1>
            OUR <span className="accent">GYM</span>
          </h1>
        </div>
      </section>

      <section className="our-gym-tour">
        <div className="container">
          <div className="og-tour-head">
            <p className="og-tour-eyebrow">Watch</p>
            <h2 className="og-tour-title">
              Take a tour of <em>our gym.</em>
            </h2>
            <p className="og-tour-sub">
              See where you&apos;ll lift, sprint, recover and train. Two short
              films from inside Athletix Fortitude Valley.
            </p>
          </div>

          <div className="og-tour-grid">
            <article className="og-tour-card">
              <div className="og-tour-frame">
                <iframe
                  src="https://www.youtube.com/embed/EXsxZCSffHA"
                  title="A Tour of Our Gym"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="og-tour-meta">
                <span className="og-tour-tag">01 · Facility Tour</span>
                <h3>A walk through Athletix</h3>
                <p>
                  Floors, racks, sprint lanes and recovery — the full sweep of
                  the facility in under two minutes.
                </p>
              </div>
            </article>

            <article className="og-tour-card">
              <div className="og-tour-frame">
                <iframe
                  src="https://www.youtube.com/embed/GoBd8nAO650"
                  title="Train Like An Athlete"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="og-tour-meta">
                <span className="og-tour-tag">02 · Inside a Session</span>
                <h3>Train like an athlete</h3>
                <p>
                  See how a typical Athletix block looks — lift, conditioning,
                  speed work and recovery.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="our-gym-story">
        <div className="container og-story-grid">
          <div className="og-story-copy">
            <p className="og-story-eyebrow">The Philosophy</p>
            <h2 className="og-story-h">
              A performance center
              <br />
              <em>built around movement.</em>
            </h2>
            <p className="og-story-lede">
              <strong>ATHLETIX</strong> is a top-of-the-line{" "}
              <Link href="/">Strength &amp; Conditioning gym</Link> and{" "}
              <strong>Human &amp; Sports Performance Center</strong> dedicated
              to helping athletes of all levels achieve their goals.
            </p>

            <ul className="og-story-pillars">
              <li>
                <span className="og-pillar-n">01</span>
                <span>We strive for excellence.</span>
              </li>
              <li>
                <span className="og-pillar-n">02</span>
                <span>We are proud of our standards.</span>
              </li>
              <li>
                <span className="og-pillar-n">03</span>
                <span>We embrace continuous improvement.</span>
              </li>
            </ul>

            <p className="og-story-body">
              Our <Link href="/">Brisbane gym</Link> has a unique warehouse
              layout and a sprint track, and is staffed by experienced{" "}
              <strong>
                S&amp;C Coaches, Sports Scientists, Physiotherapists
              </strong>{" "}
              and <strong>Exercise Physiologists</strong> — all working
              together to build training programs tailored to each
              individual&apos;s needs.
            </p>
            <p className="og-story-body">
              While we thrive in Performance, Rehab, and return-to-sport for
              athletes, we also promote long-term Athletic Development for
              Youth — building speed, agility and strength to help kids and
              teens excel at sport and love being active.
            </p>

            <div className="og-sports-strip">
              <span className="og-sports-label">Trusted across</span>
              <ul>
                <li>AFL</li>
                <li>Football</li>
                <li>Cricket</li>
                <li>Rugby</li>
                <li>Basketball</li>
                <li>Hockey</li>
                <li>Netball</li>
              </ul>
            </div>
          </div>

          <aside className="og-story-media">
            <div className="og-story-frame">
              <img
                src="/image/DSC02067-768x512.jpg"
                alt="ATHLETIX gym floor — sprint track and S&amp;C area"
              />
              <div className="og-story-frame-tag">Inside the floor</div>
            </div>
            <div className="og-story-quote">
              <span aria-hidden>“</span>
              <p>
                Beginner or seasoned pro — Athletix has the expertise and
                cutting-edge testing to take you further.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="our-gym-layout">
        <div className="container">
          <div className="og-layout-head">
            <p className="og-layout-eyebrow">The Floor Plan</p>
            <h2 className="og-layout-h">
              A layout like
              <br />
              <em>no other gym.</em>
            </h2>
            <p className="og-layout-sub">
              A huge open space, carefully designed and crafted around a
              single concept: <strong>movement.</strong>
            </p>
          </div>

          <div className="og-layout-grid">
            <article className="og-zone-card og-zone-card--wide">
              <div className="og-zone-stat">
                <span className="og-zone-num">120</span>
                <span className="og-zone-unit">sqm</span>
              </div>
              <div className="og-zone-body">
                <span className="og-zone-tag">Zone 01</span>
                <h3>Strength &amp; Conditioning Floor</h3>
                <p>
                  Everything you need to grow competency and strength —
                  Olympic platforms, racks, mixed loading. Plus two large
                  studios for Pilates, Mobility and PT classes.
                </p>
              </div>
            </article>

            <article className="og-zone-card">
              <div className="og-zone-stat">
                <span className="og-zone-num">20</span>
                <span className="og-zone-unit">m × 3</span>
              </div>
              <div className="og-zone-body">
                <span className="og-zone-tag">Zone 02</span>
                <h3>Indoor Sprint Track</h3>
                <p>
                  Three lanes × 20m — purpose-built for our Sprint Squad,
                  running development and acceleration mechanic classes.
                </p>
              </div>
            </article>

            <article className="og-zone-card">
              <div className="og-zone-stat">
                <span className="og-zone-num">130</span>
                <span className="og-zone-unit">sqm</span>
              </div>
              <div className="og-zone-body">
                <span className="og-zone-tag">Zone 03</span>
                <h3>Pro AstroTurf</h3>
                <p>
                  Professional turf for plyometrics, COD drills and team
                  field-sport conditioning — for both youth and adult
                  crowds.
                </p>
              </div>
            </article>
          </div>

          <p className="og-layout-outro">
            You will love spending time and training at Athletix.
          </p>
        </div>
      </section>

      <div className="ax-home">
        <section className="membership-section" id="membership">
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
                    <a
                      className={p.featured ? "btn-plan" : "btn-plan-out"}
                      href={p.href}
                    >
                      View Plan
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="home-v2">
        <div className="trust-wrap">
          <div className="trust-inner">
            <h2 className="trust-h trust-h--solo">{trust.label}</h2>
            <div className="logo-row">
              {trust.logos.map((l, i) => (
                <div key={i} className="logo-pill">
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="home-v2">
        <div className="cta-section">
          <div className="cta-grid-bg" />
          <div className="cta-inner">
            <div className="cta-tag">Limited Offer</div>
            <h2 className="cta-h">
              $7 for
              <br />
              <em>7 Days.</em>
            </h2>
            <p className="cta-sub">
              Unlimited access. All classes. Meet the coaches. Feel the
              difference.
            </p>
            <p className="cta-detail">
              Fully Refundable · No Lock-In · Every Level Welcome
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary">
                Claim Your Trial
              </Link>
              <Link href="/membership" className="btn-ghost">
                See All Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
