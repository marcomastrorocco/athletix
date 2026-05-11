import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Adult Classes — ATHLETIX",
  description:
    "Small group adult classes focused on strength, conditioning and longevity at Athletix Brisbane. Scaled to any level, led by elite S&C coaches.",
};

const types = [
  {
    num: "01",
    title: "LIFT",
    desc: "Barbell-focused strength sessions. Periodised programming, calibrated platforms, individual coaching.",
  },
  {
    num: "02",
    title: "STRENGTH & CON",
    desc: "The hybrid session — strength followed by metabolic conditioning. Build muscle and engine in one.",
  },
  {
    num: "03",
    title: "MET-CON",
    desc: "Metabolic conditioning circuits for aerobic capacity and anaerobic power.",
  },
  {
    num: "04",
    title: "HIT — PUSH & DRAG",
    desc: "High-intensity sled, prowler and carry work for full-body conditioning.",
  },
  {
    num: "05",
    title: "MAT PILATES",
    desc: "Core control, breath work and precision movement to complement heavy training.",
  },
  {
    num: "06",
    title: "MOBILITY",
    desc: "Structured mobility flows to keep joints healthy and training uninterrupted.",
  },
];

export default function AdultClassesPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link>{" "}
            <span>/</span> Adult Classes
          </p>
          <h1>
            ADULT <span className="accent">CLASSES</span>
          </h1>
          <p className="lede">
            Small group sessions focused on strength, conditioning and
            longevity — scaled to any level, led by elite S&amp;C coaches.
          </p>
        </div>
      </section>

      <section className="manifesto">
        <div className="container manifesto-grid">
          <div className="manifesto-copy">
            <p className="eyebrow">For Every Stage</p>
            <h2>
              Train like an athlete —{" "}
              <span className="accent">no athlete CV required.</span>
            </h2>
            <p>
              You don&apos;t have to be a pro to train like one. Our adult
              classes blend strength, conditioning and recovery in 45-minute
              sessions designed for busy lives. Every movement is scaled to
              your level, every session is coached.
            </p>
            <p>
              Whether you&apos;re returning to training after years away,
              chasing a first chin-up, or building toward a marathon —
              we&apos;ve got a program for it.
            </p>
            <Link href="/contact" className="arrow-link">
              Book a trial <span>→</span>
            </Link>
          </div>
          <div className="manifesto-image">
            <img
              src="/image/655999801_18082504529576243_2819247282825672017_n.heiclow.webp"
              alt="Adults training at Athletix"
            />
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">Class Types</p>
          <h2>Pick the session that fits.</h2>
          <div className="info-grid">
            {types.map((s) => (
              <div key={s.num} className="info-card">
                <div className="icon">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrialCTA />
    </>
  );
}
