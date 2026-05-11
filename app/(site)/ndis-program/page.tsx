import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS Program — ATHLETIX",
  description:
    "Tailored movement, strength and conditioning programs for NDIS participants in Brisbane — delivered with care by qualified professionals.",
};

const benefits = [
  {
    icon: "👥",
    title: "1-on-1 Sessions",
    desc: "Personalised programming with an exercise physiologist or accredited S&C coach.",
  },
  {
    icon: "🤝",
    title: "Small Group",
    desc: "Supported group settings to build confidence, social connection and consistency.",
  },
  {
    icon: "📝",
    title: "Goal-based Plans",
    desc: "Outcomes mapped to your NDIS plan and reported back to your support coordinator.",
  },
  {
    icon: "🏥",
    title: "Allied Health Linked",
    desc: "Direct integration with our physiotherapy team for end-to-end care.",
  },
  {
    icon: "📋",
    title: "Plan & Self-Managed",
    desc: "We invoice plan managers directly or provide invoices for self-managed participants.",
  },
  {
    icon: "♿",
    title: "Inclusive Facility",
    desc: "Accessible space and equipment with experienced, empathetic coaches.",
  },
];

const steps = [
  {
    icon: "1",
    title: "Get in touch",
    desc: "Send your plan details and goals via the contact form or email.",
  },
  {
    icon: "2",
    title: "Initial consult",
    desc: "We meet, assess capacity and design a program around your support plan.",
  },
  {
    icon: "3",
    title: "Start training",
    desc: "Begin sessions with progress reports for you and your coordinator.",
  },
];

export default function NdisPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> NDIS Program
          </p>
          <h1>
            NDIS <span className="accent">PROGRAM</span>
          </h1>
          <p className="lede">
            Tailored movement, strength and conditioning programs for NDIS
            participants — delivered with care by qualified professionals.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <p className="lede">
            We work with self-managed and plan-managed participants to deliver
            structured exercise programs in a fully equipped, professional
            environment. Sessions are designed around your goals, capacity and
            support plan.
          </p>
          <div className="info-grid">
            {benefits.map((b) => (
              <div key={b.title} className="info-card">
                <div className="icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">How To Start</p>
          <h2>Three steps to your first session.</h2>
          <div className="info-grid">
            {steps.map((s) => (
              <div key={s.title} className="info-card">
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px" }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Enquire About NDIS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
