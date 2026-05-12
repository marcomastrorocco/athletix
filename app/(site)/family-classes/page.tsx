import Link from "next/link";
import type { Metadata } from "next";
import TimetableGrid from "@/components/TimetableGrid";
import { getTimetable } from "@/lib/data";

export const metadata: Metadata = {
  title: "Family Classes — ATHLETIX Brisbane",
  description:
    "Athletix is a family friendly gym in Fortitude Valley, Brisbane. Train together with up to 4 family members on one membership.",
};

type ClassTile = {
  type?: string;
  title: string;
  body: React.ReactNode;
};

const CLASSES: ClassTile[] = [
  {
    type: "CONDITIONING",
    title: "HIIT — PUSH & DRAG",
    body: (
      <>
        Develop insane fitness, strength, and resilience! Our SLED and PROWLERS
        workout is filled with functional movements, a great combination of
        bodyweight drills, and Teamwork! A true expression of evidence-based
        high-intensity training.
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MOBILITY",
    body: (
      <>
        A recovery class designed for athletic and general populations. A
        science-based approach to improve both flexibility and control
        (strength) in athletes&rsquo; new ranges of motion. Get supple and
        strong at the same time! Whatever your training age and experience,
        you will feel the difference after just one session!
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MAT PILATES",
    body: (
      <>
        Low-impact flexibility and muscular strength and endurance movements.
        Pilates emphasizes proper postural alignment, core strength, and
        muscle balance. Perfect for those sitting for too long!
      </>
    ),
  },
  {
    type: "STRENGTH",
    title: "LIFT",
    body: (
      <>
        LIFT together &mdash; Get STRONGER together. If your kids are 16+ they
        are welcome to join our ADULT Lift classes, as long as together with a
        parent.
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "MET CON",
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
    title: "FULL GYM ACCESS",
    body: (
      <>
        <p>
          Book an <strong>induction</strong> with one of our elite coaches.
          Ask them to create a workout routine that you and your family
          members (they need to be present at the induction) can all do
          together.
        </p>
        <p>
          OR simply come and use some of our walls/boards. There is always a
          coach on the floor ready to show, explain and correct if needed.
          Come and train in your own time as a top up session.
        </p>
      </>
    ),
  },
];

type FAQ = { q: string; a: React.ReactNode; open?: boolean };

const FAQS: FAQ[] = [
  {
    q: "Is There A Family Gym In Brisbane?",
    open: true,
    a: (
      <p>
        Yes, there are many family gyms you can find in Brisbane; Athletix is
        one of the best of them. We have state-of-art gyming types of
        equipment and certified trainers that will help you on every step of
        achieving your family fitness goals. People are more likely to stay
        committed to a fitness routine if they have social support. Family
        members are great, but it could be some friends you like to go along
        with. Join a family gym class and get in on some of the fun!
      </p>
    ),
  },
  {
    q: "How Much Is A Family Gym Membership?",
    a: (
      <p>
        The family membership gym prices/cost can vary according to the
        facilities and other factors of the Gym. It&rsquo;s essential to
        consider a gym&rsquo;s location, hours, and amenities to determine the
        price. Family memberships at the Gym can be a little expensive for
        families. The average cost of a foundation family membership is $439
        per year or $41 per month. The price varies depending on the Gym, but
        it is usually cheaper if you pay for multiple months in advance. It
        would be best to look for all factors before getting any family gym
        memberships because it is pretty expensive.
      </p>
    ),
  },
  {
    q: "What Are The Benefits Of A Family Gym Membership?",
    a: (
      <>
        <p>
          A family gym membership is beneficial for many reasons. One of the
          most significant benefits is that it helps children healthily
          connect with their parents. It also promotes a healthy lifestyle to
          children and adults alike, leading to better self-esteem and a
          positive perspective on life.
        </p>
        <p>
          Another benefit to a family gym membership is that it encourages a
          healthier lifestyle among the whole family. Drastic changes in diet,
          fitness routine or even regular exercise are easier when kids are
          involved. By giving your kids an outlet for their energy,
          you&rsquo;ll find your household calmer and more productive.
        </p>
        <p>
          Some gyms offer discounts for families. Families with more than one
          child can save money on each membership, and parents often find that
          they can exercise with their children more quickly when they&rsquo;re
          in the exact location.
        </p>
      </>
    ),
  },
  {
    q: "How Many Members Can I Include In The Family Gym Membership?",
    a: (
      <p>
        Family memberships terms vary on the gym. Some gyms allow up to 2
        adults and four children, while others allow three adults and five
        children. You should look at the membership plans before signing up
        for a family membership. The member limit for a family membership will
        vary from one Gym to another but typically ranges from two to four
        adults and five or six children. When you are trying to figure out who
        can be in your family membership, it is best to ask the staff at the
        Gym what their policy is before you sign up for the membership.
      </p>
    ),
  },
];

export default async function FamilyClassesPage() {
  const tt = await getTimetable();

  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/adult-classes-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link>{" "}
            <span>/</span> Family Classes
          </p>
          <h1>
            FAMILY <span className="accent">CLASSES</span>
          </h1>
        </div>
      </section>

      <section className="classes-intro">
        <div className="container">
          <h2>ATHLETIX FAMILY GYM MEMBERSHIP PLANS</h2>
          <p>
            Athletix is a <strong>family friendly gym</strong> based in{" "}
            <strong>Fortitude Valley, Brisbane</strong>. We pride ourselves on
            being a family friendly training centre, where kids (primary and
            high schools) and adults can train under the same roof. We offer a
            variety of training classes for families to train together or
            individually and save money on their gym memberships. Up to{" "}
            <strong>4 members</strong> can be included under one membership
            and prices are from <strong>$120 per week</strong>.
          </p>
          <p>
            Our certified strength and conditioning coaches are dedicated to
            completing your fitness goals. You will never feel like you are
            working hard for fitness. Instead, you&rsquo;ll love to spend your
            fitness quality time with your family and us. For more
            information, see our <strong>family membership options</strong>{" "}
            and <strong>book a weekly trial to all our classes</strong>.
          </p>
          <Link href="/membership" className="btn btn-outline">
            READ MORE
          </Link>
        </div>
      </section>

      <section className="classes-cards">
        <div className="container">
          <div className="class-card-grid">
            {CLASSES.map((c) => (
              <article key={c.title} className="class-tile">
                {c.type ? (
                  <p className="tile-type">
                    TYPE : <span>{c.type}</span>
                  </p>
                ) : (
                  <p className="tile-type">&nbsp;</p>
                )}
                <h3>{c.title}</h3>
                <div className="tile-body">{c.body}</div>
                <Link href="/contact" className="arrow-link">
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
