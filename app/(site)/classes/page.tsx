import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Classes — ATHLETIX",
  description:
    "From your first session to elite performance work — small group classes scaled to every age, ability and goal at Athletix Brisbane.",
};

const classes = [
  {
    img: "/image/655069589_18081771638576243_4509194880095364504_n.heiclow.webp",
    alt: "Youth class",
    title: "Youth Classes",
    desc: "Build confidence, coordination and strength for ages 8–17 in a safe, structured environment.",
  },
  {
    img: "/image/655999801_18082504529576243_2819247282825672017_n.heiclow.webp",
    alt: "Adult class",
    title: "Adult Classes",
    desc: "Small group sessions focused on strength, conditioning and longevity — scaled to any level.",
  },
  {
    img: "/image/642727599_18079185779576243_9169579771430841118_n.heiclow.webp",
    alt: "Family class",
    title: "Family Classes",
    desc: "Train side-by-side with the people who matter most. Fun, challenging, and built for all ages.",
  },
  {
    img: "/image/611674439_18073294733576243_5294314171202157854_n.heiclow.webp",
    alt: "Athlete program",
    title: "Athlete Programs",
    desc: "Elite programming for competitive athletes — sprint mechanics, speed, power and recovery.",
  },
];

const programs = [
  {
    num: "01",
    title: "Strength Training",
    desc: "Progressive overload, perfected. Barbell fundamentals through advanced periodisation.",
  },
  {
    num: "02",
    title: "Speed & Agility",
    desc: "Acceleration, deceleration and change of direction work built around your sport.",
  },
  {
    num: "03",
    title: "Conditioning",
    desc: "Aerobic capacity, anaerobic power — measured, programmed and progressed every session.",
  },
  {
    num: "04",
    title: "Sprint Mechanics",
    desc: "Drills and video feedback refine stride, posture and ground contact for faster times.",
  },
  {
    num: "05",
    title: "Pilates",
    desc: "Core control, breath work and precision movement to complement heavy training.",
  },
  {
    num: "06",
    title: "Mobility",
    desc: "Structured routines that keep joints healthy and training uninterrupted for the long haul.",
  },
  {
    num: "07",
    title: "Allied Health",
    desc: "Sports physiotherapy and rehab integrated directly with your coaching team.",
  },
  {
    num: "08",
    title: "NDIS Program",
    desc: "Tailored movement and strength programs delivered with care by qualified professionals.",
  },
];

export default function ClassesPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Classes
          </p>
          <h1>
            OUR <span className="accent">CLASSES</span>
          </h1>
          <p className="lede">
            From your very first session to elite performance work — small
            group classes scaled to every age, ability and goal.
          </p>
        </div>
      </section>

      <section className="classes" style={{ paddingTop: "60px" }}>
        <div className="container">
          <div className="class-grid">
            {classes.map((c) => (
              <article key={c.title} className="class-card">
                <img src={c.img} alt={c.alt} />
                <div className="class-card-body">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <Link href="/contact" className="arrow-link">
                    Book a trial <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="programs">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Specialisations</p>
            <h2>Every discipline under one roof.</h2>
          </div>
          <div className="program-grid">
            {programs.map((p) => (
              <div key={p.num} className="program">
                <span className="num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrialCTA />
    </>
  );
}
