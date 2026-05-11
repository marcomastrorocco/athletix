import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Family Classes — ATHLETIX",
  description:
    "Family classes at Athletix Brisbane — train side-by-side with the people who matter most. Fun, challenging, scaled for every age.",
};

const expect = [
  {
    num: "01",
    title: "All Ages Welcome",
    desc: "Designed for parents and children training together — movements scaled per athlete.",
  },
  {
    num: "02",
    title: "Strength & Movement",
    desc: "Foundational lifts, sprint mechanics and conditioning — the basics done right.",
  },
  {
    num: "03",
    title: "Coached Every Rep",
    desc: "Two coaches on the floor so everyone gets eyes on their technique.",
  },
  {
    num: "04",
    title: "Family Membership",
    desc: "One simple weekly rate for the whole family — unlimited classes, all areas.",
  },
];

export default function FamilyClassesPage() {
  return (
    <>
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
          <p className="lede">
            Train side-by-side with the people who matter most. Fun,
            challenging, and built for all ages and abilities.
          </p>
        </div>
      </section>

      <section className="manifesto">
        <div className="container manifesto-grid">
          <div className="manifesto-copy">
            <p className="eyebrow">Train Together</p>
            <h2>
              Healthy habits start <span className="accent">at home.</span>
            </h2>
            <p>
              Our family classes bring parents and kids onto the floor
              together. Coaches scale every movement so the 12-year-old and
              the 42-year-old are both training at the right intensity —
              safely and effectively.
            </p>
            <p>
              It&apos;s the easiest way to model strong, active habits and
              turn training into something the whole family looks forward to.
            </p>
            <Link href="/contact" className="arrow-link">
              Book a trial <span>→</span>
            </Link>
          </div>
          <div className="manifesto-image">
            <img
              src="/image/642727599_18079185779576243_9169579771430841118_n.heiclow.webp"
              alt="Family training together at Athletix"
            />
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">What To Expect</p>
          <h2>How family sessions work.</h2>
          <div className="info-grid">
            {expect.map((s) => (
              <div key={s.num} className="info-card">
                <div className="icon">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px" }}>
            <Link href="/membership" className="btn btn-primary btn-lg">
              View Family Membership
            </Link>
          </div>
        </div>
      </section>

      <TrialCTA />
    </>
  );
}
