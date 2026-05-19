import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "Youth Speed & Agility Training Classes — ATHLETIX Gym",
  description:
    "Youth Agility Development (12–16 yrs). Plyometrics, change of direction and injury-prevention drills for team-sport athletes — cricket, rugby, soccer, netball and more.",
};

export default function YouthAgilityDevelopmentPage() {
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
            Youth Agility Development
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Conditioning · Ages 12–16
            </p>
            <h1 className="yaf-title">Youth Agility Development</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              <strong>AGE GROUP: 12–16 years old</strong>
            </p>
            <p className="yaf-lead">
              Perfectly suited speed and agility development program if your
              child plays team (court/field) sports — including cricket,
              soccer, netball and rugby — where conditioning and speed and
              agility matters.
            </p>
            <p className="yaf-lead">
              With our agility development classes, kids learn to move faster
              with confidence! Plyometrics, change of direction and
              injury-prevention drills — everything needed to bulletproof the
              body and let your kids enjoy sports games and competitions.{" "}
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
              src="/image/cdn/youth-agility-foundations-hero.jpg"
              alt="Youth athletes training at ATHLETIX Athletic Development gym"
              loading="lazy"
              width={2000}
              height={925}
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
        sourceLabel="Youth Agility Development page"
        defaultClass="Youth Agility Development (12-16 yr)"
      />

      <section className="yaf-coach">
        <div className="container">
          <h2>Class coach</h2>
          <div className="yaf-coach-card">
            <div className="yaf-coach-image">
              <img
                src="/image/cdn/youth-agility-marco-f2b0da.jpg"
                alt="Marco Mastrorocco — Head Coach"
                loading="lazy"
                width={320}
                height={400}
              />
            </div>
            <div className="yaf-coach-info">
              <p className="yaf-coach-eyebrow">Head Coach</p>
              <h3 className="yaf-coach-name">Marco Mastrorocco</h3>
              <p className="yaf-coach-bio">
                Marco is highly dedicated to enhancing physical development in
                youth and optimising performance in athletes. He currently
                serves as the Head of Performance for Cricket Italy and is an
                S&C consultant for Queensland Cricket.
              </p>
              <div className="yaf-coach-links">
                <Link
                  href="https://www.linkedin.com/in/marco-mastrorocco-14093b104/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  LinkedIn
                </Link>
                <Link href="/our-team" className="btn btn-ghost btn-sm">
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
