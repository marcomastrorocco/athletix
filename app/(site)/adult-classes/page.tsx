import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/adult-classes");
}

type ClassTile = {
  type: string;
  title: string;
  body: React.ReactNode;
  href?: string;
};

const CLASSES: ClassTile[] = [
  {
    type: "STRENGTH",
    title: "LIFT",
    body: (
      <>
        This class will progress you from the foundation of Weightlifting
        (Squats, Deadlifts, Bench Press etc.) onto power based movements
        (Cleans, Jerks, Snatches) with great emphasis on movement competency
        and coaching.
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "HIIT — PUSH AND DRAG",
    body: (
      <>
        Develop an insane amount of fitness, strength and resilience with Push
        &amp; Drag. This team-oriented class is filled with great functional
        movements and bodyweight drills. This class is a true example of
        high-intensity training designed to kickstart beginners and test the
        best!
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MOBILITY",
    href: "/classes/mobility",
    body: (
      <>
        Our Mobility class focuses on active recovery and uses a science-based
        approach to improve flexibility and strength at the same time. Whether
        you are an elite athlete or just a beginner, you will feel the
        difference after just one session!
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MAT PILATES",
    href: "/classes/mat-pilates",
    body: (
      <>
        Our Mat Pilates class focuses on improving postural alignment, core
        strength, and muscle balance. It is a low-impact option and perfect for
        those sitting all day or for those recovering from high-intensity
        training!
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "MET-CON",
    body: (
      <>
        A circuit class meant to help you enhance metabolic rate and overall
        conditioning regardless of your starting fitness level. Met-Con works
        your speed-strength with submaximal loads and a variety of
        movements/tools. You will love it.
      </>
    ),
  },
  {
    type: "MIXED",
    title: "STRENGTH & CON",
    body: (
      <>
        This class merges the best of both worlds: <strong>STRENGTH</strong>:
        lifting with a focus on resilience and work capacity.{" "}
        <strong>CONDITIONING</strong>: working on energy system to finish the
        session on a high, not only burning a few extra calories, but making
        sure your Fitness gets challenged to improve week after week!
      </>
    ),
  },
];

type FAQ = { q: string; a: React.ReactNode; open?: boolean };

const FAQS: FAQ[] = [
  {
    q: "What is a Group Fitness Class?",
    open: true,
    a: (
      <>
        <p>
          Group fitness classes are all forms of exercises done in a group
          setting, headed by a trainer or an instructor. It includes Zumba,
          Bootcamp, Pilates, Dance, Boxing Class, etc. These exercises help
          with your fitness needs and health by working in a group setting. You
          can easily find personal trainers for adults, seniors, and kids to
          get healthy in an intelligent way.
        </p>
        <p>
          Group fitness classes are fun! With music playing around and everyone
          working out, sharing the struggles, and cheering at the successes, it
          feels more like a party than a workout. You can even sign up for
          endless combinations of exercises to make the journey to getting
          healthier fun!
        </p>
      </>
    ),
  },
  {
    q: "Do Group Fitness Classes Work?",
    a: (
      <>
        <p>
          In a group fitness class, you work out with many people. It pushes
          you to your limits and to give your best. Over time, you adopt this
          mindset, helping you kick yourself into gear even on those days when
          you want to plant yourself on the couch. If you&rsquo;re one of those
          people to whom even the thought of exercising on their own feels
          demotivating, it&rsquo;s time to switch to a group session.
        </p>
        <p>
          In a group fitness class, you meet different people for a sweat
          session &ndash; it keeps your mind fresh and you in shape as you
          break yourself from the daily routine.
        </p>
      </>
    ),
  },
  {
    q: "Are Group Fitness Classes Free?",
    a: (
      <>
        <p>
          If you&rsquo;re looking for free group fitness classes for adults,
          don&rsquo;t forget to check out Athletix. They offer a range of
          workout sessions, including met-con, mat pilates, kettlebells, push
          and drag, sprint, and mobility. According to our timetable, sessions
          are carried out for a whole week, and you&rsquo;re free to include as
          many as you want in a day, according to your fitness needs.
        </p>
        <p>
          Athletix offers free group fitness workouts for a whole week.
          You&rsquo;ll get to enjoy multiple exciting sessions on systematic
          and evidence-based approaches and are free to select any class you
          want.
        </p>
      </>
    ),
  },
  {
    q: "Do People Perform Better in Group Fitness Classes?",
    a: (
      <>
        <p>
          Studies have proved that group exercises positively affect your
          health and well-being compared to solo workouts. When people perform
          an activity in a group, it influences their attitude and emotional
          responses. It means that seeing people around you doing the same
          thing affects how you feel about that activity.
        </p>
        <p>
          For instance, if you surround yourself with people who exercise
          regularly, you will also begin to perceive exercise as a positive
          and desirable activity. Thus, we can say that people perform better
          in group fitness classes because doing a task in groups is
          motivating, fun, and engaging.
        </p>
      </>
    ),
  },
  {
    q: "What are Group Fitness Activities?",
    a: (
      <>
        <p>
          For many people, mass activities are an appealing option. When you
          enter a group activity, you meet new people and establish
          friendships. Group fitness activities offer you the opportunity of
          joining the journey towards fitness along with a friend without
          formally being a part of a competition.
        </p>
        <p>
          Some of the most common group fitness activities for adults include
          pump, step, spin, and circuit training. Whether you&rsquo;re an
          adult or elderly, you can find different activities accordingly.
        </p>
      </>
    ),
  },
  {
    q: "What are the Benefits of Group Fitness Over Individual?",
    a: (
      <>
        <p>
          Group fitness exercises are the most effective ways to get fit, lose
          weight, build stamina, your dream body, and sustain a healthy
          lifestyle. It allows you to enjoy working out while doing gym with a
          personal trainer, making it even more enjoyable. Here are a few
          other perks:
        </p>
        <ul className="faq-list">
          <li>
            You feel motivated to work harder, seeing everyone around you is
            doing the same.
          </li>
          <li>
            As the professionals are there to correct you at each step, injury
            risks are very low.
          </li>
          <li>
            You get to meet like-minded people who become your support network
            and tribe.
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "What is the Best Group Fitness Class for a Sedentary Person?",
    a: (
      <>
        <p>
          For a passive person, it is vital to introduce group exercises to
          their lifestyle. It is the key to reducing health risks and keeping
          the mind fresh. One may start with the following workouts:
        </p>
        <ol className="faq-list faq-list-numbered">
          <li>
            <strong>Bike Riding</strong>
            <p>
              Stationary bike riding is best for sedentary people as they lack
              a solid abdominal core, making it hard for them to sit on an
              upright bike.
            </p>
          </li>
          <li>
            <strong>Aquarobics</strong>
            <p>
              Exercising in water reduces the impact on the joints, causing
              less pain in your hips and knees. It happens because the water
              supports your body weight, so you experience less pain.
            </p>
          </li>
          <li>
            <strong>Treadmill</strong>
            <p>
              Walking on a treadmill is highly beneficial for warming up.
              While it is better to go out in the park to take a walk, a
              treadmill will be enough for you if you&rsquo;re a homebody or
              looking for a gym for seniors.
            </p>
          </li>
        </ol>
      </>
    ),
  },
  {
    q: "Can I Claim NDIS on My Gym Membership?",
    a: (
      <>
        <p>
          The NDIS (National Disability Insurance Scheme) supports some gym
          tasks you can claim. Since gymming is unrelated to a disability,
          you&rsquo;d have to prove that your need for membership is solely
          and directly related to the disability. If you fail to prove your
          case, the NDIS will refuse membership.
        </p>
        <p>
          A personal trainer registered with NDIS helps make exercising less
          overwhelming for people with disabilities.
        </p>
      </>
    ),
  },
];

export default async function AdultClassesPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/youth-classes-page.css" />
      <link rel="stylesheet" href="/css/adult-classes-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link>{" "}
            <span>/</span> Adult Classes
          </p>
          <h1>
            ADULT <span className="accent">CLASSES</span>
          </h1>
        </div>
      </section>

      <section className="youth-intro">
        <div className="container youth-intro-grid">
          <div className="youth-intro-copy">
            <h2>
              CHALLENGE YOURSELF WITH GROUP STRENGTH &amp; CONDITIONING CLASSES
            </h2>
            <p>
              There is <strong>strength in teamwork</strong>, especially for
              fitness. At ATHLETIX we believe working out as part of a team and
              teamwork in general, is a large contributing factor to improving
              performance and achieving fitness goals.
            </p>

            <div className="intro-collapse-body">
                <p>
                  When you&rsquo;re in a small group, there&rsquo;s a motivation to
                  do your best and <strong>push your limits</strong>. When the
                  class is too large, we find the results are not the same. When
                  paired with a professional strength and conditioning coach, the
                  results can be extraordinary.
                </p>
                <p>
                  Our <strong>Strength and Conditioning gym</strong> and training
                  systems are based on current best practices and cutting-edge
                  sport science, ensuring that you achieve remarkable results.
                </p>
                <p>
                  We believe in <strong>EDUCATION THROUGH COACHING!</strong>
                </p>
                <h3 className="youth-intro-sub">BOOK YOUR 7-DAY TRIAL</h3>
                <p>
                  Our small group classes deliver dynamic and engaging workouts
                  that target various aspects of fitness. Our expert S&amp;C
                  coaches guide you through each exercise, ensuring proper
                  technique and progression. <strong>Book your spot today!</strong>
                </p>
            </div>
            <Link
              href="#adult-form"
              className="btn btn-primary"
              style={{ marginTop: "26px" }}
            >
              Book a Trial
            </Link>
          </div>
          <div className="youth-intro-image">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/image/video/adult-classes.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="youth-form-section" id="adult-form">
        <div className="container">
          <div className="youth-form-head">
            <h2>
              BOOK A <span className="accent">TRIAL</span>
            </h2>
            <p className="youth-form-lead">
              <strong>Book your spot today!</strong>
            </p>
          </div>

          <form className="youth-form" data-lead data-source="Adult Classes page">
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
            <div className="youth-form-field youth-form-field-full">
              <input
                type="text"
                name="full_name"
                id="af-name"
                placeholder=" "
                required
              />
              <label htmlFor="af-name">
                Name<span className="req">*</span>
              </label>
            </div>
            <div className="youth-form-field youth-form-field-full">
              <input type="tel" name="phone" id="af-phone" placeholder=" " />
              <label htmlFor="af-phone">Phone Number</label>
            </div>
            <div className="youth-form-field youth-form-field-full">
              <input
                type="email"
                name="email"
                id="af-email"
                placeholder=" "
                required
              />
              <label htmlFor="af-email">
                Email<span className="req">*</span>
              </label>
            </div>

            <fieldset className="adult-radio-group">
              <legend>About you:</legend>
              <label className="radio-pill">
                <input type="radio" name="audience" value="youth" />
                <span>Youth</span>
              </label>
              <label className="radio-pill">
                <input
                  type="radio"
                  name="audience"
                  value="adult"
                  defaultChecked
                />
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
              <div className="youth-captcha" aria-label="reCAPTCHA placeholder">
                <span className="yc-box" />
                <span className="yc-label">I&rsquo;m not a robot</span>
                <span className="yc-logo">reCAPTCHA</span>
              </div>
              <button type="submit" className="youth-form-submit">
                BOOK NOW <span aria-hidden="true">&#10148;</span>
              </button>
            </div>
          </form>

          <Link href="/contact-us" className="btn btn-outline youth-form-readmore">
            READ MORE
          </Link>
        </div>
      </section>

      <section className="classes-cards">
        <div className="container">
          <div className="class-card-grid adult-card-grid">
            {CLASSES.map((c) => (
              <article key={c.title} className="class-tile">
                <p className="tile-type">
                  TYPE : <span>{c.type}</span>
                </p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <Link href={c.href || "/contact-us"} className="arrow-link">
                  MORE HERE <span>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="adult-faq">
        <div className="container">
          <h2 className="adult-faq-title">FREQUENTLY ASKED QUESTIONS</h2>
          {FAQS.map((f, i) => (
            <details key={i} className="faq-item" open={f.open}>
              <summary>{f.q}</summary>
              <div className="faq-body">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
