import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import ClassBookSection from "@/components/ClassBookSection";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/youth-open-workout");
}

const BENEFITS = [
  {
    n: "01",
    title: "Supervised Open Training",
    body: "Youth Open Workout gives our young athletes dedicated time to train their own program in a supervised environment. A coach is always on the floor to guide technique, set the right loads and keep training safe — so every minute is productive and confidence keeps building.",
  },
  {
    n: "02",
    title: "Skill Refinement",
    body: "This is where the details get sharpened. Athletes work on lifting technique, movement mechanics, speed and agility patterns away from the structure of a full class — reinforcing the skills they've learned and ironing out weaknesses at their own pace.",
  },
  {
    n: "03",
    title: "Long-Term Athletic Development",
    body: "Open training follows our LTAD philosophy: age-appropriate, progressive and built around the individual. Rather than forcing adult programs onto kids, we develop athleticism, coordination and resilience in a way that sets up healthy, capable athletes for the long run.",
  },
  {
    n: "04",
    title: "Ownership & Independence",
    body: "Training their own session teaches young athletes to take ownership of their development — to warm up properly, follow a plan, and understand the 'why' behind their training. These habits carry into sport, school and life well beyond the gym.",
  },
  {
    n: "05",
    title: "Coaching When It Counts",
    body: "Because numbers are kept tight and it's invite-only, athletes get real coach attention. The coach can step in at the right moments — a technique cue, a load adjustment, a bit of encouragement — making each session focused and genuinely valuable.",
  },
  {
    n: "06",
    title: "A Pathway, Not Just a Session",
    body: "Youth Open Workout is part of a bigger athlete pathway at Athletix. It complements our youth classes and development programs, giving committed young athletes extra time on the floor to keep progressing toward their goals.",
  },
];

export default function YouthOpenWorkoutPage() {
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
            Youth Open Workout
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Youth · Invite only
            </p>
            <h1 className="yaf-title">Youth Open Workout</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              An <strong>invite-only training session</strong> for our youth
              athletes — supervised open training to refine skills, build
              strength and keep progressing under the eye of an S&amp;C coach.
            </p>
            <p className="yaf-lead">
              Dedicated floor time, real coaching and a focus on long-term
              athletic development. This is where committed young athletes put in
              the extra work that sets them apart.
            </p>
            <div className="yaf-hero-cta">
              <Link href="#book-form" className="btn btn-primary">
                Enquire about a spot
              </Link>
              <Link href="/class-timetable" className="btn btn-ghost">
                View timetable
              </Link>
            </div>
          </div>

          <div className="yaf-media" style={{ background: "#0b0d10" }}>
            <img
              src="/image/cdn/Youth-sport-1-e1684274091394-7bb69e.webp"
              alt="Youth Open Workout supervised training at ATHLETIX Brisbane"
              loading="lazy"
              width={1920}
              height={1100}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">Youth · Invite only</span>
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
            <h2>What is Youth Open Workout?</h2>
            <p className="yaf-includes-sub">
              Youth Open Workout is supervised, invite-only training time for our
              young athletes. Rather than a structured group class, athletes work
              through their own program — strength, speed, agility or skill work —
              with an S&amp;C coach on the floor to guide and support them.
            </p>
            <p className="yaf-includes-sub">
              It's built on our Long-Term Athletic Development approach: smart,
              age-appropriate coaching that develops confidence, coordination and
              capability. Spots are limited and by invitation so every athlete
              gets the attention they need.
            </p>
          </header>
        </div>
      </section>

      <section className="yaf-includes" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="yaf-includes-head">
            <h2>Key Benefits of Youth Open Workout</h2>
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
            <h2>What to Expect in a Youth Open Workout</h2>
            <p className="yaf-includes-sub">
              Athletes arrive, warm up and get into their program for the day
              with a coach close by. Whether it's refining a lift, working on
              speed mechanics or building strength, the focus is on quality reps,
              good habits and steady progress at the right level.
            </p>
            <p className="yaf-includes-sub">
              Because it's invite-only and numbers are kept small, the session
              stays focused and personal. Coaches step in with cues, adjustments
              and encouragement — helping each young athlete train safely and
              keep moving toward their goals.
            </p>
          </header>
        </div>
      </section>

      <ClassBookSection
        sourceLabel="Youth Open Workout page"
        defaultClass="Youth Open Workout"
      />
    </>
  );
}
