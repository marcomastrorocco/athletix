import Link from "next/link";
import { getSite } from "@/lib/data";

const phoneHref = (p: string) => `tel:+${p.replace(/[^\d]/g, "")}`;

function splitAddress(addr: string): [string, string] {
  const parts = addr.split(",").map((s) => s.trim());
  if (parts.length < 2) return [addr, ""];
  return [parts[0], parts.slice(1).join(", ")];
}

export default async function Footer() {
  const site = await getSite();
  const year = new Date().getFullYear();
  const [line1, line2] = splitAddress(site.contact.address);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/image/athlethix-logo.png" alt="Athletix" />
          <p>
            Elite strength and conditioning in the heart of Brisbane. Train with
            coaches the pros train with.
          </p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/classes">Classes</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/timetable">Timetable</Link>
          <Link href="/our-team">Team</Link>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <p>
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </p>
          <a href={phoneHref(site.contact.phone)}>{site.contact.phone}</a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </div>
        <div className="footer-col">
          <h4>Follow</h4>
          <div className="socials">
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="Facebook">
              FB
            </a>
            <a href="#" aria-label="YouTube">
              YT
            </a>
            <a href="#" aria-label="LinkedIn">
              IN
            </a>
            <a href="#" aria-label="Twitter">
              TW
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {year} Athletix Pty Ltd · ABN 73 647 279 285</p>
          <p className="links">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
            <Link href="/seo-dashboard">SEO Dashboard</Link>
            <Link href="/admin">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
