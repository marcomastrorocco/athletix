import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — ATHLETIX Brisbane",
  description:
    "Founded in 2021 by Marco Mastrorocco and Jovan Vucetic, ATHLETIX is on a mission to become the number one private high-performance facility in Australia.",
};

type Coach = {
  name: string;
  role: string;
  img: string;
  tags: string[];
};

const COACHES: Coach[] = [
  {
    name: "Marco Mastrorocco",
    role: "Director of Athletic Performance",
    img: "https://athletix.com.au/wp-content/uploads/2021/07/IMG_5921-scaled-e1723499457589.jpeg",
    tags: ["ASCA L2", "ESSA", "Youth Dev", "Founder"],
  },
  {
    name: "Reza Sharifian",
    role: "Head Coach",
    img: "https://athletix.com.au/wp-content/uploads/2023/05/IMG_9109-scaled-e1684449065529.jpg",
    tags: ["ASCA", "ESSA", "Performance"],
  },
  {
    name: "Sam Mulherin",
    role: "S&C Coach",
    img: "https://athletix.com.au/wp-content/uploads/2025/08/1000133313-1-e1759098729912.jpg",
    tags: ["ASCA", "ESSA", "Athlete Dev"],
  },
  {
    name: "Ritti Kagi",
    role: "S&C Coach",
    img: "https://athletix.com.au/wp-content/uploads/2023/05/IMG_9049-scaled-e1684450928402.jpg",
    tags: ["ASCA", "Speed", "Agility"],
  },
  {
    name: "Sam Kwong",
    role: "S&C Coach",
    img: "https://athletix.com.au/wp-content/uploads/2026/04/20260319_123309-scaled-e1775810245164.jpg",
    tags: ["UQ Honours", "AFL", "Youth"],
  },
  {
    name: "David Lawrence",
    role: "Exercise Physiologist",
    img: "https://athletix.com.au/wp-content/uploads/2023/05/IMG_0147-e1685322267891.jpg",
    tags: ["ESSA", "NDIS", "Clinical"],
  },
  {
    name: "Sasha Cochrane",
    role: "S&C Coach",
    img: "https://athletix.com.au/wp-content/uploads/2024/08/DSC06038-scaled-e1723499280792.jpg",
    tags: ["ASCA", "ESSA", "Mobility"],
  },
  {
    name: "Toby Wallis",
    role: "S&C Coach",
    img: "https://athletix.com.au/wp-content/uploads/2026/04/20260320_144026-scaled-e1775810315378.jpg",
    tags: ["ASCA", "AFL", "Rugby"],
  },
];

