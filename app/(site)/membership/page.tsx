import Link from "next/link";
import type { Metadata } from "next";
import { getMembershipCategories } from "@/lib/data";
import MembersTrusted from "@/components/MembersTrusted";

export const metadata: Metadata = {
  title: "Membership — ATHLETIX",
  description:
    "Adult, Youth, Family and Performance memberships at Athletix Brisbane. Choose the term and tier that match your goals.",
};

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
  const categories = await getMembershipCategories();

  return (
    <>
      <link rel="stylesheet" href="/css/membership-page.css" />

      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Membership
          </p>
          <h1>
            MEMBERSHIP <span className="accent">PLANS</span>
          </h1>
          <p className="lede">
            Choose the plan that matches your goals. Weekly billing, flexible
            upgrades, and full access to the facility.
          </p>
        </div>
      </section>

      {categories.map((cat, idx) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`mship-section${idx % 2 === 1 ? " alt" : ""}`}
        >
          <div className="container">
            <div className="mship-head">
              <h2>{cat.title.toUpperCase()}</h2>
              <div className="underline" />
            </div>

            <div
              className={`mship-grid${cat.plans.length === 3 ? " three" : ""}`}
            >
              {cat.plans.map((p) => (
                <article key={p.id} className="mship-card">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${p.image})` }}
                    role="img"
                    aria-label={`${cat.title} ${p.term}`}
                  />
                  <div className="body">
                    <p className="term">{p.term}</p>
                    <p className="price">
                      {p.price}
                      <small>{p.cycle}</small>
                    </p>
                    <p className="tagline">{p.tagline}</p>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    {p.enrollUrl ? (
                      <a
                        href={p.enrollUrl}
                        className="mship-enroll"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enroll now
                      </a>
                    ) : (
                      <Link href="/contact" className="mship-enroll">
                        Enroll now
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <p className="mship-blurb">{cat.blurb}</p>
          </div>
        </section>
      ))}

      <MembersTrusted />
    </>
  );
}
