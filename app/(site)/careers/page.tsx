import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — ATHLETIX",
  description:
    "Coach, intern or grow with Athletix. Roles for accredited S&C coaches, sports physiotherapists, exercise physiologists and university placement students.",
};

const jobs = [
  {
    title: "Strength & Conditioning Coach",
    tags: ["Full-time", "Fortitude Valley", "ASCA accredited"],
  },
  {
    title: "Sports Physiotherapist",
    tags: ["Part-time / Full-time", "AHPRA registered"],
  },
  {
    title: "Exercise Physiologist",
    tags: ["Casual", "ESSA accredited"],
  },
  {
    title: "University Placement / Internship",
    tags: ["Unpaid", "Sport & Exercise Science students"],
  },
];

const reasons = [
  {
    icon: "📈",
    title: "Real Athletes",
    desc: "Work alongside resident pro athletes from AFL, NRL, cricket and basketball.",
  },
  {
    icon: "🎓",
    title: "Mentorship",
    desc: "Weekly programming reviews, video feedback and CPD opportunities built in.",
  },
  {
    icon: "🛠",
    title: "Best-in-Class Tools",
    desc: "VALD ForceDecks, timing gates, contemporary lifting platforms and more.",
  },
  {
    icon: "🌱",
    title: "Career Growth",
    desc: "Clear pathway from intern → coach → senior coach with skill milestones.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> Careers
          </p>
          <h1>
            JOIN <span className="accent">THE TEAM</span>
          </h1>
          <p className="lede">
            Coach the next generation, work alongside professional athletes and
            develop in one of Australia&apos;s leading high-performance
            facilities.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <p className="eyebrow">Open Roles</p>
          <h2>Current openings.</h2>
          <div className="job-list">
            {jobs.map((j) => (
              <div key={j.title} className="job-card">
                <div>
                  <h3>{j.title}</h3>
                  <p className="tags">
                    {j.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                </div>
                <Link href="/contact" className="btn btn-primary">
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">Why Athletix</p>
          <h2>What you get on the floor.</h2>
          <div className="info-grid">
            {reasons.map((r) => (
              <div key={r.title} className="info-card">
                <div className="icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
