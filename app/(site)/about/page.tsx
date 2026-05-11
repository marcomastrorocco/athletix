import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — ATHLETIX | Brisbane Strength & Conditioning",
  description:
    "Athletix is an elite athletic development centre in Fortitude Valley, Brisbane. Meet the team and the philosophy behind the floor.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> About Us
          </p>
          <h1>
            ABOUT <span className="accent">ATHLETIX</span>
          </h1>
          <p className="lede">
            Teamwork combined with science is the secret that makes common
            people achieve uncommon results.
          </p>
        </div>
      </section>

      <section className="manifesto">
        <div className="container manifesto-grid">
          <div className="manifesto-copy">
            <p className="eyebrow">Our Story</p>
            <h2>
              An elite athletic development centre in{" "}
              <span className="accent">Fortitude Valley.</span>
            </h2>
            <p>
              Athletix was founded to bring elite strength &amp; conditioning
              to everyday Brisbane. Whether you&apos;re chasing a podium or
              your first pull-up, our coaches use data-driven programming
              built on the same principles that shape professional sport.
            </p>
            <p>
              We&apos;re a Fitness and Athletic development centre with S&amp;C
              coaches, sports physiotherapy and rehab, plus an in-house cafe —
              all under one roof.
            </p>
            <Link href="/our-team" className="arrow-link">
              Meet the team <span>→</span>
            </Link>
          </div>
          <div className="manifesto-image">
            <img
              src="/image/607718345_1795235724507459_1936522859625566512_nlow.webp"
              alt="Inside the Athletix facility"
            />
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <p className="eyebrow">Explore</p>
          <h2>Get to know us.</h2>
          <div className="info-grid">
            {[
              {
                href: "/our-gym",
                num: "01",
                title: "Our Gym",
                desc: "A purpose-built facility with force plates, lifting platforms, sprint track and recovery zone.",
              },
              {
                href: "/our-team",
                num: "02",
                title: "Our Team",
                desc: "Accredited S&C coaches, exercise physiologists and sports physiotherapists.",
              },
              {
                href: "/allied-health",
                num: "03",
                title: "Allied Health",
                desc: "Sports physiotherapy and rehab integrated directly into your training plan.",
              },
              {
                href: "/ndis-program",
                num: "04",
                title: "NDIS Program",
                desc: "Tailored movement and strength programs delivered with care by qualified professionals.",
              },
              {
                href: "/careers",
                num: "05",
                title: "Careers",
                desc: "Coach, intern or grow with us. Roles for accredited professionals and students.",
              },
            ].map((c) => (
              <Link
                key={c.num}
                className="info-card"
                href={c.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="icon">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div>
            <strong>4+</strong>
            <span>Years of elite coaching</span>
          </div>
          <div>
            <strong>20</strong>
            <span>Resident athletes welcomed in 2025</span>
          </div>
          <div>
            <strong>200+</strong>
            <span>University placement students since 2021</span>
          </div>
          <div>
            <strong>9</strong>
            <span>Professional sporting partners</span>
          </div>
        </div>
      </section>
    </>
  );
}
