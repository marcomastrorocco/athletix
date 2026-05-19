import Link from "next/link";
import type { Metadata } from "next";
import TimetableGrid from "@/components/TimetableGrid";
import { getTimetable } from "@/lib/data";

export const metadata: Metadata = {
  title: "Classes — ATHLETIX Brisbane",
  description:
    "S&C group classes in Brisbane — Lift, Mobility, Mat Pilates, HIIT, Youth agility and more. Elite small-group coaching for every level.",
};

type ClassTile = {
  type: string;
  title: string;
  body: React.ReactNode;
  href?: string;
};

const CLASSES: ClassTile[] = [
  {
    type: "STRENGTH",
    title: "LIFT",
    body: (
      <>
        LIFT is not Cross Fit, not bodybuilding, not a circuit class with weights. WE WORK IN TEAMS and go through periodized blocks of
        4 weeks at the time. LIFT has a main focus on Strength Training, with accessories to improve your work capacity and soft tissue
        resilience, but also elements of POWER and Plyometrics to enhance athletic qualities.
      </>
    ),
  },
  {
    type: "SKILL/CONDITIONING",
    title: "YOUTH AGILITY FOUNDATIONS",
    body: (
      <>
        <strong>AGE GROUP: 7–11 years</strong> This class merges elements of physical fitness, injury prevention, linear and lateral
        speed. The basis for safe movement in a dynamic, fast-pace environment.
      </>
    ),
  },
  {
    type: "SKILL/CONDITIONING",
    title: "YOUTH AGILITY DEVELOPMENT",
    body: (
      <>
        <strong>AGE GROUP: 12–16 years</strong> Everything around Team (Court/Field) sports conditioning. Move faster with confidence!
        Plyometrics, Change of Directions, Injury prevention drills. Everything needed to bulletproof the body and let you/your kids
        enjoy sports games and competitions.
      </>
    ),
  },
  {
    type: "SKILLS/STRENGTH/FITNESS",
    title: "YOUTH FITNESS FOUNDATIONS",
    body: (
      <>
        <strong>AGE GROUP: 7–11 years</strong> Starter program for Primary School aged kids, developing foundation skills and movement
        patterns. We support your kids&apos; long-term athletic development. Get stronger, burn calories and improve the foundation for
        any sport!
      </>
    ),
  },
  {
    type: "STRENGTH",
    title: "YOUTH STRENGTH DEVELOPMENT",
    body: (
      <>
        <strong>AGE GROUP: 12–16 years</strong> High School kids will be guided through learning the foundation of resistance
        training. Increasing muscle strength, physical resilience and overall competency, confidence in the gym and robustness!
      </>
    ),
  },
  {
    type: "SKILL/CONDITIONING",
    title: "YOUTH SPEED FOUNDATION",
    body: (
      <>
        <strong>AGE GROUP: 7–11 years</strong>
        <br />
        Learn the foundations of Sprinting and Acceleration. Perfect the mechanic and improve speed. Pathway for our Speed Development
        class.
      </>
    ),
  },
  {
    type: "SKILL/CONDITIONING",
    title: "YOUTH SPEED DEVELOPMENT",
    body: (
      <>
        <strong>AGE GROUP: 12–16 years</strong>
        <br />
        Learn the foundations of Sprinting and Acceleration. Work on technical drills, develop physiological adaptations and
        injury-proof your body for any court and field sport.
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "HIIT — PUSH AND DRAG",
    body: (
      <>
        Develop insane fitness, strength, and resilience! Our SLED and PROWLERS workout is filled with functional movements, a great
        combination of bodyweight drills, and Teamwork! A true expression of evidence-based high-intensity training.
      </>
    ),
  },
  {
    type: "CONDITIONING",
    title: "MET-CON",
    body: (
      <>
        A circuit class meant to help you enhance metabolic rate and overall conditioning regardless of your starting fitness level.
        Met-Con works your speed-strength with submaximal loads and a variety of movements/tools. You will love it.
      </>
    ),
  },
  {
    type: "MIXED",
    title: "STRENGTH & CON",
    body: (
      <>
        This class merges the best of both worlds: <strong>STRENGTH</strong>: lifting with a focus on resilience and work capacity.{" "}
        <strong>CONDITIONING</strong>: working on energy system to finish the session on a high, not only burning a few extra calories,
        but making sure your Fitness gets challenged to improve week after week!
      </>
    ),
  },
  {
    type: "RECOVERY/RELEASE",
    title: "MOBILITY",
    href: "/mobility",
    body: (
      <>
        A recovery class designed for athletic and general populations. Trusted by Cricket Australia and the QLD Bulls. A science-based
        approach to maximize both flexibility and control! Whatever your training age and experience, give it a go!
      </>
    ),
  },
  {
    type: "MAT PILATES",
    title: "MAT PILATES",
    href: "/mat-pilates",
    body: (
      <>
        Coached by our in-house Physiotherapists. Low-impact flexibility, muscular strength and endurance movements. Pilates emphasizes
        proper postural alignment, core strength, and muscle balance. Perfect for those sitting for too long, athletes that look for
        unloading activities.
      </>
    ),
  },
];

export default async function ClassesPage() {
  const tt = await getTimetable();

  return (
    <>
      <link rel="stylesheet" href="/css/classes-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Classes
          </p>
          <h1>
            <span className="accent">CLASSES</span>
          </h1>
        </div>
      </section>

      <section className="classes-intro">
        <div className="container">
          <h2>S&amp;C Group Classes in Brisbane</h2>
          <p>
            Whether you want to improve your overall fitness, strength, speed or endurance our{" "}
            <strong>Adult group S&amp;C class programs</strong> like sled workouts are designed to take the same approach used in elite
            sport teams and provide it to the general population. Athletix Brisbane based personal trainers and exercise and sports
            scientists offer 1 on 1 services and work with athletes, general population and clinical patients.
          </p>
          <p>
            We also offer tailored <strong>group athletic development classes for Youth</strong>. Whether you want your child or
            teenager to be better at sprinting, netball, cricket, basketball, soccer or rugby, our group fitness classes are designed
            to take the same approach used in elite sport teams and provide it to our children. To help improve your teens performance
            at sport or motivate your children to exercise, our S&amp;C gym in Brisbane offers the following classes below:
          </p>
          <Link href="/contact" className="btn btn-outline">
            Read More
          </Link>
        </div>
      </section>

      <section className="classes-cards">
        <div className="container">
          <div className="class-card-grid">
            {CLASSES.map((c) => (
              <article key={c.title} className="class-tile">
                <p className="tile-type">
                  TYPE : <span>{c.type}</span>
                </p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <Link href={c.href || "/contact"} className="arrow-link">
                  More here <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="timetable" id="timetable">
        <div className="container">
          <div className="timetable-head">
            <p className="eyebrow">Athletix Club</p>
            <h2>Timetable</h2>
            <p className="section-sub">
              Weekly training schedule inspired by our in-gym board. Sunday is reserved for recovery.
            </p>
          </div>
          <TimetableGrid data={tt} />
        </div>
      </section>

      <section className="classes-longform">
        <div className="container">
          <h3>Athletic Training and Athlete-Focused Programs in Brisbane</h3>
          <p>
            Athletix Brisbane offers a range of specialized programs designed for athletes at all levels. From elite athletes to those
            just starting their fitness journey, these programs are tailored to meet your specific needs.
          </p>
          <p>
            <strong>Athletix Gym</strong>: Known for its high-quality facilities, Athletix Gym in Brisbane is one of the go-to spots
            for athletic training. Offering strength training, sports performance development, and more, it&apos;s the perfect place
            for anyone looking to boost their athletic capabilities.
          </p>
          <p>
            <strong>Athletix Training Facilities Brisbane</strong>: For athletes who need top-tier training facilities, Brisbane has a
            range of specialized locations focused on improving speed, agility, and overall performance.
          </p>
          <p>
            <strong>Athletix Strength Training</strong>: Whether you&apos;re training for a specific sport or simply want to build
            strength, athletix-focused strength training programs can help. These workouts are intensive and aim to maximize muscle
            gains and athletic prowess.
          </p>
          <p>
            <strong>Youth Performance Training</strong>: Aimed at young athletes, these programs focus on building the foundation of
            strength, agility, and speed that will benefit youth athletes throughout their careers.
          </p>

          <h3>Strength and Conditioning: Building a Strong Foundation</h3>
          <p>
            Strength and conditioning are at the core of any athletic development program. Strength training helps to enhance muscle
            strength, power, and endurance, while conditioning helps improve overall fitness and performance.
          </p>
          <p>
            <strong>Strength Training Brisbane</strong>: There are numerous gyms and fitness centers in Brisbane that take strength
            training seriously. These classes use heavy weights and compound movements to build strength, allowing you to perform
            better in any sport.
          </p>
          <p>
            <strong>Strength and Conditioning Brisbane</strong>: Strength and conditioning programs help athletes improve their
            performance by targeting specific areas such as power, endurance, flexibility, and injury prevention.
          </p>
          <p>
            <strong>Strength Fitness Classes</strong>: For those who prefer group settings, strength fitness classes in Brisbane offer
            a variety of classes aimed at building strength and toning muscles.
          </p>
          <p>
            <strong>Strength Classes Near Me</strong>: Whether you&apos;re located in the city or the suburbs, there are plenty of
            strength training options nearby to help you achieve your fitness goals.
          </p>

          <h3>Group Fitness and Classes: Fun and Motivating Workouts</h3>
          <p>
            If you thrive in a group setting and enjoy the camaraderie of a workout community, group fitness classes might be just
            what you need. Athletix Brisbane is home to many fitness centers offering a variety of classes.
          </p>
          <p>
            <strong>Group Fitness Training Brisbane</strong>: These classes include everything from cardio workouts to strength
            training, HIIT, and even yoga, providing a well-rounded fitness regime.
          </p>
          <p>
            <strong>Group Strength and Conditioning</strong>: Designed for those who want to improve strength in a social environment,
            these classes combine strength training with conditioning to maximize your fitness goals.
          </p>
          <p>
            <strong>Group Fitness Classes Brisbane</strong>: No matter where you&apos;re located in Brisbane — Fortitude Valley,
            Newstead or here — there are plenty of fitness classes close by that will help you reach your fitness goals.
          </p>
          <p>
            <strong>Group Weight Training Near Me</strong>: Weight training classes are available in Brisbane to suit all fitness
            levels, with personalized coaching and group training experiences.
          </p>

          <h3>Specialized Sports Training: Agility, Speed, and Plyometrics</h3>
          <p>
            To excel in sports, you need to focus not only on strength but also on agility, speed, and explosive power. Plyometrics
            and speed/agility training are crucial for improving performance in sports like soccer, basketball, football, and more.
          </p>
          <p>
            <strong>Speed and Agility Training Brisbane</strong>: Designed to improve your sprinting ability and overall agility,
            these programs teach athletes how to move faster and more efficiently, which is key in most sports.
          </p>
          <p>
            <strong>Plyometric Training Brisbane</strong>: Plyometrics are exercises designed to improve explosive power and are often
            used by athletes in sports like basketball and more and field. Brisbane offers several centers that provide targeted
            plyometric training.
          </p>
          <p>
            <strong>Plyometric Classes Near Me</strong>: If you&apos;re looking for a plyometrics-focused class, there are options in
            and around Brisbane that can help you enhance your power, coordination, and explosive speed.
          </p>
          <p>
            <strong>Agility Training for Kids Near Me</strong>: Kids can benefit from agility training too, and there are several
            programs in Brisbane aimed at improving agility for young athletes.
          </p>

          <h3>HIIT and Functional Training: For the Fitness Enthusiast</h3>
          <p>
            HIIT (High-Intensity Interval Training) and functional fitness have become incredibly popular in recent years due to their
            time efficiency and the results they deliver.
          </p>
          <p>
            <strong>HIIT Classes Brisbane</strong>: These high-intensity workouts are designed to burn fat and build endurance.
            Brisbane is home to many gyms offering HIIT classes, where you&apos;ll perform short bursts of intense activity followed
            by brief rest periods.
          </p>
          <p>
            <strong>HIIT Brisbane</strong>: For those who prefer a more specialized program, HIIT training in Brisbane can be
            customized to your fitness level and goals, ensuring you get the most out of each session.
          </p>
          <p>
            <strong>Hyrox Training Brisbane</strong>: This is a new form of fitness competition that combines HIIT with functional
            training. If you&apos;re looking to push your limits and compete in fitness events, consider Hyrox training in Brisbane.
          </p>

          <h3>Youth Fitness Programs: Encouraging Active Kids</h3>
          <p>
            Active children are healthier, happier, and more successful in both academics and sports. Brisbane offers a variety of
            fitness programs for kids to help them develop a love for movement while building strength, coordination, and endurance.
          </p>
          <p>
            <strong>Youth Fitness Brisbane</strong>: These classes focus on getting kids active, improving their fitness, and
            developing motor skills in a fun and supportive environment.
          </p>
          <p>
            <strong>Kids Agility Training Near Me</strong>: Agility training for kids helps them develop coordination and balance,
            crucial for sports like soccer and basketball.
          </p>
          <p>
            <strong>Fitness Training for Kids Near Me</strong>: Many fitness centers in Brisbane offer kids&apos; specific fitness
            training programs, helping them stay active and build healthy habits.
          </p>

          <h3>Finding the Right Gym in Brisbane</h3>
          <p>
            With so many options for fitness centers in Brisbane, finding the right gym for your needs is crucial. Whether
            you&apos;re looking for a general fitness center or a specialized <strong>sports performance gym in Brisbane</strong> has
            a wide variety of facilities to choose from.
          </p>
          <p>
            <strong>Gyms Brisbane</strong>: From large-scale gyms to boutique fitness centers, Brisbane has plenty of gyms offering
            everything from strength training to group fitness and more.
          </p>
          <p>
            <strong>CrossFit Kids Brisbane</strong>: For those interested in CrossFit, many gyms in Brisbane offer classes designed
            for kids, focusing on strength, endurance, and agility.
          </p>
          <p>
            <strong>Calisthenics Gym Brisbane</strong>: If you prefer bodyweight exercises, there are several calisthenics gyms in
            Brisbane where you can build strength, coordination, and flexibility without the need for heavy weights.
          </p>

          <h3>Location-Specific Classes and Training</h3>
          <p>
            If you&apos;re looking for a more specific location-based program, Brisbane has fitness classes and training options that
            cater to various neighborhoods.
          </p>
          <p>
            <strong>Fitness Classes Fortitude Valley</strong>: If you&apos;re in Fortitude Valley, you&apos;ll find local fitness
            centers offering strength, conditioning, and agility training.
          </p>
          <p>
            <strong>Newstead, New Farm Group Fitness Classes</strong>: For those in or near Newstead or New Farm, group fitness
            classes and functional fitness classes are available to help you stay in shape and achieve your fitness objectives.
          </p>
        </div>
      </section>

      <div className="home-v2">
        <div className="cta-section">
          <div className="cta-grid-bg" />
          <div className="cta-inner">
            <div className="cta-tag">Limited Offer</div>
            <h2 className="cta-h">
              $7 for
              <br />
              <em>7 Days.</em>
            </h2>
            <p className="cta-sub">Unlimited access. All classes. Meet the coaches. Feel the difference.</p>
            <p className="cta-detail">Fully Refundable · No Lock-In · Every Level Welcome</p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary">
                Claim Your Trial
              </Link>
              <Link href="/membership" className="btn-ghost">
                See All Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
