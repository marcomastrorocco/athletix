import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athlete Programs — ATHLETIX Brisbane",
  description:
    "Elite Athlete Training Membership at Athletix Brisbane. ASCA/ESSA accredited S&C coaches, sport scientists, physios and VALD performance testing.",
};

type Coach = {
  img: string;
  name: string;
  body: React.ReactNode;
  quals: string[];
  focus?: string[];
};

const COACHES: Coach[] = [
  {
    img: "/image/Elite Coach/mastro.jpeg",
    name: "MARCO MASTROROCCO",
    body: (
      <>
        <p>
          Over 20 years experience in coaching general and athletic populations
          (Triple, Uri, Sport, Australia). A deep passion in educating and
          developing physical ability.
        </p>
        <p>
          Since 2019, I have been working as a coach for Cricket Australia
          (Pathway Squads) and the Queensland Bulls (Elite and Youth Pathway).
          I am providing high performance programs for Highschool sports
          programs (Rugby Union, Track and Field, Swimming).
        </p>
        <p>
          Currently part of a research group in the field of
          &ldquo;CONCUSSION&rdquo; with QUT and GRIFFITH University.
        </p>
        <p>
          Marco also mentors and helps the Team developing the Optimal
          S&amp;C frameworks to suit both our athletic and general
          populations.
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach – ASCA Professional L2",
      "Weightlifting Coach (AWF Level 2)",
      "S&C Consultant for CRICKET AUSTRALIA and QLD BULLS",
      "Bachelor in High Performance Sports",
      "14× Italian First Kickboxing Champion",
      "Bronze Medal at the W.A.K.O. European Kickboxing Championships (2009)",
    ],
  },
  {
    img: "/image/Elite Coach/isaac.jpg",
    name: "ISAAC COMPO",
    body: (
      <>
        <p>I have been living and breathing Sport my entire life.</p>
        <p>
          I have been playing AFL at sub-elite places for the past 5 years,
          got accepted to High Level coaching.
        </p>
        <p>
          This inspired completing my Bachelor in Exercise Science and
          becoming a Strength and Conditioning specialist.
        </p>
        <p>
          My mission is to support others in their journey to becoming a
          better version of themselves: fitter, stronger, faster or in
          whatever capacity that may be.
        </p>
        <p>
          My coaching philosophy is about providing an evidence-based
          approach, evolving in fundamental movements (squatting, pressing,
          pulling and hinging) in conjunction with improving motor patterns,
          proven to all latest development (jumping, sprinting, lifting).
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach – ASCA Level 1",
      "Bachelor in Exercise Science",
      "Sub Elite AFL Athlete",
    ],
    focus: [
      "Strength and Power Development",
      "Speed Development",
      "Injury Prevention and Return to play",
      "Mobility",
    ],
  },
  {
    img: "/image/Elite Coach/Reza.jpg",
    name: "REZA SHANFIAN",
    body: (
      <>
        <p>
          Insatiably interested in human movement and athletic performance.
        </p>
        <p>
          I completed a Bachelor of Exercise and Sport Sciences (Hons) (after
          playing International rugby).
        </p>
        <p>
          I have a broad range of coaching experience: professional cricket
          players, sub-elite rugby and soccer players, gym and fitness
          enthusiasts.
        </p>
        <p>
          I implement a scientific and research-based approach to my coaching
          and am always interested to learn more about new training methods
          and human movement. I believe in a holistic approach towards health
          and fitness and am eager to help my clients to reach their goals.
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach",
      "Bachelor of Exercise Science (Hons.)",
      "ASCA Accredited Exercise and Sport Scientist (LEXL/ASBP)",
    ],
    focus: [
      "Strength and Conditioning",
      "Agility and Power Development",
      "Injury Prevention and Rehab",
    ],
  },
  {
    img: "/image/Elite Coach/ritti.jpg",
    name: "ELITE NWAZE",
    body: (
      <>
        <p>Sport has and continues to be the drum to my Heartbeat.</p>
        <p>
          Creating and completing the Bachelor of High performance sport has
          enriched my drum set with new found.
        </p>
        <p>
          Ready to educate and motivate youth and adults alike in their
          aspiring fitness goals: whether it be to get stronger, fitter or
          faster, I&rsquo;m dedicated to continuous, professional development
          to guide clients towards by scientific outcomes.
        </p>
        <p>
          As a first generation South Sudanese, I&rsquo;m also eager to work
          with multicultural athletes to showcase all the universal
          experience.
        </p>
      </>
    ),
    quals: [
      "Strength & Conditioning Coach – ASCA Level 1",
      "Bachelor In High Performance Sports",
      "QSC Coach Volleyball",
      "QSC Coach Volleyball College",
    ],
    focus: [
      "Youth Athletic Development",
      "Strength and Power Development",
      "Injury Prevention and Recovery",
    ],
  },
  {
    img: "/image/Elite Coach/jacob.jpg",
    name: "JACOB ROSS NIESSEN",
    body: (
      <>
        <p>
          Jacob began his journey into sports from a very young age, straight
          into Baseball (he had a 4 legendary places, the first Australian to
          go play in the US Major League Recovery and a his MLB squad).
        </p>
        <p>
          The passion led him to complete a Bachelor in Exercise and Sports
          Science, and become a Strength &amp; Conditioning Coach.
        </p>
        <p>
          While still playing for the Brisbane Bandits, Jacob is part of the
          S&amp;C Team for the Australia Baseball Team.
        </p>
        <p>
          He is our &lsquo;overhead sports&rsquo; specialist as well as one of
          our most appreciated Youth S&amp;C coaches.
        </p>
      </>
    ),
    quals: [
      "Bachelor in Exercise and Sport Sciences",
      "QSC Team Australia Baseball",
      "QSC Coach Vibrators College",
    ],
    focus: [
      "Youth Athletic Development",
      "Rotational Power Development",
      "Shoulder Injury Prevention",
    ],
  },
];

