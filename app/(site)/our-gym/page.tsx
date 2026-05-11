import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Gym — ATHLETIX",
  description:
    "A purpose-built strength and conditioning facility in Fortitude Valley, Brisbane — designed around how athletes actually train.",
};

const features = [
  {
    icon: "⛓",
    title: "Lifting Platforms",
    desc: "Eight Olympic platforms with calibrated bumpers and mixed loading options.",
  },
  {
    icon: "⚡",
    title: "Sprint Track",
    desc: "Indoor 30m sprint lane with timing gates and force plates for objective measurement.",
  },
  {
    icon: "📊",
    title: "Force Plates",
    desc: "VALD ForceDecks for jump, landing and asymmetry profiling — included in athlete tier.",
  },
  {
    icon: "🌀",
    title: "Mobility Studio",
    desc: "Dedicated space for Pilates, mobility flows and warm-ups, away from the lifting floor.",
  },
  {
    icon: "🏥",
    title: "Allied Health Suite",
    desc: "Private rooms for physiotherapy and rehab — seamlessly integrated with your coaching team.",
  },
  {
    icon: "☕",
    title: "In-house Cafe",
    desc: "Refuel post-session with proper coffee and high-protein options without leaving the building.",
  },
];

const galleryImages = [
  "/image/671132158_18084950399576243_438399739749615748_n.heiclow.webp",
  "/image/652790960_18080497415576243_5969545006560046515_n.heiclow.webp",
  "/image/607718345_1795235724507459_1936522859625566512_nlow.webp",
  "/image/507904702_1813077742981167_7068029986108632745_nlow.webp",
  "/image/506356270_1850290438880885_6376136528084228693_n.heiclow.webp",
  "/image/504826122_1801023404182559_3046626601898411463_n.heiclow.webp",
  "/image/imgpsh_fullsize_anim-17-600x310.png",
];

export default function OurGymPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> Our Gym
          </p>
          <h1>
            OUR <span className="accent">GYM</span>
          </h1>
          <p className="lede">
            A purpose-built facility in Fortitude Valley designed around how
            athletes actually train — lift, sprint, recover, repeat.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <p className="lede">
            Every square metre of Athletix has been built around the way elite
            athletes train. From olympic platforms and force plates to a 30m
            sprint track and dedicated mobility studio, the floor is engineered
            for results.
          </p>
          <div className="info-grid">
            {features.map((f) => (
              <div key={f.title} className="info-card">
                <div className="icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The Floor</p>
            <h2>Inside Athletix.</h2>
          </div>
        </div>
        <div className="gallery-strip">
          {galleryImages.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
      </section>

      <section className="trial-cta">
        <div className="trial-media">
          <img
            src="/image/607446330_18072010325576243_3418190524375577855_n.heiclow.webp"
            alt="Athletix session"
          />
        </div>
        <div className="container trial-inner">
          <p className="eyebrow light">Visit Us</p>
          <h2>
            Come tour the floor.
            <br />
            <span className="accent">$7 for 7 days.</span>
          </h2>
          <p>
            Book a trial and experience the facility firsthand — fully
            refundable, all classes included.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Claim the Trial
          </Link>
        </div>
      </section>
    </>
  );
}
