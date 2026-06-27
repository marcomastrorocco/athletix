import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { resolvePageMetadata } from "@/lib/seo-server";
import { getSite } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/our-team");
}

export const dynamic = "force-dynamic";

type Coach = {
  img: string;
  name: string;
  body: ReactNode;
  quals: string[];
  focus?: string[];
};

const COACHES: Coach[] = [
  {
    img: "/image/Elite Coach/mastro.jpeg",
    name: "MARCO MASTROROCCO",
    body: (
      <>
        <p>
          Over 20 years experience in coaching general and athletic populations
          (Triple, Uri, Sport, Australia). A deep passion in educating and
          developing physical ability.
        </p>
        <p>
          Since 2019, I have been working as a coach for Cricket Australia
          (Pathway Squads) and the Queensland Bulls (Elite and Youth Pathway).
          I am providing high performance programs for Highschool sports
          programs (Rugby Union, Track and Field, Swimming).
        </p>
        <p>
          Currently part of a research group in the field of
          &ldquo;CONCUSSION&rdquo; with QUT and GRIFFITH University.
        </p>
        <p>
          Marco also mentors and helps the Team developing the Optimal
          S&amp;C frameworks to suit both our athletic and general
          populations.
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach – ASCA Professional L2",
      "Weightlifting Coach (AWF Level 2)",
      "S&C Consultant for CRICKET AUSTRALIA and QLD BULLS",
      "Bachelor in High Performance Sports",
      "14× Italian First Kickboxing Champion",
      "Bronze Medal at the W.A.K.O. European Kickboxing Championships (2009)",
    ],
  },
  {
    img: "/image/Elite Coach/isaac.jpg",
    name: "ISAAC COMPO",
    body: (
      <>
        <p>I have been living and breathing Sport my entire life.</p>
        <p>
          I have been playing AFL at sub-elite places for the past 5 years,
          got accepted to High Level coaching.
        </p>
        <p>
          This inspired completing my Bachelor in Exercise Science and
          becoming a Strength and Conditioning specialist.
        </p>
        <p>
          My mission is to support others in their journey to becoming a
          better version of themselves: fitter, stronger, faster or in
          whatever capacity that may be.
        </p>
        <p>
          My coaching philosophy is about providing an evidence-based
          approach, evolving in fundamental movements (squatting, pressing,
          pulling and hinging) in conjunction with improving motor patterns,
          proven to all latest development (jumping, sprinting, lifting).
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach – ASCA Level 1",
      "Bachelor in Exercise Science",
      "Sub Elite AFL Athlete",
    ],
    focus: [
      "Strength and Power Development",
      "Speed Development",
      "Injury Prevention and Return to play",
      "Mobility",
    ],
  },
  {
    img: "/image/Elite Coach/Reza.jpg",
    name: "REZA SHANFIAN",
    body: (
      <>
        <p>
          Insatiably interested in human movement and athletic performance.
        </p>
        <p>
          I completed a Bachelor of Exercise and Sport Sciences (Hons) (after
          playing International rugby).
        </p>
        <p>
          I have a broad range of coaching experience: professional cricket
          players, sub-elite rugby and soccer players, gym and fitness
          enthusiasts.
        </p>
        <p>
          I implement a scientific and research-based approach to my coaching
          and am always interested to learn more about new training methods
          and human movement. I believe in a holistic approach towards health
          and fitness and am eager to help my clients to reach their goals.
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach",
      "Bachelor of Exercise Science (Hons.)",
      "ASCA Accredited Exercise and Sport Scientist (LEXL/ASBP)",
    ],
    focus: [
      "Strength and Conditioning",
      "Agility and Power Development",
      "Injury Prevention and Rehab",
    ],
  },
  {
    img: "/image/Elite Coach/ritti.jpg",
    name: "ELITE NWAZE",
    body: (
      <>
        <p>Sport has and continues to be the drum to my Heartbeat.</p>
        <p>
          Creating and completing the Bachelor of High performance sport has
          enriched my drum set with new found.
        </p>
        <p>
          Ready to educate and motivate youth and adults alike in their
          aspiring fitness goals: whether it be to get stronger, fitter or
          faster, I&rsquo;m dedicated to continuous, professional development
          to guide clients towards by scientific outcomes.
        </p>
        <p>
          As a first generation South Sudanese, I&rsquo;m also eager to work
          with multicultural athletes to showcase all the universal
          experience.
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach – ASCA Level 1",
      "Bachelor In High Performance Sports",
      "QSC Coach Volleyball",
      "QSC Coach Volleyball College",
    ],
    focus: [
      "Youth Athletic Development",
      "Strength and Power Development",
      "Injury Prevention and Recovery",
    ],
  },
  {
    img: "/image/Elite Coach/jacob.jpg",
    name: "JACOB ROSS NIESSEN",
    body: (
      <>
        <p>
          Jacob began his journey into sports from a very young age, straight
          into Baseball (he had a 4 legendary places, the first Australian to
          go play in the US Major League Recovery and a his MLB squad).
        </p>
        <p>
          The passion led him to complete a Bachelor in Exercise and Sports
          Science, and become a Strength &amp; Conditioning Coach.
        </p>
        <p>
          While still playing for the Brisbane Bandits, Jacob is part of the
          S&amp;C Team for the Australia Baseball Team.
        </p>
        <p>
          He is our &lsquo;overhead sports&rsquo; specialist as well as one of
          our most appreciated Youth S&amp;C coaches.
        </p>
      </>
    ),
    quals: [
      "Bachelor in Exercise and Sport Sciences",
      "QSC Team Australia Baseball",
      "QSC Coach Vibrators College",
    ],
    focus: [
      "Youth Athletic Development",
      "Rotational Power Development",
      "Shoulder Injury Prevention",
    ],
  },
];

