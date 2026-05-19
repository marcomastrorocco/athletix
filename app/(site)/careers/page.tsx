import Link from "next/link";
import type { Metadata } from "next";
import CareerForm from "@/components/CareerForm";

export const metadata: Metadata = {
  title: "Careers — ATHLETIX",
  description:
    "Coach, intern or grow with ATHLETIX. Roles for accredited S&C coaches, sports physiotherapists, exercise physiologists and university placement students in Brisbane.",
};

type Job = {
  title: string;
  type: string;
  icon: string;
  desc: string;
  tags: string[];
};

const JOBS: Job[] = [
  {
    title: "Strength & Conditioning Coach",
    type: "Full-time",
    icon: "🏋️",
    desc: "Run programmed S&C sessions across youth, adult and athlete groups. Coach on the gym floor, sprint track and turf — and contribute to one of Brisbane's busiest performance rosters.",
    tags: ["Fortitude Valley", "ASCA accredited", "Group + 1-on-1"],
  },
  {
    title: "Sports Physiotherapist",
    type: "Part / Full-time",
    icon: "🩺",
    desc: "Join our in-house sports physio team. Diagnose, treat and rehabilitate alongside our S&C and exercise physiology staff — same building, same athletes.",
    tags: ["AHPRA registered", "Sports-physio experience", "Clinic + gym floor"],
  },
  {
    title: "Exercise Physiologist",
    type: "Casual",
    icon: "📋",
    desc: "Work with NDIS, DVA and chronic-condition clients to deliver structured, individualised exercise programs. Plenty of scope to grow your caseload.",
    tags: ["ESSA accredited", "NDIS / DVA experience welcome"],
  },
  {
    title: "University Placement / Internship",
    type: "Unpaid",
    icon: "🎓",
    desc: "Final-year and postgrad Sport & Exercise Science students embed with our coaching team for hands-on programming, testing and floor experience.",
    tags: ["Sport / Exercise Science", "Sem 1 + Sem 2 intakes"],
  },
];

const PERKS = [
  {
    icon: "🏆",
    title: "Real Athletes",
    desc: "Work alongside pro athletes from AFL, NRL, cricket, basketball and Olympic programs.",
  },
  {
    icon: "🎯",
    title: "Mentorship Built-In",
    desc: "Weekly programming reviews, video feedback and structured CPD time as part of the role.",
  },
  {
    icon: "🛠",
    title: "Best-in-Class Tools",
    desc: "VALD ForceDecks, timing gates, force plates, contemporary platforms and a 20m sprint track.",
  },
  {
    icon: "🌱",
    title: "Career Growth",
    desc: "Clear pathway from intern → coach → senior coach with defined skill milestones and reviews.",
  },
];

const ROLE_SLUG: Record<string, string> = {
  "Strength & Conditioning Coach": "Strength%20%26%20Conditioning%20Coach",
  "Sports Physiotherapist": "Sports%20Physiotherapist",
  "Exercise Physiologist": "Exercise%20Physiologist",
  "University Placement / Internship":
    "University%20Placement%20%2F%20Internship",
};

export default function CareersPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/careers-page.css" />

      <section className="page-banner page-banner--compact">
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

      {/* INTRO — story + perks */}
      <section className="cr-intro">
        <div className="container cr-intro-grid">
          <div className="cr-intro-copy">
            <p className="cr-eyebrow">Why Athletix</p>
            <h2 className="cr-h2">
              Train athletes, <em>grow as a coach.</em>
            </h2>
            <p>
              We&apos;re building a team of accredited coaches, physios and
              exercise physiologists who genuinely love sport, science and
              coaching people well. If that sounds like you, we&apos;d love to
              hear from you — even if a role isn&apos;t currently listed.
            </p>
            <p>
              ATHLETIX is the home of Brisbane&apos;s most engaged athletic
              community: pro athletes, youth squads, NDIS participants and
              everyday members training side-by-side under the same standard.
            </p>

            <div className="cr-stats">
              <div className="cr-stat">
                <span className="cr-stat-num">8+</span>
                <span className="cr-stat-label">Coaches</span>
              </div>
              <div className="cr-stat">
                <span className="cr-stat-num">25y</span>
                <span className="cr-stat-label">Combined Exp.</span>
              </div>
              <div className="cr-stat">
                <span className="cr-stat-num">100%</span>
                <span className="cr-stat-label">Accredited</span>
              </div>
            </div>
          </div>

          <div className="cr-perks">
            {PERKS.map((p) => (
              <article key={p.title} className="cr-perk">
                <span className="cr-perk-icon">{p.icon}</span>
                <div>
                  <h3 className="cr-perk-title">{p.title}</h3>
                  <p className="cr-perk-desc">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="cr-jobs">
        <div className="container">
          <div className="cr-jobs-head">
            <p className="cr-eyebrow cr-eyebrow--center">Open Roles</p>
            <h2 className="cr-h2 cr-h2--center">
              Current <em>openings.</em>
            </h2>
            <span className="cr-divider" />
          </div>

          <div className="cr-jobs-grid">
            {JOBS.map((j) => (
              <article key={j.title} className="cr-job">
                <div className="cr-job-top">
                  <span className="cr-job-type">{j.type}</span>
                  <span className="cr-job-icon" aria-hidden="true">
                    {j.icon}
                  </span>
                </div>
                <h3 className="cr-job-title">{j.title}</h3>
                <p className="cr-job-desc">{j.desc}</p>
                <ul className="cr-job-tags">
                  {j.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a
                  href={`#apply?role=${ROLE_SLUG[j.title] ?? ""}`}
                  className="cr-job-cta"
                >
                  Apply for this role
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section className="cr-apply" id="apply">
        <div className="container cr-apply-grid">
          <aside className="cr-apply-copy">
            <p className="cr-eyebrow">Apply</p>
            <h2 className="cr-h2">
              Send us your <em>application.</em>
            </h2>
            <p>
              Fill in the form — the head coach reads every application
              personally. We get back to suitable applicants within a few
              working days.
            </p>
            <ul className="cr-apply-list">
              <li>Don&apos;t see your exact role? Apply anyway — we hire
                year-round.</li>
              <li>Students &amp; new grads welcome via placement / internship.
              </li>
              <li>Tell us about your sport background — it always counts.</li>
            </ul>
          </aside>
          <CareerForm />
        </div>
      </section>
    </>
  );
}
