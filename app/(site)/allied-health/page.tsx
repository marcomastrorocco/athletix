import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Physiotherapist Brisbane, Dietitian & Nutritionist in Brisbane — ATHLETIX Gym",
  description:
    "Athletix Allied Health Team — Specialist Sports Physiotherapists, Clinical Exercise Physiologists and Massage Therapy in Brisbane.",
};

type Practitioner = {
  id: string;
  name: string;
  role: string;
  title: string;
  image: string;
  bio: React.ReactNode;
  qualifications: string[];
  experience: string[];
  linkedin?: string;
  instagram?: string;
};

const PRACTITIONERS: Practitioner[] = [
  {
    id: "myles",
    name: "Myles Burfield",
    role: "Head of Rehab",
    title: "Head Physiotherapist",
    image:
      "/image/cdn/IMG_9100-scaled-e1670906460682-49a90c.jpg",
    bio: (
      <>
        <p>
          Myles is a <strong>Specialist Sports Physiotherapist</strong>{" "}
          (Fellowship of the Australian College of Physiotherapists in 2023)
          with a special interest in injury management, rehabilitation, running
          analysis and injury prevention. He is currently undergoing expert
          training with the Australian College of Physiotherapists to become a{" "}
          <a
            href="https://sportsandexercise.physio/careerpathway/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sports and Exercise Specialist physio
          </a>
          .
        </p>
        <p>
          With 16 years of private practice experience and extensive involvement
          within elite sport, Myles provides expert treatment and management for
          all general musculoskeletal and sporting injuries. He has previously
          worked within the <strong>Australian Institute of Sport</strong>,{" "}
          <strong>Cirque du Soleil</strong>, and as team physio for the{" "}
          <strong>Australian Canoe/Kayaking team</strong> (including the Rio
          Olympic Games in 2016, where they won Bronze). He now practises in
          Brisbane while completing his specialisation and teaching the next
          generation of Physiotherapists at Australian Catholic University.
        </p>
        <p>
          You can book your appointment with Myles and his team{" "}
          <a
            href="https://sportsandexercise.physio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </>
    ),
    qualifications: [
      "Specialist Sports and Exercise Physiotherapist (2023)",
      "Masters of Sports Physiotherapy (2016)",
      "Bachelor of Physiotherapy (2007)",
      "Clinical educator at Australian Catholic University (2021 – current)",
    ],
    experience: [
      "Australian Institute of Sport (2012 – 2015)",
      "Australian Olympic Canoe/Kayak Team Physiotherapist (2013 – 2018)",
      "Cirque du Soleil (2010 – 2012)",
    ],
    linkedin: "https://www.linkedin.com/in/mylesspex/",
  },
  {
    id: "bridie",
    name: "Bridie Nicholson",
    role: "Sports Rehab / Physio",
    title: "Physiotherapist",
    image:
      "/image/cdn/IMG-20240130-WA0019-e1727084066284-1efb74.jpg",
    bio: (
      <>
        <p>
          Bridie is a <strong>Titled Sport and Exercise Physiotherapist</strong>
          , as awarded by the Australian College of Physiotherapists, who is
          passionate about making modern, high-quality physiotherapy care
          available to all people — not just professional athletes.
        </p>
        <p>
          With more than 7 years of sports physio experience, Bridie has worked
          with a variety of sporting and professional teams including the{" "}
          <strong>Canadian Basketball team</strong>,{" "}
          <strong>Brisbane Roar Football Team</strong>, NHL (Ice Hockey),
          Ultimate Frisbee, Para-Swimming, running, boxing, powerlifting, rugby
          and AFL.
        </p>
        <p>
          Alongside working in private practice, Bridie is the{" "}
          <strong>Head Physiotherapist for the Brisbane Roar Women&apos;s
          team</strong>{" "}
          and a consultant for the UQ ParaSTART Paralympic development program.
          She is passionate about helping developing and adolescent athletes and
          runs the physiotherapy services for Villanova College contact sports.
        </p>
      </>
    ),
    qualifications: [
      "Titled Sport Physiotherapist (2022)",
      "Masters of Sports Physiotherapy (2022)",
      "Master of Physiotherapy (2017)",
      "Bachelor of Exercise & Nutrition (2015)",
    ],
    experience: [
      "Lead Physio Brisbane Roar W (2021 – present)",
      "Sports Physio consultant paraSTART (2022 – present)",
      "Lead Physio Villanova College (2023 – present)",
      "Basketball & NHL Canada (2019 – 2021)",
    ],
  },
  {
    id: "campbell",
    name: "Campbell Antonio",
    role: "Sports Rehab / Physio",
    title: "Physiotherapist",
    image:
      "/image/cdn/IMG-20230131-WA0002-e1723499488364-68c055.jpg",
    bio: (
      <>
        <p>
          Campbell has a deep interest in Sports Physiotherapy. After obtaining
          his Bachelor in Physiotherapy (2019), he decided that in order to
          truly help his clients and athletes, he needed to be more than a
          general Physio.
        </p>
        <p>
          Campbell is currently undertaking{" "}
          <strong>two Masters simultaneously</strong> — Master of Sports and
          Exercise Physiotherapy and Master in High Performance Sports — to gain
          further knowledge in both S&amp;C and Sports Physiotherapy.
        </p>
        <p>
          Together with Myles, they help our athletes, members and corporates
          stay on top of their game. Campbell is the Lead Physio for the{" "}
          <strong>Women Reds program</strong> and also enjoys teaching our
          physio-led Pilates small-group classes.
        </p>
        <p>
          You can book your appointment with Campbell{" "}
          <a
            href="https://sportsandexercise.physio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </>
    ),
    qualifications: [
      "Bachelor of Physiotherapy — Honours (2019)",
      "Masters of Sports and Exercise Physiotherapy (ongoing)",
      "Master of High Performance Sports (ongoing)",
    ],
    experience: [
      "Wallaroos (2020)",
      "Mayne Tigers AFC (2020 – 2021)",
      "UQFC (2020)",
    ],
    linkedin: "https://www.linkedin.com/in/campbell-antonio-545a97247/",
  },
  {
    id: "david",
    name: "David Lawrence",
    role: "Exercise Physiologist",
    title: "Exercise Physiologist",
    image:
      "/image/cdn/IMG_0147-e1685322267891-48889f.jpg",
    bio: (
      <>
        <p>
          Dave started as an Exercise Scientist and has accumulated{" "}
          <strong>over 10,000 hours</strong> of face-to-face experience with
          clients from all walks of life — from national-level athletes to
          pregnant mums and 92-year-olds.
        </p>
        <p>
          While working with athletes remains a strong passion, David developed
          an interest in helping people with injuries and clinical conditions,
          and went back to university to complete a second degree in{" "}
          <strong>Clinical Exercise Physiology (Honours)</strong> at the
          University of Queensland.
        </p>
        <p>
          He now works with <strong>NDIS clients</strong>,{" "}
          <strong>Veterans</strong> and people suffering from chronic diseases.
          In his spare time he trains regularly and is an avid touch
          footballer.
        </p>
        <p className="ah-prac-sub">Training Focus</p>
        <ul className="ah-prac-list">
          <li>
            <span className="ah-tick">✓</span> Strength and Power development
          </li>
          <li>
            <span className="ah-tick">✓</span> Management and rehab of
            musculoskeletal issues
          </li>
          <li>
            <span className="ah-tick">✓</span> Mental health considerations
          </li>
          <li>
            <span className="ah-tick">✓</span> Management of clinical health
            conditions
          </li>
        </ul>
      </>
    ),
    qualifications: [
      "Bachelor of Clinical Exercise Physiology (Honours)",
      "Bachelor of Exercise and Nutrition Sciences",
    ],
    experience: [],
    instagram: "https://www.instagram.com/nudojo/",
  },
];

