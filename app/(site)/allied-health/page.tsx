import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allied Health — ATHLETIX",
  description:
    "Sports physiotherapy, rehab and recovery integrated directly with your training program at Athletix Brisbane.",
};

export default function AlliedHealthPage() {
  return (
    <>
      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> Allied Health
          </p>
          <h1>
            ALLIED <span className="accent">HEALTH</span>
          </h1>
          <p className="lede">
            Sports physiotherapy, rehab and recovery — integrated directly with
            your training program, not bolted on afterwards.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <p className="lede">
            Our allied health team works in the same building, sees the same
            training data, and talks to your coach. The result: faster
            diagnosis, smarter return-to-train plans and fewer setbacks.
          </p>
          <div className="info-grid">
            {[
              {
                icon: "🏥",
                title: "Sports Physiotherapy",
                desc: "Hands-on assessment and treatment for injuries, niggles and pre-season screens.",
              },
              {
                icon: "🔁",
                title: "Return to Sport",
                desc: "Structured rehab progressions that bridge from clinic to floor to full performance.",
              },
              {
                icon: "📋",
                title: "Movement Screening",
                desc: "VALD ForceDecks and movement assessment to find weak links before they become injuries.",
              },
              {
                icon: "💪",
                title: "Exercise Physiology",
                desc: "Clinical exercise prescription for chronic conditions, recovery and longevity.",
              },
              {
                icon: "🧘",
                title: "Recovery & Mobility",
                desc: "Programmed mobility, soft tissue and recovery protocols to keep training uninterrupted.",
              },
              {
                icon: "📈",
                title: "Performance Testing",
                desc: "Force plates, jump and sprint profiling to track gains and identify asymmetries.",
              },
            ].map((c) => (
              <div key={c.title} className="info-card">
                <div className="icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">Book In</p>
          <h2>Train, recover, return — under one roof.</h2>
          <p className="lede">
            Whether you&apos;re rehabbing an injury or want to bullet-proof
            your body, our integrated team gets you back on the floor faster.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
