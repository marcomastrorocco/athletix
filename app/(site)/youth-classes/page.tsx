import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Youth Classes — ATHLETIX",
  description:
    "Build confidence, coordination and strength for ages 8–17 in a safe, structured environment led by accredited S&C coaches.",
};

const skills = [
  {
    num: "01",
    title: "Movement Quality",
    desc: "Squat, hinge, push, pull, brace — foundations that protect young joints and unlock long-term strength.",
  },
  {
    num: "02",
    title: "Speed & Agility",
    desc: "Acceleration, deceleration and change-of-direction work for sports performance.",
  },
  {
    num: "03",
    title: "Strength Foundations",
    desc: "Age-appropriate loading with barbells and dumbbells, scaled to capacity.",
  },
  {
    num: "04",
    title: "Confidence & Mindset",
    desc: "Goal setting, effort, teamwork — the same traits that build great athletes and adults.",
  },
  {
    num: "05",
    title: "Conditioning",
    desc: "Aerobic and anaerobic work programmed to support the demands of school sport.",
  },
  {
    num: "06",
    title: "Mobility",
    desc: "Routines that keep growing bodies healthy and ready to train.",
  },
];

export default function YouthClassesPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link>{" "}
            <span>/</span> Youth Classes
          </p>
          <h1>
            YOUTH <span className="accent">CLASSES</span>
          </h1>
          <p className="lede">
            Build confidence, coordination and strength for ages 8–17 in a
            safe, structured environment led by accredited S&amp;C coaches.
          </p>
        </div>
      </section>

      <section className="manifesto">
        <div className="container manifesto-grid">
          <div className="manifesto-copy">
            <p className="eyebrow">Long-Term Athletic Development</p>
            <h2>
              The right foundation for{" "}
              <span className="accent">young athletes.</span>
            </h2>
            <p>
              Our youth program is designed around long-term athletic
              development — movement quality first, then load and intensity.
              Whether your child plays sport or just wants to feel strong and
              confident, we meet them where they are.
            </p>
            <p>
              Coaches with backgrounds in elite sport guide every session, and
              groups are kept small so every athlete gets eyes on their lifts
              and sprints.
            </p>
            <Link href="/contact" className="arrow-link">
              Book a trial <span>→</span>
            </Link>
          </div>
          <div className="manifesto-image">
            <img
              src="/image/655069589_18081771638576243_4509194880095364504_n.heiclow.webp"
              alt="Youth athletes training at Athletix"
            />
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">What&apos;s Included</p>
          <h2>Skills we develop.</h2>
          <div className="info-grid">
            {skills.map((s) => (
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
