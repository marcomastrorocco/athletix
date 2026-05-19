import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS & DVA Training Program — ATHLETIX Gym Brisbane",
  description:
    "Are you seeking an individualised and supportive approach to help you manage your condition and achieve your goals within your NDIS or DVA packages? Athletix is here to help.",
};

const FAQS: { q: string; a: string; open?: boolean }[] = [
  {
    q: "What is included in the Physio screening?",
    open: true,
    a: "The physio screening is designed to assess any potential limitations to your participation in physical activities. It includes a thorough check of your mobility, strength, balance and coordination. Our physiotherapists evaluate any existing injuries or conditions and discuss your goals, so we can create a tailored program that addresses your specific needs and ensures safe, effective participation in all activities.",
  },
  {
    q: "What do Exercise Physiologists do?",
    a: "Exercise Physiologists specialise in using exercise to prevent and manage chronic diseases and conditions. They design personalised exercise programs that help improve physical function, mobility and overall health. Whether you're recovering from an injury, managing a disability, or looking to improve your general fitness, an EP creates safe, effective plans tailored to your specific needs and goals.",
  },
  {
    q: "What is the cost involved in attending Athletix programs?",
    a: "Athletix follows the NDIS and DVA guidelines, and all prices are based on the item number advised by the Support Coordinator or Plan Management company.",
  },
  {
    q: "Are the classes only for NDIS or DVA participants?",
    a: "No — our classes are open to everyone. At Athletix we believe in inclusiveness and encourage participation from all members, not just NDIS or DVA participants. This helps foster socialisation and a sense of community. If needed, we can organise smaller group classes exclusively for NDIS or DVA participants to ensure more specific attention.",
  },
  {
    q: "Can the support worker take part in the class?",
    a: "Yes, we welcome the participation of support workers at no extra cost, provided there is space available in the class. Their involvement can enhance the experience and provide additional support during the session.",
  },
  {
    q: "Do I need to be fit or injury free?",
    a: "No. Most of our participants had little or no previous experience. Our practitioners are experienced and can tailor the exercises and classes individually to suit whatever your physical activity background or history is. Our Exercise Physiologist will run a screening so we can make informed decisions on the best approach.",
  },
];