type FAQ = { q: string; a: React.ReactNode; open?: boolean };

const FAQS: FAQ[] = [
  {
    q: "What is the purpose of your athlete membership program?",
    open: true,
    a: (
      <p>
        Our athlete membership program aims to provide a support structure, so
        that the athlete (youth or adult) can focus on playing, while we take
        care of the technical and physical progressions. We focus on supporting
        sub-elite athletes who are seeking an edge to make it into a team or
        enhance their performance using best practice sports science methods.
        We also help elite athletes working on specific parts of their training
        (speed, agility, power, return to sport).
      </p>
    ),
  },
  {
    q: "How long does the athlete membership last?",
    a: (
      <p>
        Our athlete membership program requires a minimum commitment of 12
        months (Return to Sport might differ from case to case). The year
        duration allows us to effectively manage the athletes&rsquo;
        programming, workload, and track their progress over an extended
        period, making sure we make an impact in his overall performance.
      </p>
    ),
  },
  {
    q: "What does the athlete membership include?",
    a: (
      <p>
        As part of the athlete membership, we offer comprehensive support and
        resources. This includes personalized programming, careful workload
        management, weekly physical testings to monitor progress, and weekly
        one-on-one sessions with our performance coaches. Additionally,
        athletes have full access to our gym facilities and classes.
      </p>
    ),
  },
  {
    q: "How do you tailor the programming to individual athletes?",
    a: (
      <p>
        Our performance coaches work closely with each athlete to develop
        personalized programming that aligns with their goals, strengths, and
        weaknesses. We consider factors such as age, skill level, specific
        sport requirements, and any previous injuries or limitations. This
        individualized approach helps maximize the athlete&rsquo;s potential
        and address their unique needs.
      </p>
    ),
  },
  {
    q: "Are the physical testings mandatory for athletes?",
    a: (
      <>
        <p>
          Participation in the weekly physical testings is highly encouraged
          as it allows us to assess the athlete&rsquo;s progress and make
          necessary adjustments to their training program.
        </p>
        <p>
          Having access to our gold standard testing equipment from Vald is a
          major asset that you do not want to miss on. However, we understand
          that certain circumstances may prevent an athlete from attending. In
          such cases, alternative arrangements can be made to ensure their
          progress is still monitored effectively.
        </p>
      </>
    ),
  },
  {
    q: "Are there any age restrictions for joining the athlete membership program?",
    a: (
      <p>
        There are no strict age restrictions for our program. We welcome both
        adult and youth athletes who are committed to improving their
        performance. However, for youth athletes, we may require parental
        consent and involvement in the decision-making process.
      </p>
    ),
  },
  {
    q: "Can athletes with pre-existing injuries or medical conditions join?",
    a: (
      <>
        <p>
          Athletes with pre-existing injuries or medical conditions can still
          join our program. However, it is essential for us to have a clear
          understanding of their medical history and any restrictions or
          modifications required.
        </p>
        <p>
          If the athlete joins after sustaining an injury, we can help too.
          Athletix Team is in contact with the top sports physicians and
          orthopedic surgeons in Queensland.
        </p>
        <p>
          Our in-house elite Allied Health team, can help finding the best
          solution to the athletes problems, making sure they can get back on
          their feet in the quickest and safest possible way.
        </p>
        <p>
          This information will enable us to develop a safe and effective
          training program tailored to their specific needs.
        </p>
      </>
    ),
  },
  {
    q: "How do you choose the right coach?",
    a: (
      <>
        <p>
          That is going to be a tough choice.. as all our coaches possess
          unparalleled expertise and knowledge in the field of S&amp;C.
        </p>
        <p>
          We appreciate the significance of assigning you the right coach for
          the task, overseeing your physical performance.
        </p>
        <p>
          That is why, we appoint as your coach manager, the coach who holds
          the most relevance and expertise in your particular sport.
        </p>
        <p>
          Overall, we employ a fluid system that allows coaches to step in as
          needed for specific aspects of the program, such as speed mechanics,
          strength and power training, return to sport protocols, or Olympic
          lifting techniques.
        </p>
      </>
    ),
  },
];

