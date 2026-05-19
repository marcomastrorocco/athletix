import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Premier HIIT Class in Brisbane / Sled Push Workouts | ATHLETIX",
  description:
    "Our HIIT Sled Push & Drag classes are designed for men and women who want to burn fat, push their limits, work every part of the body and get stronger. Fortitude Valley, Brisbane.",
};

const PILLARS = [
  {
    n: "01",
    title: "Insane Fitness in Less Time",
    body: "30 minutes of HIIT can burn 250–600 calories thanks to the afterburn effect. Short bursts of all-out work, brief rests, repeat — fitness gains you simply can't get from steady-state cardio.",
  },
  {
    n: "02",
    title: "Functional Strength & Power",
    body: "Sleds, prowlers, bodyweight movements — every session works full-body, explosive strength. Athletes use this exact training to accelerate, decelerate and change direction better on the field or court.",
  },
  {
    n: "03",
    title: "Team-Oriented & Genuinely Fun",
    body: "You'll never train alone. Push & Drag runs as a team class with music, coaching cues and shared intensity. The hardest sessions feel like the most fun ones — and you'll be back next week.",
  },
  {
    n: "04",
    title: "Every Level Welcome",
    body: "Beginners, women, men, older adults, athletes — all welcome. Coaches scale loads, distances and rest periods per person. Kickstart your fitness or test the best — same class, your own intensity.",
  },
];

const FAQS = [
  {
    q: "What is a HIIT class?",
    a: (
      <>
        <p>
          A HIIT class is a <strong>high-intensity interval training</strong>{" "}
          class — short bursts of intense work followed by brief rest. Our
          Push &amp; Drag class typically runs 30–45 minutes built around sled
          pushes, drags, prowlers, bodyweight drills and team conditioning
          stations.
        </p>
        <p>
          Heart rate stays elevated the entire session, which means more
          calories burned, more cardiovascular adaptation and a serious
          afterburn effect for hours after class.
        </p>
      </>
    ),
  },
  {
    q: "Who should join the HIIT class?",
    a: (
      <>
        <p>
          HIIT is for almost everyone — beginners looking to lose weight,
          women and men wanting to get toned, athletes building work capacity,
          older adults staying conditioned. The class is scaled by your coach.
        </p>
        <p>
          <strong>The good:</strong> burns a lot of calories quickly, big
          afterburn effect, you&apos;ll likely gain lean muscle, you&apos;ll
          feel more energised.
        </p>
        <p>
          <strong>The caveat:</strong> intensity is higher than steady-state
          cardio — if you have a heart condition, are pregnant, or are
          recovering from injury, chat with your doctor and our coaches before
          starting.
        </p>
      </>
    ),
  },
  {
    q: "How many HIIT classes should I do per week?",
    a: (
      <p>
        Most people get great results with <strong>2–4 sessions per week</strong>.
        If you&apos;re new to HIIT, start with 2 per week for the first month,
        then build up. Pair HIIT with strength training and recovery work for
        the best outcomes — that&apos;s why our timetable mixes Push &amp;
        Drag with Lift, Mobility and Mat Pilates.
      </p>
    ),
  },
  {
    q: "How long is a class? How many calories will I burn?",
    a: (
      <p>
        Classes typically run <strong>30–45 minutes</strong>. Beginners often
        burn 250–350 calories per session; experienced members can burn
        400–600+. The exact number depends on your body, effort and
        conditioning — but the afterburn effect means you keep burning
        calories for hours after the class ends.
      </p>
    ),
  },
  {
    q: "Does HIIT actually work for weight loss?",
    a: (
      <p>
        Yes. HIIT is one of the most time-efficient training methods for fat
        loss — alternating all-out efforts with low-intensity recovery burns
        more calories per minute than traditional cardio, and research shows
        a stronger appetite-suppression effect after sessions. Combined with
        sensible nutrition, Push &amp; Drag is a powerful tool for body
        composition change.
      </p>
    ),
  },
  {
    q: "Can I do HIIT if I'm pregnant?",
    a: (
      <p>
        Many expectant mothers continue HIIT with appropriate modifications,
        but it&apos;s essential to <strong>consult your doctor first</strong>{" "}
        and let our coaches know so loads, intensity and movement selection
        can be adjusted to protect you and your baby.
      </p>
    ),
  },
];