export default function NdisPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/ndis-program-page.css" />
      <link rel="stylesheet" href="/css/home-v2.css" />

      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/about">About</Link>{" "}
            <span>/</span> NDIS &amp; DVA Program
          </p>
          <h1>
            NDIS &amp; <span className="accent">DVA Program</span>
          </h1>
          <p className="lede">
            Personal discovery, balance and health — covered programs for NDIS
            and DVA participants in Brisbane.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="nd-intro">
        <div className="container nd-intro-grid">
          <div className="nd-intro-copy">
            <p className="nd-eyebrow">Covered Services</p>
            <h2 className="nd-h2">
              Individualised support, <em>under one roof.</em>
            </h2>
            <p>
              Are you seeking an individualised and supportive approach to help
              you manage your condition and achieve your goals within your{" "}
              <strong>NDIS or DVA</strong> packages? Athletix offers a wide
              range of <strong>covered services</strong>, including:
            </p>
            <ul>
              <li>Physiotherapy</li>
              <li>Exercise Physiology</li>
              <li>Mat Pilates</li>
              <li>Mobility</li>
              <li>Strength training classes</li>
            </ul>
            <p>
              These classes can be eligible for coverage as{" "}
              <strong>Social and Recreational activities</strong> under NDIS and
              DVA, making it easier for you to access the support you need.
            </p>
            <p>
              Our services cater to individuals from various backgrounds,
              including those with mental health conditions and physical
              disabilities.
            </p>
          </div>
          <div className="nd-intro-media">
            <img
              src="/image/cdn/ff1528_1bb755e01d614c41abfdfcd5dd37fa69mv2-fb64fb.webp"
              alt="ATHLETIX NDIS and DVA training environment"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-section-head">
            <p className="nd-eyebrow nd-eyebrow--center">What we offer</p>
            <h2 className="nd-h2 nd-h2--center">
              A program <em>built for you.</em>
            </h2>
            <span className="nd-divider" />
          </div>

          <p className="nd-offer-lede">
            Conveniently located in central Brisbane, Athletix serves clients
            from surrounding suburbs and beyond. Whether you&apos;re looking to
            improve your <strong>Mobility</strong>,{" "}
            <strong>Strength</strong>, <strong>Balance</strong> or{" "}
            <strong>Coordination</strong>, or seeking real-time guidance and
            support, our expert team — elite physiotherapists, exercise
            physiologists and exercise &amp; sports scientists — is here to
            help you achieve your goals.
          </p>

          <div className="nd-offer-cards">
            <article className="nd-offer-card">
              <span className="nd-offer-num">01</span>
              <h3>Initial Assessment</h3>
              <p>
                We start with a Physio-led or EP-led assessment based on your
                unique needs and concerns, forming the foundation of a
                collaborative management plan.
              </p>
            </article>

            <article className="nd-offer-card">
              <span className="nd-offer-num">02</span>
              <h3>Individualised Programs</h3>
              <p>
                Programs tailored to your specific goals. Incorporating a
                variety of exercise modalities:
              </p>
              <ul>
                <li>
                  Mat Pilates, Mobility &amp; Weightlifting classes — as social
                  and recreational activities
                </li>
                <li>Gym-based exercise programs</li>
                <li>
                  NDIS-approved personal training when a specialist approach
                  is needed
                </li>
              </ul>
            </article>

            <article className="nd-offer-card">
              <span className="nd-offer-num">03</span>
              <h3>Guided Progression</h3>
              <p>
                Continuous guidance and support, helping you engage in
                activities you enjoy while ensuring safe progression. Whether
                you&apos;re self-managing or plan-managed, our services are
                accessible.
              </p>
            </article>
          </div>

          <div className="nd-offer-feature">
            <div className="nd-offer-feature-media">
              <img
                src="/image/cdn/IMG-20220122-WA0000-1-e1657587571222-768x579-d03cf0.jpg"
                alt="ATHLETIX coach guiding a participant through a session"
              />
            </div>
            <div className="nd-offer-copy">
              <p className="nd-eyebrow">In-house team</p>
              <h3 className="nd-h3">
                Specialists who <em>know your story.</em>
              </h3>
              <p>
                Sessions are run by accredited physiotherapists and exercise
                physiologists working side-by-side with our S&amp;C coaches —
                so progression in your training stays joined-up with your
                rehab and clinical goals.
              </p>
              <p>
                We work directly with your Support Coordinator or Plan Manager
                to keep paperwork, reports and invoicing simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PILATES + EP */}
      <section className="nd-section nd-section--alt">
        <div className="container">
          <div className="nd-why-head">
            <p className="nd-eyebrow nd-eyebrow--center">Why this approach</p>
            <h2 className="nd-h2 nd-h2--center">
              Why <em>Physio-Pilates &amp; Exercise Physiology?</em>
            </h2>
            <span className="nd-divider" />
          </div>
          <img
            src="/image/cdn/20220222_093946-scaled-e1657587325743-1024x446-472bf2.jpg"
            alt="Pilates and exercise physiology session at ATHLETIX"
            className="nd-why-banner"
          />
          <div className="nd-why-body">
            <p>
              The World Health Organization defines health as{" "}
              <em>
                &quot;a complete state of physical, mental and social
                well-being and not merely the absence of disease or
                infirmity&quot;
              </em>{" "}
              (WHO, 2006). One proven means to improve health is physical
              activity, which has the demonstrated ability to improve both
              physical and psychological quality of life.
            </p>
            <p>
              Our Pilates and Exercise Physiology sessions strengthen your core
              muscles, improve joint health, balance and coordination, enhance
              endorphin production, improve sleep patterns and reduce overall
              sensitivity to stress. Regardless of exercise history or current
              physical condition, our expert practitioners tailor every
              movement to the individual.
            </p>
          </div>
        </div>
      </section>

      {/* COLLABS + DVA */}
      <section className="nd-section">
        <div className="container">
          <div className="nd-collab-grid">
            <div className="nd-collab-block">
              <h3>Our NDIS Collaborations</h3>
              <p>
                Athletix Allied Health are connected with and trusted by:
              </p>
              <ul className="nd-collab-list">
                <li>
                  <strong>Case Managers</strong>
                  We provide detailed reports to assist with fund allocation
                  and planning.
                </li>
                <li>
                  <strong>Support Coordinators</strong>
                  We help integrate programs and services into your daily
                  routine.
                </li>
                <li>
                  <strong>Local Area Coordinators</strong>
                  We assist you in connecting with local services and
                  navigating the NDIS system.
                </li>
              </ul>
            </div>
            <div className="nd-collab-block">
              <h3>Veterans &mdash; DVA Programs</h3>
              <p>
                For veterans, our DVA program offers specialised care tailored
                to the unique needs of those who have served. We understand the
                physical and mental challenges that veterans may encounter, and
                our dedicated team is here to provide support and guidance.
              </p>
              <p>
                Our programs focus on rehabilitation, pain management, mental
                well-being and overall health improvement — with the utmost
                respect and understanding of your service.
              </p>
              <div className="nd-dva-image">
                <img
                  src="/image/cdn/exercise-physiology-e5ba93.jpg"
                  alt="DVA-supported exercise physiology session"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING NOTE */}
      <section className="nd-close">
        <div className="container">
          <div className="nd-close-card">
            <p className="nd-eyebrow">Our promise</p>
            <h3>Your comfort, safety and progress come first.</h3>
            <p>
              Our team is dedicated to creating a supportive and inclusive
              environment where you can thrive. We work collaboratively with
              other healthcare professionals and support networks to ensure a
              holistic, integrated approach to your care.
            </p>
            <p>
              To learn more about our NDIS and DVA programs and how we can
              assist you,{" "}
              <Link href="/contact" className="nd-close-link">
                please get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="nd-faq">
        <div className="container">
          <h2 className="nd-faq-title">Frequently Asked Questions</h2>
          {FAQS.map((f, i) => (
            <details key={i} className="nd-faq-item" open={f.open}>
              <summary>{f.q}</summary>
              <div className="nd-faq-body">
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
            <div className="cta-tag">Get Started</div>
            <h2 className="cta-h">
              Personal discovery,
              <br />
              <em>balance, health.</em>
            </h2>
            <p className="cta-sub">
              Plan-managed, self-managed and DVA participants welcome. Send
              your plan details and goals and we&apos;ll do the rest.
            </p>
            <p className="cta-detail">
              In-house physio &middot; EP-led screening &middot; Inclusive facility
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary">
                Enquire About NDIS &amp; DVA
              </Link>
              <Link href="/allied-health" className="btn-ghost">
                Meet the Allied Health Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