const TESTIMONIALS = [
  { src: "/image/video/DARCY.mp4#t=5" },
  { src: "/image/video/GEORGIA02.mp4#t=5" },
  { src: "/image/video/Testimonial-1-Website.mp4#t=5" },
  { src: "/image/video/Testimonial-2-Website.mp4#t=3" },
];

const TRUSTED = [
  { src: "/image/Trusted%20By/Baseball_Australia_logo.png", alt: "Baseball Australia" },
  { src: "/image/Trusted%20By/Brisbane-Bullets-logo.png", alt: "Brisbane Bullets" },
  { src: "/image/Trusted%20By/brisbane-lions-logo.png", alt: "Brisbane Lions" },
  { src: "/image/Trusted%20By/crest-villanova-crest-logo.png", alt: "Villanova" },
  { src: "/image/Trusted%20By/cricket-australia-logo.png", alt: "Cricket Australia" },
  { src: "/image/Trusted%20By/gold-coast-titans-logo.png", alt: "Gold Coast Titans" },
  { src: "/image/Trusted%20By/kisspng-brisbane-heat-logo.png", alt: "Brisbane Heat" },
  { src: "/image/Trusted%20By/Queensland-Bulls.png", alt: "Queensland Bulls" },
];

export default function AthleteProgramsPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/youth-classes-page.css" />
      <link rel="stylesheet" href="/css/adult-classes-page.css" />
      <link rel="stylesheet" href="/css/athlete-programs-page.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Athletes Program
          </p>
          <h1>
            ATHLETES <span className="accent">PROGRAM</span>
          </h1>
        </div>
      </section>

      <section className="youth-intro">
        <div className="container youth-intro-grid">
          <div className="youth-intro-copy">
            <h2>ELITE ATHLETE TRAINING MEMBERSHIP</h2>
            <p>
              Are you an athlete looking to boost your strength and power in
              speed and agility?
            </p>
            <p>
              At ATHLETIX, our team of{" "}
              <strong>Strength &amp; Conditioning coaches</strong> (ESSA, ASCA,
              NCSE accredited), have practical experience with elite athletes
              of all ages. Our programs are tailored to athletes of all levels
              aiming for peak performance in their respective sports,
              including{" "}
              <strong>
                Netball, Track &amp; Field, Rugby, AFL, Cricket, Soccer and
                Basketball
              </strong>
              .
            </p>
            <p>
              The ATHLETIX Athlete Program is designed to elevate your
              performance to the next level,{" "}
              <strong>unlocking your full potential</strong> and gaining
              access to our comprehensive{" "}
              <strong>high-performance hub</strong> right at your fingertips.
            </p>

            <h3 className="youth-intro-sub">A TEAM TO SUPPORT YOU</h3>
            <p>
              We understand that reaching peak performance requires a
              multidisciplinary approach, and that&rsquo;s why we have brought
              together a team of experts to optimize your training and
              maximize your potential:{" "}
              <strong>strength and conditioning coaches</strong>,{" "}
              <strong>sport scientists</strong>,{" "}
              <strong>exercise physiologists</strong>, and{" "}
              <strong>physiotherapists</strong>, all here to support you every
              step of the way.
            </p>
            <p>
              Our goal is simple: to provide you with the same high
              standards, attention to detail, and results-driven attitude that
              professional athletes experience. Our team of dedicated experts
              will be passionate about helping you develop the physical
              attributes necessary for success: strength, speed, agility, and
              power.
            </p>

            <h3 className="youth-intro-sub">DATA DRIVEN SPORTS SCIENCE</h3>
            <p>
              Our team of dedicated sport scientists is committed to enhancing
              your performance through evidence-based methodologies,
              analyzing, and utilizing{" "}
              <strong>
                VALD cutting-edge technology for advanced performance testing
              </strong>
              , providing you with invaluable insights into your strengths,
              weaknesses, and areas for improvement. This data-driven approach
              ensures that your training is tailored to your specific needs,
              optimizing your performance outcomes.{" "}
              <strong>
                We offer a 7-day trial, book your spot below.
              </strong>
            </p>

            <h3 className="youth-intro-sub">BOOK 7-DAY TRIAL</h3>
            <form
              className="youth-form athlete-inline-form"
              method="post"
              action="/contact"
            >
              <div className="youth-form-field youth-form-field-full">
                <input
                  type="text"
                  name="full_name"
                  id="ap-name"
                  placeholder=" "
                  required
                />
                <label htmlFor="ap-name">
                  Name<span className="req">*</span>
                </label>
              </div>
              <div className="youth-form-field youth-form-field-full">
                <input
                  type="tel"
                  name="phone"
                  id="ap-phone"
                  placeholder=" "
                />
                <label htmlFor="ap-phone">Phone Number</label>
              </div>
              <div className="youth-form-field youth-form-field-full">
                <input
                  type="email"
                  name="email"
                  id="ap-email"
                  placeholder=" "
                  required
                />
                <label htmlFor="ap-email">
                  Email<span className="req">*</span>
                </label>
              </div>

              <fieldset className="adult-radio-group">
                <legend>About you:</legend>
                <label className="radio-pill">
                  <input type="radio" name="audience" value="youth" />
                  <span>Youth</span>
                </label>
                <label className="radio-pill">
                  <input
                    type="radio"
                    name="audience"
                    value="adult"
                    defaultChecked
                  />
                  <span>Adult</span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="audience" value="family" />
                  <span>Family</span>
                </label>
              </fieldset>

              <div className="youth-form-actions">
                <div
                  className="youth-captcha"
                  aria-label="reCAPTCHA placeholder"
                >
                  <span className="yc-box" />
                  <span className="yc-label">I&rsquo;m not a robot</span>
                  <span className="yc-logo">reCAPTCHA</span>
                </div>
                <button type="submit" className="youth-form-submit">
                  BOOK NOW <span aria-hidden="true">&#10148;</span>
                </button>
              </div>
            </form>
          </div>

          <div className="youth-intro-image athlete-intro-image">
            <img
              src="/image/athlete-programm.jpg"
              alt="Athletix athlete programme"
            />
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <p className="eyebrow center">Real Results</p>
            <h2 className="section-heading center">WHAT OUR MEMBERS SAY</h2>
            <p className="testimonials-sub">
              Don&rsquo;t just take our word for it. Hear directly from the
              athletes and individuals who train with us every day.
            </p>
          </div>
          <div
            className="slider-wrapper"
            style={{
              position: "relative",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div className="slider-container" id="testimonialSlider">
              <div className="slider-track" id="testimonialTrack">
                {TESTIMONIALS.map((t) => (
                  <div key={t.src} className="video-card">
                    <video
                      src={t.src}
                      preload="metadata"
                      playsInline
                    />
                    <div className="card-frame" />
                    <button className="play-overlay" aria-label="Play Video">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider-controls">
              <button
                type="button"
                className="slider-btn prev-btn"
                aria-label="Previous Testimonial"
              >
                &larr;
              </button>
              <button
                type="button"
                className="slider-btn next-btn"
                aria-label="Next Testimonial"
              >
                &rarr;
              </button>
            </div>
            <div
              className="slider-dots"
              id="testimonialDots"
              aria-label="Testimonial Slider Dots"
            />
          </div>
        </div>
      </section>

      <section className="trusted-by" id="trusted">
        <div className="container">
          <h3 className="trusted-title">TRUSTED BY</h3>
          <ul className="trusted-logos">
            {TRUSTED.map((t) => (
              <li key={t.src}>
                <img src={t.src} alt={t.alt} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="coaches">
        <div className="container">
          <h2 className="coaches-title">OUR COACHES</h2>
          {COACHES.map((c) => (
            <article key={c.name} className="coach-card">
              <div className="coach-photo">
                <img src={c.img} alt={c.name} />
                <span className="coach-name-vert">{c.name}</span>
              </div>
              <div className="coach-body">
                {c.body}
                <h4 className="coach-sub">Qualifications/Achievements</h4>
                <ul className="coach-list">
                  {c.quals.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
                {c.focus && (
                  <>
                    <h4 className="coach-sub">Training Focus</h4>
                    <ul className="coach-list">
                      {c.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="adult-faq">
        <div className="container">
          <h2 className="adult-faq-title">FREQUENTLY ASKED QUESTIONS</h2>
          {FAQS.map((f, i) => (
            <details key={i} className="faq-item" open={f.open}>
              <summary>{f.q}</summary>
              <div className="faq-body">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
