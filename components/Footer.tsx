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
            <a
              href="https://www.instagram.com/athletix_gym/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/ATHLETIX.BRISBANE/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCy1b8l1wpqf0lqD7wC6Qd7w"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/athletixgym/?originalSubdomain=au"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href="https://x.com/athletix_gym"
              aria-label="X (formerly Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
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
