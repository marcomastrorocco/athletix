import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Youth Fitness Foundations — ATHLETIX Brisbane",
  description:
    "Starter strength & conditioning program for Primary School aged kids (7–11). Build foundation skills, movement patterns and confidence for any sport. Fortitude Valley, Brisbane.",
};

const PILLARS = [
  {
    n: "01",
    title: "Foundational Movement Skills",
    body: "Squats, lunges, hinges, pushes, pulls, jumps and lands — taught with kid-friendly cues. We build the movement library every young athlete needs before sport-specific training.",
  },
  {
    n: "02",
    title: "Strength, Resilience & Healthy Bodies",
    body: "Age-appropriate resistance training builds bone density, joint integrity and lean muscle. Kids feel stronger, burn calories and improve posture — without lifting anything beyond their capacity.",
  },
  {
    n: "03",
    title: "Confidence Through Competence",
    body: "Small wins each session — a new movement learned, a heavier carry, a faster sprint. Coaches give clear feedback so kids leave knowing exactly what they improved.",
  },
  {
    n: "04",
    title: "Pathway for Long-Term Athletic Development",
    body: "Graduates progress smoothly into our Youth Strength Development (12–16) and Youth Speed/Agility classes. Foundations laid here pay off for every sport they choose later.",
  },
];

const FAQS = [
  {
    q: "What is the Youth Fitness Foundations class?",
    a: (
      <>
        <p>
          Youth Fitness Foundations is our starter Strength &amp; Conditioning
          program for Primary School aged kids (7–11). It blends foundational
          movement patterns, age-appropriate strength work, light conditioning
          and play-based games — all coached by qualified S&amp;C professionals
          in a structured, safe environment.
        </p>
        <p>
          The goal is to give every child a strong physical base for whatever
          sport, hobby or activity they fall in love with next.
        </p>
      </>
    ),
  },
  {
    q: "Is strength training safe for kids aged 7–11?",
    a: (
      <>
        <p>
          Yes — when programmed correctly. Decades of research from the NSCA,
          ACSM and Australian sports science bodies show resistance training is
          safe and beneficial for pre-teens, provided loads, technique and
          progression are managed by qualified coaches. We use bodyweight,
          medicine balls, light dumbbells and bands — never heavy maximal
          lifts.
        </p>
      </>
    ),
  },
  {
    q: "What does a typical session look like?",
    a: (
      <>
        <p>Each 45–60 minute class follows the same structure:</p>
        <ul>
          <li>Dynamic warm-up &amp; movement prep</li>
          <li>Skill block — one foundational movement coached in detail</li>
          <li>Strength &amp; circuit work tailored to age and ability</li>
          <li>Conditioning game or team challenge</li>
          <li>Cool-down &amp; mobility</li>
        </ul>
        <p>
          Kids stay engaged because every session has a clear purpose and a
          team element — never random circuits.
        </p>
      </>
    ),
  },
  {
    q: "What happens after my child outgrows the 7–11 program?",
    a: (
      <p>
        At 12, kids graduate into our <strong>Youth Strength Development</strong> and{" "}
        <strong>Youth Agility / Speed Development</strong> classes — designed for
        High School athletes who want to take their fitness, sport performance
        and resilience to the next level. The foundations built in this class
        make that transition seamless.
      </p>
    ),
  },
];

export default function YouthFitnessFoundationsPage() {
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
            <Link href="/youth-classes">Youth Classes</Link> <span>/</span>{" "}
            Youth Fitness Foundations
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Conditioning · Ages 7–11
            </p>
            <h1 className="yaf-title">Youth Fitness Foundations</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              A starter <strong>Strength &amp; Conditioning</strong> program for
              Primary School aged kids — developing foundation skills, movement
              patterns and the physical base every young athlete needs. We
              support your kids&apos; long-term athletic development from day
              one.
            </p>
            <p className="yaf-lead">
              Get stronger, burn calories and build the foundation for{" "}
              <em>any</em> sport. Coached by qualified S&amp;C specialists with
              experience across Netball, Track &amp; Field, Rugby, AFL, Cricket,
              Soccer and Basketball — adapted into kid-friendly sessions that
              are fun, structured and safe.
            </p>
            <p className="yaf-lead">
              See more of our{" "}
              <Link href="/youth-classes">
                children&apos;s gym fitness classes here
              </Link>
              .
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

          <div className="yaf-media" style={{ background: "#0b0d10" }}>
            <img
              src="/image/cdn/youth-fitness-foundations-hero.jpg"
              alt="Youth Fitness Foundations class at ATHLETIX Brisbane — kids training speed and resistance work"
              loading="lazy"
              width={1600}
              height={1200}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">Conditioning · 7–11</span>
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
              <Link href="/contact" className="yaf-info-card-link">
                Get in touch →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="yaf-includes">
        <div className="container">
          <header className="yaf-includes-head">
            <p className="yaf-includes-eyebrow">Why kids love this class</p>
            <h2>The foundation every young athlete deserves</h2>
            <p className="yaf-includes-sub">
              Built on evidence-based youth S&amp;C principles — taught in a way
              that&apos;s fun, structured and safe for 7–11 year olds.
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
        sourceLabel="Youth Fitness Foundations page"
        defaultClass="Youth Fitness Foundations (7-11 yr)"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/cdn/youth-agility-marco-f2b0da.jpg"
                alt="Marco Mastrorocco — Head Coach"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Head Coach</p>
              <h3 className="yaf-coach-name">Marco Mastrorocco</h3>
              <p className="yaf-coach-bio">
                Marco leads the Youth Fitness Foundations program at ATHLETIX,
                guiding kids through their first taste of structured strength
                &amp; conditioning. His sessions blend foundational movement,
                playful conditioning and clear technical feedback — building
                young athletes who are confident, capable and ready for any
                sport they pursue.
              </p>
              <div className="yaf-coach-links">
                <Link href="/our-team" className="btn btn-outline btn-sm">
                  Meet the team
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-sm">
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
            <p>
              The most common things parents ask before their child&apos;s first
              session.
            </p>
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
