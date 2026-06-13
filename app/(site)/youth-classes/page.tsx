import Link from "next/link";
import type { Metadata } from "next";
import TimetableGrid from "@/components/TimetableGrid";
import { getTimetable } from "@/lib/data";

export const metadata: Metadata = {
  title: "Youth Classes — ATHLETIX Brisbane",
  description:
    "A Strength & Conditioning gym for kids and teens in Brisbane. Youth Athletic Foundations (7–11) and Youth Athletic Development (12–16).",
};

type ClassTile = {
  type: string;
  title: string;
  body: React.ReactNode;
  href?: string;
};

const CLASSES: ClassTile[] = [
  {
    type: "CONDITIONING",
    title: "YOUTH SPEED FOUNDATIONS",
    href: "/youth-agility-foundations",
    body: (
      <>
        <strong>AGE GROUP: 7–11 years</strong>
        <br />
        Designed for ages 7 to 11, this class teaches the essentials of linear
        speed and acceleration mechanics. We focus on competency first by
        building positive projection, rhythm and strong front-side mechanics.
        Young athletes learn how to push effectively, hold stable shapes,
        create the right stiffness through the ankle and knee, and move
        efficiently in fast environments. The result is a fun and structured
        pathway that develops confident, coordinated and faster sprinters.
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "YOUTH AGILITY FOUNDATIONS",
    href: "/youth-agility-foundations",
    body: (
      <>
        <strong>AGE GROUP: 7–11 years</strong>
        <br />
        This class develops the core skills needed to move confidently in
        dynamic, fast-paced environments. Athletes learn how to accelerate,
        decelerate, brake, turn and change direction with control. The focus is
        on movement competency first, building coordination, joint stability
        and safe mechanics before adding speed. A structured introduction to
        linear and lateral agility that supports injury prevention and better
        performance across all sports.
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "YOUTH FITNESS FOUNDATIONS",
    href: "/youth-agility-development",
    body: (
      <>
        <strong>AGE GROUP: 7–11 years</strong>
        <br />
        A starter program for primary school aged kids that builds the
        fundamental movement skills needed for long-term athletic development.
        Sessions focus on learning proper patterns such as squatting, hinging,
        jumping and landing, as well as basic strength and coordination. Kids
        get fitter, stronger and more confident while developing the physical
        foundations that support every sport.
      </>
    ),
  },
  {
    type: "STRENGTH",
    title: "YOUTH STRENGTH DEVELOPMENT",
    href: "/youth-fitness-development",
    body: (
      <>
        <strong>AGE GROUP: 12–16 years old</strong>
        <br />
        A progressive strength program for young athletes ready to learn proper
        lifting technique and develop full-body strength safely. We focus on
        mastering movement patterns, building joint stability and introducing
        age-appropriate resistance training that supports long-term athletic
        development. Athletes gain confidence, improve coordination and
        establish the strength foundation needed for speed, power and
        resilience in any sport.
      </>
    ),
  },
  {
    type: "SPEED SKILLS",
    title: "YOUTH SPEED DEVELOPMENT",
    href: "/youth-speed-development",
    body: (
      <>
        <strong>AGE GROUP: 12–16 years old</strong>
        <br />
        Learn sprinting and acceleration for team sports, through technical
        drills and structured speed training designed for athletes who are
        ready to progress beyond basic movement skills. This stage introduces
        advanced acceleration mechanics, improved posture and projection and
        stronger front-side efficiency. Training develops the physiological
        qualities needed for real speed, including power production, limb
        stiffness and efficient force transfer, while also reducing injury risk
        in field and court sports.
      </>
    ),
  },
  {
    type: "MULTIDIRECTIONAL SPEED",
    title: "YOUTH AGILITY DEVELOPMENT",
    href: "/youth-speed-development",
    body: (
      <>
        <strong>AGE GROUP: 12–16 years old</strong>
        <br />
        A focused program for athletes in court and field sports who need to
        accelerate, brake and change direction with confidence. Training covers
        plyometrics, deceleration skills, turning mechanics and coordination
        drills that support safe, efficient movement in game situations. Each
        session improves body control, builds joint resilience and strengthens
        the tissues that protect young athletes from common non-contact
        injuries. The goal is simple: move faster, react better and enjoy sport
        with a body that is prepared for competition.
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MOBILITY",
    href: "/mobility",
    body: (
      <>
        A recovery class designed for athletic and general populations. A
        science-based approach to improve both flexibility and control
        (strength) in athletes&rsquo; new ranges of motion. Get supple and
        strong at the same time! Whatever your training age and experience, you
        will feel the difference after just one session!
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MAT PILATES",
    href: "/mat-pilates",
    body: (
      <>
        Low-impact flexibility and muscular strength and endurance movements.
        Pilates emphasizes proper postural alignment, core strength, and muscle
        balance. Perfect for those sitting for too long today!
      </>
    ),
  },
];

export default async function YouthClassesPage() {
  const tt = await getTimetable();

  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/youth-classes-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link>{" "}
            <span>/</span> Youth Classes
          </p>
          <h1>
            YOUTH <span className="accent">CLASSES</span>
          </h1>
        </div>
      </section>

      <section className="youth-intro">
        <div className="container youth-intro-grid">
          <div className="youth-intro-copy">
            <h2>A STRENGTH &amp; CONDITIONING GYM FOR KIDS &amp; TEENS</h2>
            <p>
              The success of young athletes, regardless of the sport they play,
              is based on 3 factors: <strong>SKILL DEVELOPMENT</strong> (their
              sport practice), <strong>ATHLETICISM</strong> (S&amp;C) and{" "}
              <strong>INJURY REDUCTION</strong> (S&amp;C) longevity.
            </p>

            <div className="intro-collapse-body">
                <p>
                  Whether your child is involved in court sports such as tennis,
                  netball, or basketball, or field sports such as rugby, AFL,
                  cricket, hockey, or soccer, our programs are designed to develop
                  the physical abilities that are necessary for success on the
                  field or court.
                </p>
                <p>
                  The Programs at our youth gym for teenager Brisbane gym are split
                  in 2 groups: the <strong>YOUTH ATHLETIC FOUNDATIONS</strong>{" "}
                  (7&ndash;11yo) and <strong>YOUTH ATHLETIC DEVELOPMENT</strong>{" "}
                  (12&ndash;16yo).
                </p>
                <p>
                  The <strong>FOUNDATION</strong> group focuses on developing
                  general fitness, movement competency, and speed and agility.
                  These foundational skills are essential for all sports and will
                  give your child the tools they need to excel in any athletic
                  pursuit.
                </p>
                <p>
                  Our Youth <strong>ATHLETIC DEVELOPMENT</strong> group will take
                  their athletic performance to the next level, focusing on
                  strength development, acceleration and agility. These skills are
                  essential for success in field sports such as rugby, AFL, and
                  soccer, where speed and power are key. They are also important
                  for court sports such as tennis, netball, and basketball, where
                  agility and quickness can make the difference between winning and
                  losing.
                </p>
                <p>
                  Developing superior athleticism is not just about winning games,
                  it&rsquo;s also about building <strong>confidence</strong>,{" "}
                  <strong>self-discipline</strong>, and{" "}
                  <strong>mental toughness</strong>.
                </p>
                <p>
                  These qualities are essential for success both on and off the
                  field or court, and they will serve your child well throughout
                  their lives.
                </p>
                <p>
                  So whether your child is a beginner or an experienced athlete,
                  our Youth Strength and Conditioning programs are designed to help
                  them reach their full potential and achieve their goals.
                </p>
            </div>
            <Link
              href="/contact"
              className="btn btn-primary"
              style={{ marginTop: "26px" }}
            >
              Book a Trial
            </Link>
          </div>
          <div className="youth-intro-image">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/image/video/youth-classes.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="youth-form-section" id="youth-form">
        <div className="container">
          <div className="youth-form-head">
            <h2>
              BOOK A <span className="accent">TRIAL</span>
            </h2>
            <p className="youth-form-lead">
              <strong>Contact us today</strong> to{" "}
              <strong>book a trial</strong> and to{" "}
              <strong>enrol your child in our programs.</strong>
            </p>
          </div>

          <form className="youth-form" method="post" action="/contact">
            <div className="youth-form-row">
              <div className="youth-form-field">
                <input
                  type="text"
                  name="full_name"
                  id="yf-name"
                  placeholder=" "
                  required
                />
                <label htmlFor="yf-name">Your full name</label>
              </div>
              <div className="youth-form-field">
                <input
                  type="email"
                  name="email"
                  id="yf-email"
                  placeholder=" "
                  required
                />
                <label htmlFor="yf-email">E-mail address</label>
              </div>
            </div>
            <div className="youth-form-row">
              <div className="youth-form-field">
                <input
                  type="tel"
                  name="phone"
                  id="yf-phone"
                  placeholder=" "
                />
                <label htmlFor="yf-phone">Phone</label>
              </div>
              <div className="youth-form-field">
                <input
                  type="text"
                  name="subject"
                  id="yf-subject"
                  placeholder=" "
                />
                <label htmlFor="yf-subject">Subject</label>
              </div>
            </div>
            <div className="youth-form-field youth-form-field-full">
              <textarea
                name="message"
                id="yf-message"
                rows={6}
                placeholder=" "
              />
              <label htmlFor="yf-message">Drop us a few lines here&hellip;</label>
            </div>
            <fieldset className="adult-radio-group">
              <legend>About you:</legend>
              <label className="radio-pill">
                <input type="radio" name="audience" value="youth" defaultChecked />
                <span>Youth</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="audience" value="adult" />
                <span>Adult</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="audience" value="athlete" />
                <span>Athlete</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="audience" value="family" />
                <span>Family</span>
              </label>
            </fieldset>
            <div className="youth-form-actions">
              <div className="youth-captcha">
                <input
                  type="checkbox"
                  name="not_robot"
                  id="yf-captcha"
                  className="yc-check"
                  required
                />
                <label
                  htmlFor="yf-captcha"
                  className="yc-box"
                  aria-label="I'm not a robot"
                />
                <label htmlFor="yf-captcha" className="yc-label">
                  I&rsquo;m not a robot
                </label>
                <span className="yc-logo">reCAPTCHA</span>
              </div>
              <button type="submit" className="youth-form-submit">
                SEND US A MESSAGE <span aria-hidden="true">&#10148;</span>
              </button>
            </div>
          </form>

          <Link href="/contact" className="btn btn-outline youth-form-readmore">
            READ MORE
          </Link>
        </div>
      </section>

      <section className="classes-cards" id="youth-classes-grid">
        <div className="container">
          <div className="class-card-grid">
            {CLASSES.map((c) => (
              <article key={c.title} className="class-tile">
                <p className="tile-type">
                  TYPE : <span>{c.type}</span>
                </p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <Link href={c.href || "/contact"} className="arrow-link">
                  MORE HERE <span>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="timetable" id="timetable">
        <div className="container">
          <div className="timetable-head">
            <p className="eyebrow">Athletix Club</p>
            <h2>Timetable</h2>
            <p className="section-sub">
              Weekly training schedule inspired by our in-gym board. Sunday is
              reserved for recovery.
            </p>
          </div>
          <TimetableGrid data={tt} />
        </div>
      </section>
    </>
  );
}
