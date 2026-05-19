import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Youth Speed / Sprint Development Classes — ATHLETIX Gym",
  description:
    "Youth Speed Development (12–16 yrs). Learn the foundations of sprinting and acceleration with technical drills, physiological adaptations and injury-prevention work for court and field sports.",
};

export default function YouthSpeedDevelopmentPage() {
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
            <Link href="/youth-classes">Youth Classes</Link> <span>/</span>{" "}
            Youth Speed Development
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Cardio · Ages 12–16
            </p>
            <h1 className="yaf-title">Youth Speed Development</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              <strong>AGE GROUP: 12–16 years old</strong>
            </p>
            <p className="yaf-lead">
              Learn the foundations of sprinting and acceleration. Work on
              technical drills, develop physiological adaptations and
              injury-proof your body for any court and field sport.
            </p>
            <p className="yaf-lead">
              Our youth <strong>speed training class</strong> takes athletic
              performance to the next level, focusing on{" "}
              <strong>strength development, acceleration and agility</strong>{" "}
              — essential for rugby, AFL and soccer where speed and power are
              key, and for court sports like tennis, netball and basketball
              where agility wins games.
            </p>
            <p className="yaf-lead">
              Developing superior athleticism isn&apos;t just about winning. It
              builds confidence, self-discipline and mental toughness.{" "}
              <Link href="/contact-us">Book a 7 day trial</Link> or view more
              of our{" "}
              <Link href="/youth-classes">youth gym fitness classes here</Link>
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
              src="/image/cdn/youth-speed-development-hero.jpg"
              alt="Athletes sled pushing under the ATHLETIC DEVELOPMENT wall at ATHLETIX Brisbane"
              loading="lazy"
              width={2000}
              height={1333}
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
        sourceLabel="Youth Speed Development page"
        defaultClass="Youth Speed Development (12-16 yr)"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/youth-strength-isaac.jpg"
                alt="Isaac Corvo — Strength & Conditioning Coach"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Strength &amp; Conditioning Coach</p>
              <h3 className="yaf-coach-name">Isaac Corvo</h3>
              <p className="yaf-coach-bio">
                Isaac coaches the Youth Speed Development program at ATHLETIX,
                guiding athletes through sprint mechanics, acceleration work
                and the physiological qualities behind game-speed. His focus:
                build resilient, explosive young athletes who move with
                confidence on court and field.
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
