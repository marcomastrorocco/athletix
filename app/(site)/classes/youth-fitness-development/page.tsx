import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import ClassBookSection from "@/components/ClassBookSection";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/classes/youth-fitness-development");
}

export default function YouthFitnessDevelopmentPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/youth-classes-page.css" />
      <link rel="stylesheet" href="/css/youth-agility-foundations-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/classes">Classes</Link> <span>/</span>{" "}
            <Link href="/youth-classes-2">Youth Classes</Link> <span>/</span>{" "}
            Youth Strength Development
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Strength · Ages 12–16
            </p>
            <h1 className="yaf-title">Youth Strength Development</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              <strong>AGE GROUP: 12 – 16</strong>
            </p>
            <p className="yaf-lead">
              This class takes teens through the foundations of strength and
              resistance training. A criteria-based approach by which our
              students develop competency and muscle tone, enhancing resilience
              for sports and posture. Your teens will learn to lift weights
              with sound technique, going through sequential training phases —
              all competency based.
            </p>
            <p className="yaf-lead">
              <Link href="/contact-us">Book a 7 day trial</Link> or view more
              of our{" "}
              <Link href="/youth-classes-2">youth gym fitness classes here</Link>
              .
            </p>
            <div className="yaf-hero-cta">
              <Link href="#book-form" className="btn btn-primary">
                Book a class
              </Link>
              <Link href="/class-timetable" className="btn btn-ghost">
                View timetable
              </Link>
            </div>
          </div>

          <div className="yaf-media">
            <img
              src="/image/cdn/youth-strength-development-hero.webp"
              alt="Teen athletes bench pressing under coach supervision at ATHLETIX Brisbane"
              loading="lazy"
              width={2000}
              height={900}
            />
            <span className="yaf-media-badge">Athletic Development</span>
          </div>
        </div>
      </section>

      <section className="yaf-info">
        <div className="container">
          <div className="yaf-info-grid">
            <article className="yaf-info-card">
              <span className="yaf-info-card-icon" aria-hidden="true">
                📍
              </span>
              <h3>Location</h3>
              <p>
                <a
                  href="https://goo.gl/maps/Nb2DQqvUifWCHuPt7"
                  target="_blank"
                  rel="noopener"
                >
                  42 Baxter Street
                  <br />
                  Fortitude Valley, QLD 4006
                </a>
              </p>
            </article>

            <article className="yaf-info-card yaf-info-card--hours">
              <span className="yaf-info-card-icon" aria-hidden="true">
                ⏱
              </span>
              <h3>Working hours</h3>
              <ul className="yaf-hours">
                <li>
                  <span className="yaf-day">Mon</span>
                  <span>6:00 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Tue</span>
                  <span>6:00 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Wed</span>
                  <span>5:15 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Thu</span>
                  <span>6:00 AM – 7:30 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Fri</span>
                  <span>5:15 AM – 6:00 PM</span>
                </li>
                <li>
                  <span className="yaf-day">Sat</span>
                  <span>6:00 AM – 11:00 AM</span>
                </li>
              </ul>
            </article>

            <article className="yaf-info-card">
              <span className="yaf-info-card-icon" aria-hidden="true">
                ☎
              </span>
              <h3>Contact</h3>
              <p>
                <a href="tel:0499981286">0499 981 286</a>
                <br />
                <a href="mailto:info@athletix.com.au">info@athletix.com.au</a>
              </p>
              <Link href="/contact-us" className="yaf-info-card-link">
                Get in touch →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <ClassBookSection
        sourceLabel="Youth Strength Development page"
        defaultClass="Youth Strength Development (12-16 yr)"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/youth-strength-isaac.jpg"
                alt="Isaac Corvo — Head Coach, Youth Strength Development"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Head Coach</p>
              <h3 className="yaf-coach-name">Isaac Corvo</h3>
              <p className="yaf-coach-bio">
                Isaac leads the Youth Strength Development program at ATHLETIX,
                guiding teens through a criteria-based pathway that builds
                technique, joint stability and confidence under the bar. His
                focus: long-term athletic development, safe progression and a
                strong foundation that supports every sport.
              </p>
              <div className="yaf-coach-links">
                <Link href="/our-team" className="btn btn-outline btn-sm">
                  Meet the team
                </Link>
                <Link href="/contact-us" className="btn btn-ghost btn-sm">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
