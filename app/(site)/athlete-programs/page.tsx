import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Athlete Programs — ATHLETIX",
  description:
    "Elite programming for competitive athletes — sprint mechanics, speed, power, recovery and force-plate-driven testing at Athletix Brisbane.",
};

const included = [
  {
    num: "01",
    title: "Dedicated Coach",
    desc: "One accredited S&C coach owns your program — design, delivery and ongoing review.",
  },
  {
    num: "02",
    title: "Weekly 1-on-1",
    desc: "Personalised PT sessions to drive technique, load and recovery.",
  },
  {
    num: "03",
    title: "Force Plate Testing",
    desc: "Unlimited VALD ForceDecks tests for jump, landing and asymmetry profiling.",
  },
  {
    num: "04",
    title: "Sprint & Speed",
    desc: "Indoor 30m track with timing gates and high-speed video for stride and mechanics work.",
  },
  {
    num: "05",
    title: "Allied Health Linked",
    desc: "Direct collaboration with our sports physio and exercise physiology team.",
  },
  {
    num: "06",
    title: "Periodised Plan",
    desc: "Programming aligned to your sport calendar — pre-season, in-season and recovery blocks.",
  },
];

export default function AthleteProgramsPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link>{" "}
            <span>/</span> Athlete Programs
          </p>
          <h1>
            ATHLETE <span className="accent">PROGRAMS</span>
          </h1>
          <p className="lede">
            Elite programming for competitive athletes — sprint mechanics,
            speed, power, recovery and force-plate-driven testing.
          </p>
        </div>
      </section>

      <section className="manifesto">
        <div className="container manifesto-grid">
          <div className="manifesto-copy">
            <p className="eyebrow">For Competitive Athletes</p>
            <h2>
              Train where the <span className="accent">pros train.</span>
            </h2>
            <p>
              Our athlete program is built for serious competitors —
              representative-level juniors, elite-academy players and pros
              across AFL, NRL, cricket, basketball and athletics. Programming
              is fully individualised, periodised around your competition
              calendar and informed by VALD ForceDecks data.
            </p>
            <p>
              You get a dedicated coach, weekly 1-on-1 sessions, and integrated
              allied health support — all in a facility built around how
              athletes actually train.
            </p>
            <Link href="/contact" className="arrow-link">
              Apply for the program <span>→</span>
            </Link>
          </div>
          <div className="manifesto-image">
            <img
              src="/image/611674439_18073294733576243_5294314171202157854_n.heiclow.webp"
              alt="Athlete training at Athletix"
            />
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">What&apos;s Included</p>
          <h2>Inside the athlete tier.</h2>
          <div className="info-grid">
            {included.map((s) => (
              <div key={s.num} className="info-card">
                <div className="icon">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px" }}>
            <Link href="/membership" className="btn btn-primary btn-lg">
              View Athlete Tier
            </Link>
          </div>
        </div>
      </section>

      <TrialCTA />
    </>
  );
}
