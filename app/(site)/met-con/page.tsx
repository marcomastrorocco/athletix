import Link from "next/link";
import type { Metadata } from "next";
import ClassBookSection from "@/components/ClassBookSection";

export const metadata: Metadata = {
  title: "MET-CON Body Conditioning Class Brisbane | ATHLETIX Gym",
  description:
    "A circuit body conditioning class meant to help you enhance metabolic rate and overall conditioning regardless of your starting fitness level.",
};

const BENEFITS = [
  {
    n: "01",
    title: "Increased Metabolic Rate",
    body: "Met-Con workouts push your body to perform at high intensities, which results in a faster metabolic rate even after the workout ends. This \"afterburn\" effect, also known as excess post-exercise oxygen consumption (EPOC), means your body continues to burn calories for hours after completing the workout. This makes Met-Con a highly effective way to shed fat and improve your body composition.",
  },
  {
    n: "02",
    title: "Improved Cardiovascular Health",
    body: "The quick and intense bursts of movement in Met-Con work your heart and lungs, improving cardiovascular endurance. By alternating between strength and conditioning exercises, you will push your cardiovascular system while simultaneously building strength, endurance, and power.",
  },
  {
    n: "03",
    title: "Full-Body Conditioning",
    body: "One of the main advantages of Met-Con is its focus on total-body workouts. Every session involves exercises that target multiple muscle groups, enhancing strength and endurance across the entire body. Whether it's a squat, deadlift, or explosive jump, your entire body will work in harmony to complete the circuit, which leads to better overall conditioning.",
  },
  {
    n: "04",
    title: "Diverse Energy System Focus",
    body: "Each week, the focus of Met-Con shifts to target different energy systems. Some days might prioritize anaerobic work (short, intense bursts of activity), while others may focus on aerobic capacity (sustained, moderate-intensity movements). This ensures that your fitness improves in all areas, including power, strength, and endurance, while also keeping the workouts interesting and challenging.",
  },
  {
    n: "05",
    title: "Suitable for All Fitness Levels",
    body: "One of the key aspects of Met-Con is that it can be modified for any fitness level. Beginners can reduce the intensity or use lighter weights, while experienced athletes can increase the intensity or challenge themselves with heavier loads. Met-Con is not about how much weight you lift but how you perform the exercises and maintain a high intensity throughout the workout.",
  },
  {
    n: "06",
    title: "Variety and Adaptability",
    body: "Each Met-Con workout is designed to be different. The structure is adaptable, which means you will never do the same workout twice (unless you choose to). The constantly varied routines keep the training exciting, preventing plateaus and allowing continual progress. As your body adapts to one set of exercises, the variety forces it to keep progressing.",
  },
];

export default function MetConPage() {
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
            Met-Con
          </p>
        </div>
      </section>

      <section className="yaf-hero">
        <div className="container yaf-hero-grid">
          <div className="yaf-hero-copy">
            <p className="yaf-eyebrow">
              <span className="yaf-eyebrow-dot" /> Conditioning · All levels
            </p>
            <h1 className="yaf-title">Met-Con</h1>
            <hr className="yaf-divider" />
            <p className="yaf-lead">
              A <strong>circuit body conditioning class</strong> meant to help
              you enhance metabolic rate and overall conditioning regardless of
              your starting fitness level.
            </p>
            <p className="yaf-lead">
              Met-Con incorporates speed-strength training, submaximal loads
              with a variety of movement and tools, weekly changing the focus
              on the energy system. You will love it.
            </p>
            <div className="yaf-hero-cta">
              <Link href="#book-form" className="btn btn-primary">
                Book a trial
              </Link>
              <Link href="/timetable" className="btn btn-ghost">
                View timetable
              </Link>
            </div>
          </div>

          <div className="yaf-media" style={{ background: "#0b0d10" }}>
            <img
              src="/image/cdn/met-con-hero.jpg"
              alt="Met-Con circuit body conditioning class at ATHLETIX Brisbane"
              loading="lazy"
              width={1920}
              height={1100}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <span className="yaf-media-badge">Conditioning · Circuit</span>
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
              <Link href="/contact" className="yaf-info-card-link">
                Get in touch →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="yaf-includes">
        <div className="container">
          <header className="yaf-includes-head">
            <h2>What is Met-Con?</h2>
            <p className="yaf-includes-sub">
              Met-Con combines speed-strength training with submaximal loads
              and a variety of movements to target different energy systems of
              the body. It&apos;s a powerful approach to fitness because it
              pushes your body in diverse ways, optimizing fat loss, muscle
              tone, and cardiovascular health.
            </p>
            <p className="yaf-includes-sub">
              Incorporating tools such as kettlebells, dumbbells, medicine
              balls, resistance bands, and bodyweight exercises, Met-Con varies
              in focus each week. This approach ensures that your body is
              constantly challenged and adapting, providing continuous
              progress.
            </p>
          </header>
        </div>
      </section>

      <section className="yaf-includes" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="yaf-includes-head">
            <h2>Key Benefits of Met-Con Training</h2>
          </header>
          <div className="yaf-pillars">
            {BENEFITS.map((b) => (
              <article key={b.title} className="yaf-pillar">
                <span className="yaf-pillar-num">{b.n}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="yaf-includes" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="yaf-includes-head">
            <h2>What to Expect in a Met-Con Class</h2>
            <p className="yaf-includes-sub">
              Met-Con classes are typically structured as circuits. You will
              move through a series of stations with short rest periods in
              between. Each station might involve a different exercise
              targeting various muscle groups, such as kettlebell swings,
              burpees, sprints, or squat jumps.
            </p>
            <p className="yaf-includes-sub">
              At the start of each class, the instructor will outline the
              focus for the session, whether it&apos;s conditioning, strength,
              or a combination of both. You will be encouraged to push your
              limits and focus on maintaining good form throughout each
              exercise.
            </p>
          </header>
        </div>
      </section>

      <ClassBookSection sourceLabel="Met-Con page" defaultClass="Met-Con" />
    </>
  );
}
