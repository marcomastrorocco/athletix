import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Mobility Class Brisbane — Flexibility & Movement Gym ATHLETIX",
  description:
    "Mobility refers to exercises that improve range of motion and stabilise joints. Our science-based class builds flexibility and strength at the same time — for athletes and general populations.",
};

const PILLARS = [
  {
    n: "01",
    title: "Deep Stretch",
    body: "Bands, belts and ropes release tension and promote flexibility, alignment and joint mobility — targeting hips, hamstrings, upper back, shoulders and neck.",
  },
  {
    n: "02",
    title: "Evening Flow",
    body: "Move from pose to pose using soft, precise actions. Improve hip mobility and shoulder flexibility while expanding control and breath awareness (PVC pipe used).",
  },
  {
    n: "03",
    title: "Restore",
    body: "Refreshing, rejuvenating work with foam rollers, hand rollers and therapy balls. Increase range of motion, reduce pain and build a better sense of your body.",
  },
  {
    n: "04",
    title: "TLC",
    body: "Be proactive with mobility — not reactive. Increase flexibility, adaptability, resilience and core strength while recovering from active injuries.",
  },
];

const FAQS = [
  {
    q: "What are mobility exercises?",
    a: (
      <p>
        Mobility exercises boost your body&apos;s range of motion and reduce
        overall stiffness. They&apos;re essential to nearly every activity, help
        control knots and minor wounds, reduce stress related to sedentary days
        or over-training, and improve overall functional fitness so you stay
        energetic and injury-resilient.
      </p>
    ),
  },
  {
    q: "How often should I do mobility exercises?",
    a: (
      <>
        <p>
          2–3 times per week as a minimum, but daily is even better.
          Incorporating a few minutes of mobility into your existing strength or
          agility sessions is enough — target the areas that feel tight.
        </p>
      </>
    ),
  },
  {
    q: "When should I do mobility exercises?",
    a: (
      <>
        <p>
          You can start in your 20s/30s when muscles adapt quickly, but mobility
          becomes even more important as you age and joints stiffen up.
        </p>
        <ul>
          <li>Right after waking up</li>
          <li>During lunch breaks</li>
          <li>5–10 minutes before bed</li>
        </ul>
      </>
    ),
  },
  {
    q: "Why is mobility so important?",
    a: (
      <p>
        Long hours at a desk decline physical fitness and increase the risk of
        cardiovascular disease, diabetes and other conditions. Mobility
        counteracts this — restoring movement quality and reducing pain.
      </p>
    ),
  },
  {
    q: "Why is mobility important in everyday life?",
    a: (
      <p>
        Mobility lets you move freely and stay independent — walking, running,
        climbing stairs, playing with kids. It&apos;s not only crucial for
        independence but for everyday enjoyment.
      </p>
    ),
  },
  {
    q: "Is mobility better than stretching?",
    a: (
      <p>
        Mobility is a more efficient, dynamic form of training. A few minutes of
        mobility work can match an hour of static stretching. Both have a place,
        but mobility usually delivers more bang-for-buck for active people.
      </p>
    ),
  },
  {
    q: "When can mobility be harmful?",
    a: (
      <>
        <p>
          Like anything, doing too much without recovery can cause issues. Watch
          out for habits that strain the body:
        </p>
        <ul>
          <li>Sitting hunched at a desk all day</li>
          <li>Holding your phone for long periods of texting/scrolling</li>
          <li>Hours of video games without breaks</li>
        </ul>
      </>
    ),
  },
  {
    q: "How do I check my mobility?",
    a: (
      <>
        <p>
          Try bending to touch your toes or standing on one foot. Test joint
          range of motion in three axes:
        </p>
        <ul>
          <li>Sagittal (side to side)</li>
          <li>Frontal (forward and back)</li>
          <li>Transverse (rotational)</li>
        </ul>
      </>
    ),
  },
  {
    q: "What is the difference between mobility and flexibility?",
    a: (
      <p>
        Mobility is the freedom of your joints to move. Flexibility is your
        muscles&apos; ability to stretch. You can be flexible without being
        mobile, and vice versa — true movement quality needs both.
      </p>
    ),
  },
  {
    q: "How do I know if I have mobility issues?",
    a: (
      <p>
        Common signs: joint pain, ongoing fatigue, numbness or tingling, balance
        difficulties. If symptoms persist, check in with a doctor or coach so
        you can build a plan to address them.
      </p>
    ),
  },
  {
    q: "Do you offer women-only mobility classes?",
    a: (
      <p>
        Our group classes are mixed by default. If most participants are women
        on a particular session, the class naturally skews that way — but we
        don&apos;t restrict by gender. Get in touch if you&apos;d like to
        organise a private session.
      </p>
    ),
  },
];

export default function MobilityPage() {
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
            Mobility
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
            <h1 className="yaf-title">Mobility</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              Our Mobility &amp; Movement class focuses on active recovery and
              uses a science-based approach to improve flexibility and strength
              at the same time. Whether you&apos;re an elite athlete or a
              beginner, you&apos;ll feel the difference after one session.
            </p>
            <p className="yaf-lead">
              This group-based mobility, flexibility and movement class is about
              power <em>and</em> range — building strength and flexibility
              together.
            </p>
            <p className="yaf-lead">
              When you start training for{" "}
              <Link href="/classes">strength and conditioning</Link>, muscle
              stiffness and joint pain are the last thing you want. Our class
              teaches you how to use specific tools to restore your body to its
              natural movement, decrease training-related injuries, and improve
              flexibility, balance and strength.
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

          <div className="yaf-media">
            <img
              src="/image/cdn/mobility-hero.jpg"
              alt="Mobility class on the turf at ATHLETIX Brisbane"
              loading="lazy"
              width={1600}
              height={1600}
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
            <p className="yaf-includes-eyebrow">What this class includes</p>
            <h2>Four pillars of our mobility training</h2>
            <p className="yaf-includes-sub">
              Each session is built around techniques that target every major
              joint and muscle group — releasing tension, restoring range, and
              building strength inside your new mobility.
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
        sourceLabel="Mobility page"
        defaultClass="Mobility"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/cdn/mobility-coach-marco.jpg"
                alt="Marco Mastrorocco — Head Coach, Mobility"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Head Coach</p>
              <h3 className="yaf-coach-name">Marco Mastrorocco</h3>
              <p className="yaf-coach-bio">
                Marco brings a science-based approach to active recovery and
                mobility, designed to deliver real change in a single session.
                Built for athletes and everyday movers — restore your range,
                stabilise your joints and own your body again.
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
            <p>The most common things people ask before their first class.</p>
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
