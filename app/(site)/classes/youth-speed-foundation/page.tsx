import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import ClassBookSection from "@/components/ClassBookSection";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/classes/youth-speed-foundation");
}

const PILLARS = [
  {
    n: "01",
    title: "Sprint Mechanics, Done Right",
    body: "Kids learn the foundational positions of sprinting — posture, arm action, shin angle, knee drive — coached frame-by-frame. The same drills used at elite level, adapted for 7–11 year olds.",
  },
  {
    n: "02",
    title: "Acceleration & First-Step Quickness",
    body: "Short, sharp accelerations build the explosive ability every sport needs — from chasing a soccer ball to breaking from the blocks. We progress kids through wall drills, falling starts and resisted runs.",
  },
  {
    n: "03",
    title: "Injury-Proof Movement",
    body: "Plyometric foundations, landing mechanics and joint integrity work — so kids stay healthy as their speed climbs. Faster bodies still need resilient bodies.",
  },
  {
    n: "04",
    title: "Pathway to Speed Development",
    body: "Graduate into our Youth Speed Development (12–16) class with the technical base most kids never get. Faster sprinters become better athletes — across every court and field sport.",
  },
];

const FAQS = [
  {
    q: "What is the Youth Speed Foundation class?",
    a: (
      <>
        <p>
          Youth Speed Foundation is our entry-level sprint &amp; acceleration
          class for Primary School aged kids (7–11). The focus is technical —
          we teach the foundations of sprinting mechanics, perfect the
          movements at low intensity, then progressively build speed once the
          technique is locked in.
        </p>
        <p>
          It&apos;s the same approach used with elite track athletes, scaled
          appropriately for young bodies and developing nervous systems.
        </p>
      </>
    ),
  },
  {
    q: "Why focus on sprint technique so early?",
    a: (
      <>
        <p>
          The 7–11 age window is a peak learning period for motor skills. Kids
          who learn correct sprint mechanics now move faster — and safer —
          for the rest of their athletic life. Skip this stage and they spend
          years trying to un-learn inefficient patterns.
        </p>
      </>
    ),
  },
  {
    q: "Which sports does this benefit?",
    a: (
      <>
        <p>Pretty much all of them:</p>
        <ul>
          <li>Athletics &amp; Track</li>
          <li>Soccer, AFL, Rugby</li>
          <li>Netball, Basketball</li>
          <li>Cricket</li>
          <li>Any sport requiring acceleration, change of direction or chasing</li>
        </ul>
        <p>
          Speed is the most transferable athletic quality — faster kids are
          better at every sport they try.
        </p>
      </>
    ),
  },
  {
    q: "What happens next?",
    a: (
      <p>
        At 12, kids graduate into our{" "}
        <Link href="/classes/youth-speed-development">
          <strong>Youth Speed Development</strong>
        </Link>{" "}
        class — where the foundations laid here turn into measurable
        performance gains for High School athletes. They&apos;ll also be
        well-positioned for our Agility and Strength programs.
      </p>
    ),
  },
];

export default function YouthSpeedFoundationPage() {
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
            Youth Speed Foundation
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Speed · Ages 7–11
            </p>
            <h1 className="yaf-title">Youth Speed Foundation</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              Learn the foundations of <strong>Sprinting</strong> and{" "}
              <strong>Acceleration</strong>. Perfect the mechanics, improve
              speed and lay the groundwork for our Speed Development class
              — coached by qualified track &amp; S&amp;C specialists.
            </p>
            <p className="yaf-lead">
              Built for Primary School aged kids who want to run faster — and
              for parents who want their child to develop sound movement
              patterns now rather than fix bad habits later. Sessions are
              structured, technical and progressive — never random sprints.
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
              <Link href="/class-timetable" className="btn btn-ghost">
                View timetable
              </Link>
            </div>
          </div>

          <div className="yaf-media" style={{ background: "#0b0d10" }}>
            <img
              src="/image/cdn/youth-speed-foundation-hero.jpg"
              alt="Youth Speed Foundation class at ATHLETIX Brisbane — kids sprinting with resistance bands"
              loading="lazy"
              width={1600}
              height={1200}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">Speed · 7–11</span>
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
            <p className="yaf-includes-eyebrow">Why kids love this class</p>
            <h2>Speed built the right way — from the ground up</h2>
            <p className="yaf-includes-sub">
              Technical, progressive and grounded in evidence-based sprint
              coaching — adapted into fun, focused sessions for 7–11 year olds.
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
        sourceLabel="Youth Speed Foundation page"
        defaultClass="Youth Speed Foundation (7-11 yr)"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/youth-strength-isaac.jpg"
                alt="Isaac Corvo — Speed & Conditioning Coach"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Speed Coach</p>
              <h3 className="yaf-coach-name">Isaac Corvo</h3>
              <p className="yaf-coach-bio">
                Isaac leads the Youth Speed Foundation program at ATHLETIX,
                guiding young athletes through their first steps into sprint
                mechanics, acceleration work and injury-resilient running.
                His sessions blend technical precision with playful,
                age-appropriate drills — so kids leave each class faster,
                more confident, and better moving.
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
            <p>
              The most common things parents ask before their child&apos;s
              first session.
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
