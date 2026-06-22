import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import { getTeam, getSite } from "@/lib/data";
import CoachSlider from "@/components/CoachSlider";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/our-team");
}

export const dynamic = "force-dynamic";

export default async function OurTeamPage() {
  const [team, site] = await Promise.all([getTeam(), getSite()]);
  const trust = site.trust;

  return (
    <>
      <link rel="stylesheet" href="/css/our-team-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about-us">About</Link>{" "}
            <span>/</span> Our Team
          </p>
          <h1>
            OUR <span className="accent">TEAM</span>
          </h1>
          <p className="lede">
            Members of ASCA and ESSA, with degrees and on-field expertise from
            Australia&apos;s leading high-performance institutions.
          </p>
        </div>
      </section>

      {/* INTRO — Train Like An Athlete */}
      <section className="ot-intro">
        <div className="container ot-intro-grid">
          <div className="ot-intro-media">
            <img
              src="/image/cdn/WA_1776648532015-2dd107.jpeg"
              alt="ATHLETIX team and athletes training"
            />
          </div>
          <div className="ot-intro-copy">
            <p className="ot-eyebrow">Train Like An Athlete</p>
            <h2 className="ot-h2">
              High-performance training,
              <br />
              <em>for everyone.</em>
            </h2>
            <p>
              ATHLETIX was founded with the vision of delivering{" "}
              <strong>high-performance training to everyone</strong>, not just
              elite athletes. We wanted to create an environment where training
              is backed by science and expert coaching, making athletic
              development accessible to all ages.
            </p>
            <p>
              What truly sets us apart is the level of expertise{" "}
              <strong>under one roof</strong>. All our{" "}
              <strong>Strength &amp; Conditioning Coaches</strong> hold degrees
              in Exercise and Sports Science or Exercise Physiology and are
              accredited through the <strong>ASCA</strong> (Australian Strength
              and Conditioning Association). They bring extensive experience
              working with youth and elite athletes across all sports.
            </p>
            <p>
              Additionally, our elite <strong>sports physios</strong> have
              worked with some of the most renowned teams in Australia,
              including the <strong>Reds</strong>, <strong>Brisbane Roar</strong>,
              and the <strong>AIS</strong> — ensuring that our members receive
              the highest quality care and guidance.
            </p>
          </div>
        </div>
      </section>

      {/* OUR COACHES HEADING */}
      <section className="ot-coaches-head">
        <div className="container">
          <p className="ot-eyebrow ot-eyebrow--center">Meet the Team</p>
          <h2 className="ot-h2 ot-h2--center">OUR COACHES</h2>
          <span className="ot-divider" />
        </div>
      </section>

      {/* COACH SLIDER */}
      <section className="ot-coaches">
        <div className="container">
          <CoachSlider coaches={team} />
        </div>
      </section>

      {/* TRUSTED BY */}
      <div className="home-v2">
        <div className="trust-wrap">
          <div className="trust-inner">
            <h2 className="trust-h trust-h--solo">{trust.label}</h2>
            <div className="logo-row">
              {trust.logos.map((l, i) => (
                <div key={i} className="logo-pill">
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