export default function HiitPushAndDragPage() {
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
            HIIT — Push and Drag
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Conditioning · All levels
            </p>
            <h1 className="yaf-title">HIIT — Sled Push &amp; Drag</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              Develop an insane amount of <strong>fitness</strong>,{" "}
              <strong>strength</strong> and <strong>resilience</strong> with
              Push &amp; Drag. This team-oriented HIIT class — built around{" "}
              <strong>sled workouts</strong> — combines functional movements
              with bodyweight drills. Super fun, brutally effective, designed
              to kickstart beginners and test the best.
            </p>
            <p className="yaf-lead">
              Our HIIT Sled Push workout classes are designed for{" "}
              <strong>men and women</strong> who want to burn fat, push their
              limits, work every part of the body and get stronger. If
              you&apos;re looking for high-impact cardio, this is the class
              for you.
            </p>
            <p className="yaf-lead">
              Many of our athletes train Push &amp; Drag to support their
              sport — it builds the ability to accelerate, decelerate and
              change direction under fatigue.
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
              src="/image/cdn/hiit-push-and-drag-hero.jpg"
              alt="HIIT Push and Drag class at ATHLETIX Brisbane — athlete pushing weighted sled on track"
              loading="lazy"
              width={1600}
              height={1200}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">HIIT · Sled · Team</span>
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
            <p className="yaf-includes-eyebrow">Why athletes &amp; everyday members love it</p>
            <h2>The most effective 30 minutes in your week</h2>
            <p className="yaf-includes-sub">
              HIIT — done properly — burns fat, builds strength and improves
              every athletic quality. Push &amp; Drag is HIIT, the way
              elite coaches program it.
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

      <section
        className="yaf-includes"
        style={{ paddingTop: 0 }}
        aria-label="HIIT Push and Drag class video"
      >
        <div className="container">
          <header className="yaf-includes-head">
            <p className="yaf-includes-eyebrow">Watch the class in action</p>
            <h2>See Push &amp; Drag, live in the gym</h2>
            <p className="yaf-includes-sub">
              Real members, real intensity, real results — straight from a
              Tuesday session at our Fortitude Valley HQ.
            </p>
          </header>
          <div
            style={{
              position: "relative",
              maxWidth: 540,
              margin: "0 auto",
              aspectRatio: "9 / 16",
              borderRadius: 16,
              overflow: "hidden",
              background: "#000",
              boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/Lf2It8FNHG0?rel=0&modestbranding=1"
              title="ATHLETIX HIIT Push and Drag class"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </div>
        </div>
      </section>

      <ClassBookSection
        sourceLabel="HIIT Push and Drag page"
        defaultClass="HIIT-Push and Drag"
      />

      <div className="home-v2">
        <div className="trust-wrap">
          <div className="trust-inner">
            <h2 className="trust-h">
              Trusted by Brisbane&apos;s Elite Clubs &amp; Institutions
            </h2>
            <p className="trust-tagline">
              The coaches and physios who work with{" "}
              <strong>professional athletes</strong> choose Athletix for their
              own players. If they trust us — you can too.
            </p>
            <div className="logo-row">
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/brisbane-lions-logo.png"
                  alt="Brisbane Lions"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/cricket-australia-logo.png"
                  alt="Cricket Australia"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/Queensland-Bulls.png"
                  alt="Queensland Bulls"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/gold-coast-titans-logo.png"
                  alt="Gold Coast Titans"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/Brisbane-Bullets-logo.png"
                  alt="Brisbane Bullets"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/kisspng-brisbane-heat-logo.png"
                  alt="Brisbane Heat"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/Baseball_Australia_logo.png"
                  alt="Baseball Australia"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/crest-villanova-crest-logo.png"
                  alt="Villanova College"
                />
              </div>
            </div>
            <p className="trust-quote">
              &quot;The same science, the same standards, the same care used by{" "}
              <strong>NRL, cricket, and basketball clubs</strong> — built into
              a facility where every kid, adult, and family in Brisbane can
              access it.&quot;
            </p>
          </div>
        </div>
      </div>

      <section className="yaf-faq">
        <div className="container">
          <header className="yaf-faq-head">
            <h2>Frequently asked questions</h2>
            <p>The most common questions before your first HIIT class.</p>
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
