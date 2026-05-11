import Link from "next/link";
import type { Metadata } from "next";
import { getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team — ATHLETIX",
  description:
    "Members of ASCA and ESSA — meet the accredited S&C coaches, exercise physiologists and sports physiotherapists at Athletix Brisbane.",
};

export const dynamic = "force-dynamic";

export default async function OurTeamPage() {
  const team = await getTeam();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
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

      <section className="elite-coaches" style={{ paddingTop: "60px" }}>
        <div className="container">
          <div className="elite-coaches-grid">
            {team.map((c) => (
              <article key={c.id} className="elite-coach-card">
                <div className="elite-coach-photo">
                  <img src={c.image} alt={c.name} />
                </div>
                <div className="elite-coach-meta">
                  <p className="elite-role">{c.role}</p>
                  <h3>{c.displayName}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
