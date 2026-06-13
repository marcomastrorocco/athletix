import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Mat Pilates Class Brisbane — ATHLETIX Gym",
  description:
    "Mat Pilates led by a certified Physiotherapist. Improve posture, core strength and muscle balance. A perfect low-impact option for desk workers or those recovering from high-intensity training.",
};

const PILLARS = [
  {
    n: "01",
    title: "Covers the Basics",
    body: "Learn the fundamentals on the mat — neutral spine, an engaged core, c-curve, shoulder & pelvic stability, spinal articulation and controlled breathing.",
  },
  {
    n: "02",
    title: "Body & Mind",
    body: "Integrate body, mind and spirit through centring, concentration, control, precision, flow and breath. Quality movement that elevates your day.",
  },
  {
    n: "03",
    title: "Long Lean Strength",
    body: "Tone and lengthen muscles, refine posture, and build a body & mind connection that supports every sport, sitting job and life stage.",
  },
  {
    n: "04",
    title: "Adaptable for Everyone",
    body: "Modifications for every level — beginner or advanced, young or senior. Low impact, joint-friendly and effective at any starting point.",
  },
];

const FAQS = [
  {
    q: "What kind of workout is Pilates?",
    a: (
      <>
        <p>
          Pilates is a series of movements done in a specific order to stabilise
          and strengthen your core. The moves look simple but require control
          and precision — focusing on technique builds stronger, sculpted
          muscles and increases mobility.
        </p>
        <p>
          In Pilates you develop the body through muscular effort from the core,
          cultivating awareness that supports everyday movement and a sense of
          well-being.
        </p>
      </>
    ),
  },
  {
    q: "Do you offer Pilates classes in Brisbane?",
    a: (
      <>
        <p>
          Yes — our Mat Pilates class at ATHLETIX (Fortitude Valley) is led by
          our certified Pilates instructor and Physiotherapist, Sarah Kitcher.
          The session focuses on postural alignment, core strength and muscle
          balance.
        </p>
        <p>
          A low-impact option that&apos;s ideal for those sitting all day, or
          for athletes recovering from high-intensity training.
        </p>
      </>
    ),
  },
  {
    q: "How many Pilates classes a week do I need to see results?",
    a: (
      <>
        <p>
          Three sessions per week is a good guideline — you&apos;ll feel
          improved muscle strength, better flexibility and a mental boost. For
          the most noticeable changes (muscle definition, posture, vitality) we
          recommend 4–5 sessions a week.
        </p>
      </>
    ),
  },
  {
    q: "What should I bring to a Pilates class?",
    a: (
      <>
        <p>
          We provide everything you need at the studio. If you&apos;d like to
          bring your own, consider:
        </p>
        <ul>
          <li>A water bottle</li>
          <li>A small towel</li>
          <li>Optional: ankle/wrist weights, flex band, ring or small ball</li>
        </ul>
      </>
    ),
  },
  {
    q: "What should I wear?",
    a: (
      <p>
        Form-fitting, stretchable, comfortable clothing — the coach needs to see
        body alignment and symmetry, which baggy gear hides. Pilates is done
        barefoot or in grippy socks, no shoes required.
      </p>
    ),
  },
  {
    q: "What is Reformer Pilates and do you offer it?",
    a: (
      <p>
        Reformer Pilates uses a sprung carriage to add resistance and assistance
        to traditional Pilates movements. Our current group offering is{" "}
        <strong>Mat Pilates</strong>; please{" "}
        <Link href="/contact-us">get in touch</Link> if you&apos;re interested
        in 1-on-1 reformer sessions.
      </p>
    ),
  },
];

export default function MatPilatesPage() {
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
            Mat Pilates
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Recovery / Release · All
              levels
            </p>
            <h1 className="yaf-title">Mat Pilates</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              Our <strong>Mat Pilates</strong> class is led by a certified
              Physiotherapist and focuses on improving posture, core strength
              and muscle balance. A perfect low-impact option for those sitting
              all day or recovering from high-intensity training.
            </p>
            <p className="yaf-lead">
              ATHLETIX is a Fitness &amp; Human Performance Centre in the heart
              of Brisbane (Fortitude Valley) offering small group classes in
              Strength, Agility, Conditioning, Pilates, Mobility and more.
            </p>
            <p className="yaf-lead">
              Whether you&apos;re a beginner or advanced, suffer from pain or
              immobility, or simply want to live in your optimum body — our Mat
              Pilates class is the perfect way to build long-term strength and
              mobility.
            </p>
            <div className="yaf-hero-cta">
              <Link href="#book-form" className="btn btn-primary">
                Book a trial
              </Link>
              <Link href="/timetable" className="btn btn-ghost">
                View timetable
              </Link>
            </div>
          </div>

          <div className="yaf-media">
            <img
              src="/image/cdn/mat-pilates-hero.jpg"
              alt="Mat Pilates class on the turf at ATHLETIX Brisbane"
              loading="lazy"
              width={1600}
              height={1067}
            />
            <span className="yaf-media-badge">Recovery · Release</span>
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
            <p className="yaf-includes-eyebrow">Why our Mat Pilates class</p>
            <h2>What you&apos;ll get out of every session</h2>
            <p className="yaf-includes-sub">
              Built around the core principles of Pilates — control, precision,
              breath and flow — delivered by a certified Physiotherapist who
              tailors every cue to your body.
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

      <ClassBookSection
        sourceLabel="Mat Pilates page"
        defaultClass="Mat Pilates"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/cdn/mat-pilates-coach-sarah.webp"
                alt="Sarah Kitcher — Pilates Coach & Physiotherapist"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Pilates Coach</p>
              <h3 className="yaf-coach-name">Sarah Kitcher</h3>
              <p className="yaf-coach-bio">
                Sarah is a certified Physiotherapist and Pilates instructor.
                Her sessions focus on postural alignment, core strength and
                muscle balance — designed to deliver real change whether
                you&apos;re recovering from an injury, sitting at a desk all
                day, or chasing a stronger, more mobile body.
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
            <p>Everything you&apos;ll want to know before your first class.</p>
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
