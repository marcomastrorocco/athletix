import Link from "next/link";
import type { Metadata } from "next";
import TrialForm from "@/components/TrialForm";
import { getSite } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us — ATHLETIX",
  description:
    "Book a trial, ask a question or visit Athletix at 42 Baxter Street, Fortitude Valley, Brisbane.",
};

export const dynamic = "force-dynamic";

const phoneHref = (p: string) => `tel:+${p.replace(/[^\d]/g, "")}`;
const mapHref = (a: string) =>
  `https://maps.google.com/?q=${encodeURIComponent(a)}`;

export default async function ContactPage() {
  const site = await getSite();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Contact Us
          </p>
          <h1>
            GET IN <span className="accent">TOUCH</span>
          </h1>
          <p className="lede">
            Book a trial, ask a question or come visit the floor at{" "}
            {site.contact.address}.
          </p>
        </div>
      </section>

      <section className="contact" style={{ paddingTop: "60px" }}>
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Visit Us</p>
            <h2>
              Fortitude Valley,
              <br />
              Brisbane.
            </h2>
            <ul className="contact-list">
              <li>
                <span className="label">Address</span>
                <a
                  href={mapHref(site.contact.address)}
                  target="_blank"
                  rel="noopener"
                >
                  {site.contact.address}
                </a>
              </li>
              <li>
                <span className="label">Phone</span>
                <a href={phoneHref(site.contact.phone)}>{site.contact.phone}</a>
              </li>
              <li>
                <span className="label">Email</span>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
            </ul>
            <div className="areas">
              <p className="label">Serving the areas of</p>
              <p>{site.contact.areas}</p>
            </div>
          </div>

          <TrialForm />
        </div>
      </section>
    </>
  );
}
