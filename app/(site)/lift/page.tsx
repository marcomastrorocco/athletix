import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Weight Lifting Gym Brisbane — LIFT Strength Class | ATHLETIX",
  description:
    "ATHLETIX LIFT — a progressive strength training class for athletes and adults. Coached by ESSA/ASCA-accredited S&C coaches in Fortitude Valley, Brisbane.",
};

const PILLARS = [
  {
    n: "01",
    title: "Build Stronger Muscles",
    body: "Lifting drives hypertrophy by boosting your body's natural growth-hormone response, promoting tissue development and progressively stronger muscles session after session.",
  },
  {
    n: "02",
    title: "Burn Fat, Build Engine",
    body: "Muscle tissue burns more calories than fat. Strength work boosts your metabolism, lowers body-fat percentage and reduces cardiovascular and metabolic risk.",
  },
  {
    n: "03",
    title: "Bones, Joints & Tendons",
    body: "Resistance training strengthens bone density, builds joint resilience and increases collagen fibrils in tendons — protecting you from injury at every age.",
  },
  {
    n: "04",
    title: "Athlete-Grade Coaching",
    body: "ESSA, ASCA and NCIS-accredited coaches with hands-on experience in Netball, Track & Field, Rugby, AFL, Cricket, Soccer and Basketball — coaching you like a pro.",
  },
];

const FAQS = [
  {
    q: "What is the LIFT class?",
    a: (
      <>
        <p>
          LIFT is our progressive strength training class. You balance maximum
          power and strength development with building an ideal physique — and
          the stimulus is specific, with regular technical feedback that
          you&apos;ll struggle to find in a regular gym class.
        </p>
        <p>
          Each session focuses on speed, muscular strength, cardiorespiratory
          endurance, flexibility, power, coordination and balance — and we
          diagnose technical faults and apply corrective practice to make you
          more efficient.
        </p>
      </>
    ),
  },
  {
    q: "What's the difference between powerlifting and weightlifting?",
    a: (
      <>
        <p>
          <strong>Powerlifting</strong> focuses on three controlled lifts —
          squat, bench press, deadlift — in a single plane of motion. No direct
          vertical action. Powerlifters typically have time for each attempt.
        </p>
        <p>
          <strong>Weightlifting</strong> (the Olympic sport) is a technical,
          ballistic approach built around two overhead lifts — the snatch and
          the clean &amp; jerk. The pressure is to execute fast. Both sports
          are open to athletes of every age.
        </p>
      </>
    ),
  },
  {
    q: "What are the age groups in weightlifting?",
    a: (
      <>
        <p>
          In Australia, competitive weightlifting is an Olympic and
          Commonwealth Games sport with the following age groups at Queensland
          and national championships:
        </p>
        <ul>
          <li>Under 15</li>
          <li>Under 17 (Youth)</li>
          <li>Under 20 (Junior)</li>
          <li>Under 23</li>
          <li>Senior (Open)</li>
          <li>Masters (35 and above)</li>
        </ul>
        <p>
          People of any age can begin training for strength and muscle tone —
          we just teach the foundational movements and mobility before complex
          lifts.
        </p>
      </>
    ),
  },
  {
    q: "Where can I find a proper weightlifting gym in Brisbane?",
    a: (
      <p>
        Proper technique is everything — get it wrong and you risk sprains,
        strains and fractures. That&apos;s why training with knowledgeable S&amp;C
        specialists matters. <strong>ATHLETIX</strong> in Fortitude Valley is
        built around that philosophy — accredited coaches, structured
        progressions, and equipment for everything from foundational lifts to
        Olympic variations.
      </p>
    ),
  },
];

