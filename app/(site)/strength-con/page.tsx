import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import ClassBookSection from "@/components/ClassBookSection";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/strength-con");
}

const BENEFITS = [
  {
    n: "01",
    title: "Real, Measurable Strength",
    body: "Strength & Con is built on proven barbell and accessory work — squats, hinges, presses and pulls — programmed and progressed week to week. Instead of random workouts, you follow a structured plan that adds load and skill over time, so you can actually see and feel yourself getting stronger.",
  },
  {
    n: "02",
    title: "Power & Athleticism",
    body: "We pair heavy strength work with explosive conditioning — jumps, throws, sled work and carries — to develop the kind of power that transfers to sport and everyday life. You don't just lift heavy; you learn to move fast, brace hard and express force when it counts.",
  },
  {
    n: "03",
    title: "Coached Technique",
    body: "Every session is led by a qualified S&C coach who watches your movement and corrects it in real time. You learn how to lift safely and efficiently, which protects you from injury and means every rep counts toward progress — not bad habits.",
  },
  {
    n: "04",
    title: "Resilience & Injury Resistance",
    body: "Building strength through full ranges of motion bulletproofs joints, tendons and muscles. A stronger, better-conditioned body handles load, fatigue and the demands of life and sport far better — making you more durable and harder to break down.",
  },
  {
    n: "05",
    title: "Programming That Progresses",
    body: "Our coaches run a periodised plan so your training builds intelligently across the weeks — strength phases, power phases and conditioning blocks. You always know why you're doing what you're doing, and the program adapts as you advance.",
  },
  {
    n: "06",
    title: "Every Level Welcome",
    body: "Whether you've never touched a barbell or you're a seasoned lifter, the session scales to you. Beginners learn the fundamentals with lighter loads and more coaching, while experienced members push heavier and more advanced variations — all in the same supportive room.",
  },
];

export default function StrengthConPage() {
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
            Strength &amp; Con
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Strength &amp; Conditioning ·
              All levels
            </p>
            <h1 className="yaf-title">Strength &amp; Con</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              A <strong>coach-led strength &amp; conditioning class</strong> that
              builds real strength, power and resilience through structured,
              progressive programming — regardless of your starting point.
            </p>
            <p className="yaf-lead">
              Barbells, dumbbells, sleds and your own bodyweight, programmed week
              to week so you keep getting stronger. Lift with intent, move with
              purpose, and train like an athlete.
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

          <div className="yaf-media" style={{ background: "#0b0d10" }}>
            <img
              src="/image/cdn/Strength-Training-athletix-c8cf6c.jpg"
              alt="Strength & Conditioning class at ATHLETIX Brisbane"
              loading="lazy"
              width={1920}
              height={1100}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">Strength · Conditioning</span>
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
            <h2>What is Strength &amp; Con?</h2>
            <p className="yaf-includes-sub">
              Strength &amp; Conditioning is the foundation of everything we do
              at Athletix. It blends heavy, structured strength work with
              athletic conditioning to build a body that is strong, powerful and
              hard to break. Every session is coached, programmed and progressed
              — nothing is random.
            </p>
            <p className="yaf-includes-sub">
              Using barbells, dumbbells, kettlebells, sleds and bodyweight
              movements, the class develops strength, power and work capacity
              together. Whether your goal is performance, body composition or
              simply feeling capable and resilient, S&amp;C gets you there.
            </p>
          </header>
        </div>
      </section>

      <section className="yaf-includes" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="yaf-includes-head">
            <h2>Key Benefits of Strength &amp; Con Training</h2>
          </header>
          <div className="yaf-pillars">
            {BENEFITS.map((b) => (
              <article key={b.title} className="yaf-pillar">
                <span className="yaf-pillar-num">{b.n}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="yaf-includes" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="yaf-includes-head">
            <h2>What to Expect in a Strength &amp; Con Class</h2>
            <p className="yaf-includes-sub">
              Sessions open with a purposeful warm-up to prepare your body for
              loading, then move into the main strength work for the day —
              squats, hinges, presses or pulls — coached set by set. From there
              you'll hit accessory and conditioning work to build power and
              capacity.
            </p>
            <p className="yaf-includes-sub">
              Your coach guides loads, technique and intensity for your level,
              so beginners build confidence safely while experienced lifters keep
              progressing. You'll leave each session knowing exactly what you did
              and why it's making you stronger.
            </p>
          </header>
        </div>
      </section>

      <ClassBookSection
        sourceLabel="Strength & Con page"
        defaultClass="Strength & Con"
      />
    </>
  );
}