export default function AboutPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/home-v2.css" />
      <link rel="stylesheet" href="/css/about-page.css" />

      <section className="page-banner page-banner--about">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> About Us
          </p>
          <h1>
            ABOUT <span className="accent">US</span>
          </h1>
          <p className="lede">
            An elite athletic development centre in Fortitude Valley, built on
            evidence-based coaching and a passion for long-term athletic
            development.
          </p>
        </div>
      </section>

      <section className="about-why">
        <div className="container about-narrow">
          <p className="about-eyebrow">Our Story</p>
          <h2 className="about-h2-center">WHY ATHLETIX?</h2>
          <p className="about-why-lede">
            Hear from our founders on why we built ATHLETIX and the mission
            that drives every coach on the floor.
          </p>
          <div className="about-video">
            <iframe
              src="https://www.youtube.com/embed/GoBd8nAO650"
              title="Why Athletix Exists?"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="about-body">
        <div className="container about-narrow">
          <article className="about-block">
            <span className="about-num">01</span>
            <div className="about-block-body">
              <h3 className="about-block-title">Train Like an Athlete</h3>
              <p className="about-lead">
                Founded in 2021 by Marco Mastrorocco and Jovan Vucetic,
                ATHLETIX is on a mission to become the{" "}
                <strong>
                  number one private high-performance facility in Australia
                </strong>
                .
              </p>
              <p>
                We are committed to{" "}
                <strong>training everyone like athletes</strong>, bridging the
                high-performance model to <strong>regular people</strong>,{" "}
                <em>not exclusively to athletes</em>.
              </p>
            </div>
          </article>

          <article className="about-block about-block--split">
            <span className="about-num">02</span>
            <div className="about-block-body">
              <h3 className="about-block-title">What We Do</h3>
              <p>At ATHLETIX, we specialise in:</p>
              <ul className="about-list">
                <li>
                  <strong>Strength and conditioning</strong> training
                </li>
                <li>
                  <strong>Athlete training programs</strong>
                </li>
                <li>
                  Unique, evidence-based{" "}
                  <strong>group fitness classes</strong>
                </li>
                <li>
                  Long-term{" "}
                  <strong>
                    athlete development (LTAD) pathways for youth athletes
                  </strong>
                </li>
                <li>
                  <strong>In-house sports rehabilitation programs</strong>
                </li>
                <li>
                  Coaching <strong>professional athletes</strong>
                </li>
                <li>Supporting the physical preparedness for any sport</li>
              </ul>
            </div>
          </article>

          <article className="about-block">
            <span className="about-num">03</span>
            <div className="about-block-body">
              <h3 className="about-block-title">Why We Are Different</h3>
              <p>
                ATHLETIX stands out by integrating{" "}
                <strong>
                  high-performance training principles into every client&rsquo;s
                  program
                </strong>
                , regardless of their athletic background. Our approach is
                rooted in <strong>evidence-based practices</strong>, and we are
                dedicated to delivering personalized, high-quality coaching
                that drives results.
              </p>
              <p>
                We foster a community where both elite athletes and general
                fitness enthusiasts can achieve their goals through
                scientifically backed training methods.
              </p>
            </div>
          </article>

          <article className="about-block">
            <span className="about-num">04</span>
            <div className="about-block-body">
              <h3 className="about-block-title">Our Philosophy</h3>
              <blockquote className="about-pullquote">
                We believe in creating strong and resilient individuals
                capable of withstanding sport demands and living a pain-free
                life.
              </blockquote>
              <p>
                Our passion for <strong>youth development</strong> drives our
                focus on sound <strong>LTAD principles</strong> and our
                opposition to early sport specialisation. We emphasise
                building solid competencies through a{" "}
                <strong>systematic approach to training</strong>. Our coaches
                are responsible for running programs that align with the
                ATHLETIX brand, ensuring that every client receives the
                highest standard of care and expertise.
              </p>
            </div>
          </article>
        </div>

        <div className="container about-narrow">
          <aside className="about-podcast-feature">
            <div className="about-podcast-tag">
              <span className="dot" />
              FEATURED ON THE ASCA PODCAST
            </div>
            <h3 className="about-podcast-title">
              Our Approach to Youth Training
            </h3>
            <p className="about-podcast-body">
              Hear our founders on the Australian Strength &amp; Conditioning
              Association podcast on how we apply LTAD principles, build
              robust youth athletes, and stay clear of early sport
              specialisation.
            </p>
            <div className="about-podcast-actions">
              <a
                href="https://strengthandconditioning.org/asca-podcast"
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Listen to the podcast
              </a>
              <Link href="/contact" className="btn btn-outline">
                Talk to a Coach
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            <div className="about-stat">
              <strong>2021</strong>
              <span>Founded in Fortitude Valley</span>
            </div>
            <div className="about-stat">
              <strong>8+</strong>
              <span>ASCA &amp; ESSA accredited coaches</span>
            </div>
            <div className="about-stat">
              <strong>9</strong>
              <span>Pro sporting partners</span>
            </div>
            <div className="about-stat">
              <strong>200+</strong>
              <span>University placement students</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team-photo">
        <div className="container about-narrow">
          <p className="about-eyebrow center">The People</p>
          <h2 className="about-h2-center">THE ATHLETIX S&amp;C TEAM</h2>
          <p className="about-team-lede">
            ATHLETIX is made up of an exceptionally talented team of
            professionals. Our coaches blend higher education (Exercise
            Science, Human Movement, Physiotherapy degrees) with practical
            on-the-field experience — training elite athletes, general
            population and clinical patients.
          </p>
        </div>
        <div className="container">
          <div className="about-team-image">
            <img src="/image/new-team.jpg" alt="The Athletix S&C team" />
          </div>
        </div>
      </section>

      {/* Coaches + Trust — pulled in from the home page */}
      <div className="home-v2">
        <section className="coaches-section" id="team">
          <div className="coaches-inner">
            <div className="coaches-top">
              <div>
                <div className="kicker">Our Team</div>
                <h2 className="sec-title">
                  Our Elite
                  <br />
                  Coaches.
                </h2>
                <p className="sec-body">
                  Every Athletix coach holds dual accreditation from
                  Australia&apos;s two peak national bodies — ASCA and ESSA.
                  University degrees merged with real on-field experience at
                  the highest level of Australian sport.
                </p>
              </div>
              <div className="cred-bar">
                <div className="cred-item">
                  <span className="cred-val">ASCA</span>
                  <span className="cred-lbl">Accredited</span>
                </div>
                <div className="cred-sep" />
                <div className="cred-item">
                  <span className="cred-val">ESSA</span>
                  <span className="cred-lbl">Certified</span>
                </div>
                <div className="cred-sep" />
                <div className="cred-item">
                  <span className="cred-val">{COACHES.length}</span>
                  <span className="cred-lbl">Elite Coaches</span>
                </div>
                <div className="cred-sep" />
                <div className="cred-item">
                  <span className="cred-val">Uni</span>
                  <span className="cred-lbl">All Qualified</span>
                </div>
              </div>
            </div>
            <div className="coaches-grid">
              {COACHES.map((c) => (
                <div key={c.name} className="coach-card">
                  <div className="coach-photo">
                    <img src={c.img} alt={c.name} />
                    <div className="coach-grad" />
                  </div>
                  <div className="coach-info">
                    <div className="coach-name">{c.name}</div>
                    <span className="coach-role">{c.role}</span>
                    <div className="coach-tags">
                      {c.tags.map((t) => (
                        <span key={t} className="coach-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="trust-wrap">
          <div className="trust-inner">
            <h2 className="trust-h">
              Trusted by Brisbane&apos;s Elite Clubs &amp; Institutions
            </h2>
            <p className="trust-tagline">
              The coaches and physios who work with{" "}
              <strong>professional athletes</strong> choose Athletix for their
              own players. If they trust us — you can too.
            </p>
            <div className="logo-row">
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/brisbane-lions-logo.png"
                  alt="Brisbane Lions"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/cricket-australia-logo.png"
                  alt="Cricket Australia"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/Queensland-Bulls.png"
                  alt="Queensland Bulls"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/gold-coast-titans-logo.png"
                  alt="Gold Coast Titans"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/Brisbane-Bullets-logo.png"
                  alt="Brisbane Bullets"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/kisspng-brisbane-heat-logo.png"
                  alt="Brisbane Heat"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/Baseball_Australia_logo.png"
                  alt="Baseball Australia"
                />
              </div>
              <div className="logo-pill">
                <img
                  src="/image/Trusted%20By/crest-villanova-crest-logo.png"
                  alt="Villanova College"
                />
              </div>
            </div>
            <p className="trust-quote">
              &quot;The same science, the same standards, the same care used
              by <strong>NRL, cricket, and basketball clubs</strong> — built
              into a facility where every kid, adult, and family in Brisbane
              can access it.&quot;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