export default function LiftPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/youth-classes-page.css" />
      <link rel="stylesheet" href="/css/youth-agility-foundations-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link> <span>/</span>{" "}
            Lift
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Strength · All levels
            </p>
            <h1 className="yaf-title">Lift — Strength Training Class</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              This <strong>strength training class</strong> builds incredibly
              strong foundations for your weightlifting journey — progressively.
              Form and detail are drilled to keep your lifts <em>always</em>{" "}
              safe, and to lay the groundwork for more complex Olympic lifts
              and their variations.
            </p>
            <p className="yaf-lead">
              If you&apos;re an athlete looking to boost strength and power —
              or just want to train like one — our team of elite{" "}
              <strong>Strength &amp; Conditioning coaches</strong> (ESSA, ASCA,
              NCIS accredited) bring practical experience with elite athletes,
              youth, adult populations and rehab/injury prevention. Programs
              are tailored to every level across{" "}
              <strong>
                Netball, Track &amp; Field, Rugby, AFL, Cricket, Soccer and
                Basketball
              </strong>
              .
            </p>
            <p className="yaf-lead">
              LIFT progresses you from foundational weightlifting (Squats,
              Deadlifts, Bench Press) onto power-based movements (Cleans,
              Jerks, Snatches) — with elite-level athlete coaching every step
              of the way.
            </p>
            <div className="yaf-hero-cta">
              <Link href="#book-form" className="btn btn-primary">
                Book a trial
              </Link>
              <Link href="/class-timetable" className="btn btn-ghost">
                View timetable
              </Link>
            </div>
          </div>

          <div
            className="yaf-media"
            style={{ background: "#0b0d10" }}
          >
            <img
              src="/image/cdn/lift-hero-a1644.webp"
              alt="LIFT strength training class at ATHLETIX Brisbane"
              loading="lazy"
              width={1600}
              height={1200}
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">Strength · Power</span>
          </div>
        </div>
      </section>

      <section className="yaf-info">
        <div className="container">
          <div className="yaf-info-grid">
            <article className="yaf-info-card">
              <span className="yaf-info-card-icon" aria-hidden="true">
                📍
              </span>
              <h3>Location</h3>
              <p>
                <a
                  href="https://goo.gl/maps/Nb2DQqvUifWCHuPt7"
                  target="_blank"
                  rel="noopener"
                >
                  42 Baxter Street
                  <br />
                  Fortitude Valley, QLD 4006
                </a>
              </p>
            </article>

            <article className="yaf-info-card yaf-info-card--hours">
              <span className="yaf-info-card-icon" aria-hidden="true">
                ⏱
              </span>
              <h3>Working hours</h3>
              <ul className="yaf-hours">
                <li>
                  <span className="yaf-day">Mon</span>
                  <span>6:00 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Tue</span>
                  <span>6:00 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Wed</span>
                  <span>5:15 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Thu</span>
                  <span>6:00 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Fri</span>
                  <span>5:15 AM – 6:00 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Sat</span>
                  <span>6:00 AM – 11:00 AM</span>
                </li>
              </ul>
            </article>

            <article className="yaf-info-card">
              <span className="yaf-info-card-icon" aria-hidden="true">
                ☎
              </span>
              <h3>Contact</h3>
              <p>
                <a href="tel:0499981286">0499 981 286</a>
                <br />
                <a href="mailto:info@athletix.com.au">info@athletix.com.au</a>
              </p>
              <Link href="/contact-us" className="yaf-info-card-link">
                Get in touch →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="yaf-includes">
        <div className="container">
          <header className="yaf-includes-head">
            <p className="yaf-includes-eyebrow">Why athletes train LIFT</p>
            <h2>Strength training that actually changes things</h2>
            <p className="yaf-includes-sub">
              Built around evidence-based loading, technical precision and
              real athletic outcomes — not just numbers on a barbell.
            </p>
          </header>
          <div className="yaf-pillars">
            {PILLARS.map((p) => (
              <article key={p.title} className="yaf-pillar">
                <span className="yaf-pillar-num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClassBookSection sourceLabel="Lift page" defaultClass="Lift" />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/cdn/lift-coach-reza-6048.webp"
                alt="Reza Sharifian — Strength Coach"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Strength Coach</p>
              <h3 className="yaf-coach-name">Reza Sharifian</h3>
              <p className="yaf-coach-bio">
                Reza leads the LIFT program at ATHLETIX, taking athletes and
                adults from foundational lifts to elite-level Olympic
                variations. His sessions blend technical precision with
                progressive overload — built to make you stronger, more
                resilient and more confident under the bar.
              </p>
              <div className="yaf-coach-links">
                <Link href="/our-team" className="btn btn-outline btn-sm">
                  Meet the team
                </Link>
                <Link href="/contact-us" className="btn btn-ghost btn-sm">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="yaf-faq">
        <div className="container">
          <header className="yaf-faq-head">
            <h2>Frequently asked questions</h2>
            <p>The most common things people ask before their first LIFT class.</p>
          </header>
          <div className="yaf-faq-list">
            {FAQS.map((f) => (
              <details key={f.q} className="yaf-faq-item">
                <summary>{f.q}</summary>
                <div className="yaf-faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