const FAQS: { q: string; a: string; open?: boolean }[] = [
  {
    q: "What's the difference between a sports physio and a regular physio?",
    open: true,
    a: "A sports physio specialises in injury prevention, management, and performance optimisation for athletes and active individuals. While regular physios treat a broader range of conditions, sports physios focus on sport-specific demands and rehabilitation to ensure a safe return to activity.",
  },
  {
    q: "How do I know if I need to see a physio or just rest?",
    a: "If pain persists for more than a few days, limits your ability to perform daily activities, or affects your movement, it's best to see a physio. Early assessment can help prevent further damage and speed up recovery.",
  },
  {
    q: "How is Sports Rehab tailored to my specific needs?",
    a: "Rehabilitation is individualised to your goals, sport and injury, ensuring you stay as active as possible. Your treatment plan focuses on your specific complaints and includes sport or goal-specific exercises to optimise recovery and performance.",
  },
  {
    q: "What happens during the assessment phase?",
    a: "Your sports therapist will conduct a thorough assessment of your injury or complaints, providing an expert diagnosis. This is followed by a detailed explanation of your condition and a tailored plan to address your needs.",
  },
  {
    q: "What sports rehab treatment techniques might be used?",
    a: "Depending on your injury, your therapist may use hands-on techniques such as massage, dry needling, mobilisations and manipulations. These treatments are combined with mobility and strength exercises, ensuring a comprehensive approach to recovery.",
  },
  {
    q: "How does the Sports Rehab clinic ensure I stay active during rehabilitation?",
    a: "Our approach focuses on keeping you active both in the gym and on the track. With guidance on modifying activities and specific exercises, we help you maintain fitness and progress towards a safe return to your sport.",
  },
  {
    q: "Will my sports therapist communicate with my coach or other specialists?",
    a: "Yes — communication with your coach or referral to specialists is part of our holistic approach to injury management. This ensures that everyone involved in your performance and care is aligned with your rehabilitation goals.",
  },
  {
    q: "What support is provided after I recover?",
    a: "To prevent recurrence of your injury and further improve performance, we offer ongoing support. This may include continued exercise guidance, performance-focused sessions and regular check-ins to ensure long-term success.",
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.01 3.62 4.63V19z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.34 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.56 2.91.3.78.7 1.44 1.38 2.13.69.69 1.35 1.08 2.13 1.38.76.29 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.29-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.34 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

export default function AlliedHealthPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/allied-health-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> Allied Health
          </p>
          <h1>
            ALLIED <span className="accent">HEALTH</span>
          </h1>
          <p className="lede">
            Sports Rehab, Physiotherapists &amp; Exercise Physiologists —
            integrated with your training under one roof.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="ah-intro">
        <div className="container ah-intro-grid">
          <div className="ah-intro-copy">
            <p className="ah-eyebrow">Multi-disciplinary team</p>
            <h2 className="ah-h2">
              Specialist care, <em>under one roof.</em>
            </h2>
            <p>
              ATHLETIX is proud to offer a multi-disciplinary group of brilliant
              practitioners, ranging from <strong>Specialist Sports
              Physiotherapists</strong>, to{" "}
              <strong>Clinical Exercise Physiologists</strong>, and a{" "}
              <strong>Massage Therapist</strong>.
            </p>
            <p>
              Having an Allied Health team in-house means you can be guided in
              each stage of your rehab by different professionals — from
              pre-surgery, to acute management, to return to sport or activity.
            </p>
            <p>
              The team have over <strong>25 years of combined clinical
              experience</strong>, including work for the Australian Institute
              of Sport, Australian Representative teams and the Olympic Games.
              Our practitioners help diagnose and manage sports or
              exercise-related injuries in everyday and elite athletes, as well
              as working with chronic disease, veterans and older populations.
            </p>
          </div>
          <div className="ah-intro-media">
            <img
              src="/image/cdn/Youth-sport-1-e1684274091394-7bb69e.png"
              alt="ATHLETIX allied health team supporting athlete rehab"
            />
          </div>
        </div>
      </section>

      {/* PRACTITIONERS HEAD */}
      <section className="ah-prac-head">
        <div className="container">
          <p className="ah-eyebrow ah-eyebrow--center">Meet the Team</p>
          <h2 className="ah-h2 ah-h2--center">Our Practitioners</h2>
          <span className="ah-divider" />
        </div>
      </section>

      {/* PRACTITIONERS */}
      <section>
        <div className="container ah-pracs">
          {PRACTITIONERS.map((p, i) => (
            <article
              key={p.id}
              className={`ah-prac${i % 2 === 1 ? " is-flipped" : ""}`}
            >
              <div className="ah-prac-media">
                <div className="ah-prac-photo">
                  <img src={p.image} alt={`${p.name} — ${p.role}`} />
                  <span className="ah-prac-photo-tag">{p.role}</span>
                </div>
              </div>
              <div className="ah-prac-body">
                <span className="ah-prac-role">{p.role}</span>
                <h3 className="ah-prac-name">{p.name}</h3>
                <p className="ah-prac-title">{p.title}</p>
                {p.bio}
                {p.qualifications.length > 0 && (
                  <>
                    <p className="ah-prac-sub">Qualifications</p>
                    <ul className="ah-prac-list">
                      {p.qualifications.map((q) => (
                        <li key={q}>
                          <span className="ah-tick">✓</span> {q}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {p.experience.length > 0 && (
                  <>
                    <p className="ah-prac-sub">Experience</p>
                    <ul className="ah-prac-list">
                      {p.experience.map((e) => (
                        <li key={e}>
                          <span className="ah-tick">✓</span> {e}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {(p.linkedin || p.instagram) && (
                  <div className="ah-prac-socials">
                    {p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name} on LinkedIn`}
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                    {p.instagram && (
                      <a
                        href={p.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name} on Instagram`}
                      >
                        <InstagramIcon />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="ah-faq">
        <div className="container">
          <h2 className="ah-faq-title">Frequently Asked Questions</h2>
          {FAQS.map((f, i) => (
            <details key={i} className="ah-faq-item" open={f.open}>
              <summary>{f.q}</summary>
              <div className="ah-faq-body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="home-v2">
        <div className="cta-section">
          <div className="cta-grid-bg" />
          <div className="cta-inner">
            <div className="cta-tag">Book In</div>
            <h2 className="cta-h">
              Train, recover,
              <br />
              <em>return.</em>
            </h2>
            <p className="cta-sub">
              Integrated physio, rehab and exercise physiology — built around
              your training, not bolted on.
            </p>
            <p className="cta-detail">
              Same-roof care · Specialist team · Sports-specific rehab
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary">
                Book a Consultation
              </Link>
              <Link href="/our-team" className="btn-ghost">
                Meet the Coaches
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