export default async function OurTeamPage() {
  const site = await getSite();
  const trust = site.trust;

  return (
    <>
      <link rel="stylesheet" href="/css/our-team-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />
      <link rel="stylesheet" href="/css/athlete-programs-page.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about-us">About</Link>{" "}
            <span>/</span> Our Team
          </p>
          <h1>
            OUR <span className="accent">TEAM</span>
          </h1>
          <p className="lede">
            Members of ASCA and ESSA, with degrees and on-field expertise from
            Australia&apos;s leading high-performance institutions.
          </p>
        </div>
      </section>

      {/* INTRO — Train Like An Athlete */}
      <section className="ot-intro">
        <div className="container ot-intro-grid">
          <div className="ot-intro-media">
            <img
              src="/image/cdn/WA_1776648532015-2dd107.jpeg"
              alt="ATHLETIX team and athletes training"
            />
          </div>
          <div className="ot-intro-copy">
            <p className="ot-eyebrow">Train Like An Athlete</p>
            <h2 className="ot-h2">
              High-performance training,
              <br />
              <em>for everyone.</em>
            </h2>
            <p>
              ATHLETIX was founded with the vision of delivering{" "}
              <strong>high-performance training to everyone</strong>, not just
              elite athletes. We wanted to create an environment where training
              is backed by science and expert coaching, making athletic
              development accessible to all ages.
            </p>
            <p>
              What truly sets us apart is the level of expertise{" "}
              <strong>under one roof</strong>. All our{" "}
              <strong>Strength &amp; Conditioning Coaches</strong> hold degrees
              in Exercise and Sports Science or Exercise Physiology and are
              accredited through the <strong>ASCA</strong> (Australian Strength
              and Conditioning Association). They bring extensive experience
              working with youth and elite athletes across all sports.
            </p>
            <p>
              Additionally, our elite <strong>sports physios</strong> have
              worked with some of the most renowned teams in Australia,
              including the <strong>Reds</strong>, <strong>Brisbane Roar</strong>,
              and the <strong>AIS</strong> — ensuring that our members receive
              the highest quality care and guidance.
            </p>
          </div>
        </div>
      </section>

      {/* OUR COACHES HEADING */}
      <section className="ot-coaches-head">
        <div className="container">
          <p className="ot-eyebrow ot-eyebrow--center">Meet the Team</p>
          <h2 className="ot-h2 ot-h2--center">OUR COACHES</h2>
          <span className="ot-divider" />
        </div>
      </section>

      {/* COACH CARDS */}
      <section className="coaches">
        <div className="container">
          {COACHES.map((c) => (
            <article key={c.name} className="coach-card">
              <div className="coach-photo">
                <img src={c.img} alt={c.name} />
              </div>
              <div className="coach-body">
                <h3 className="coach-name">{c.name}</h3>
                {c.body}
                <h4 className="coach-sub">Qualifications/Achievements</h4>
                <ul className="coach-list">
                  {c.quals.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
                {c.focus && (
                  <>
                    <h4 className="coach-sub">Training Focus</h4>
                    <ul className="coach-list">
                      {c.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <div className="home-v2">
        <div className="trust-wrap">
          <div className="trust-inner">
            <h2 className="trust-h trust-h--solo">{trust.label}</h2>
            <div className="logo-row">
              {trust.logos.map((l, i) => (
                <div key={i} className="logo-pill">
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
