"use client";

import { useEffect, useRef } from "react";

export default function HomeV2() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) x.target.classList.add("visible");
        });
      },
      { threshold: 0.07 }
    );
    root.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleVid = (e: React.MouseEvent<HTMLDivElement>) => {
    const w = e.currentTarget;
    const v = w.querySelector("video");
    const o = w.querySelector(".testi-play") as HTMLElement | null;
    if (!v) return;
    if (v.paused) {
      document
        .querySelectorAll<HTMLVideoElement>(".home-v2 .testi-video video")
        .forEach((x) => x.pause());
      document
        .querySelectorAll<HTMLElement>(".home-v2 .testi-play")
        .forEach((x) => (x.style.opacity = "1"));
      v.play();
      if (o) o.style.opacity = "0";
    } else {
      v.pause();
      if (o) o.style.opacity = "1";
    }
  };

  return (
    <div className="home-v2" ref={rootRef}>
      <link rel="stylesheet" href="/css/home-v2.css" />

      {/* HERO */}
      <section className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://athletix.com.au/wp-content/uploads/2024/07/DSC02067-768x512.jpg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "url('https://athletix.com.au/wp-content/uploads/2024/07/DSC02067-768x512.jpg') center/cover no-repeat",
          }}
        />
        <div className="hero-grid" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-kicker">Elite Strength &amp; Conditioning · Fortitude Valley, Brisbane</div>
          <h1 className="hero-h1">
            High Performance
            <br />
            <em>Village.</em>
          </h1>
          <p className="hero-sub">
            <strong>World-class S&amp;C coaching, sports physio, and elite sports nutrition</strong> — trusted by Brisbane&apos;s pro
            clubs, and open to every kid, adult, and family. No experience needed. Every level welcome.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("book")}>
              Start Your Trial
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("classes")}>
              Explore Training
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hstat-n">400+</span>
            <span className="hstat-l">Members Trained</span>
          </div>
          <div className="hero-stat">
            <span className="hstat-n">9</span>
            <span className="hstat-l">Pro Club Partners</span>
          </div>
          <div className="hero-stat">
            <span className="hstat-n">200+</span>
            <span className="hstat-l">Uni Placement Students</span>
          </div>
          <div className="hero-stat">
            <span className="hstat-n">25+</span>
            <span className="hstat-l">Yrs Allied Health XP</span>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust-wrap reveal" id="about">
        <div className="trust-inner">
          <h2 className="trust-h">Trusted by Brisbane&apos;s Elite Clubs &amp; Institutions</h2>
          <p className="trust-tagline">
            The coaches and physios who work with <strong>professional athletes</strong> choose Athletix for their own players. If they
            trust us — you can too.
          </p>
          <div className="logo-row">
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/brisbane-lions-logo.png" alt="Brisbane Lions" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/cricket-australia-logo.png" alt="Cricket Australia" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/Queensland-Bulls.png" alt="Queensland Bulls" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/gold-coast-titans-logo.png" alt="Gold Coast Titans" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/Brisbane-Bullets-logo.png" alt="Brisbane Bullets" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/kisspng-brisbane-heat-logo.png" alt="Brisbane Heat" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/Baseball_Australia_logo.png" alt="Baseball Australia" /></div>
            <div className="logo-pill"><img src="https://athletix.com.au/wp-content/uploads/2024/07/crest-villanova-crest-logo.png" alt="Villanova College" /></div>
          </div>
          <p className="trust-quote">
            &quot;The same science, the same standards, the same care used by <strong>NRL, cricket, and basketball clubs</strong> —
            built into a facility where every kid, adult, and family in Brisbane can access it.&quot;
          </p>
        </div>
      </div>

      {/* COMMUNITY */}
      <section className="community-section reveal">
        <div className="community-inner">
          <div className="kicker">Our Purpose</div>
          <h2 className="sec-title">
            Built for Everyone.
            <br />
            Standards for Athletes.
          </h2>
          <div className="community-grid">
            <div>
              <p className="sec-body">
                Most people never had access to proper athletic coaching growing up. We built Athletix to change that — for every kid,
                adult, and family in Brisbane. The athletes are our proof. They&apos;re what tells the regular person:{" "}
                <em style={{ color: "var(--cyan)", fontStyle: "normal" }}>&quot;this place is serious — and it&apos;s for me too.&quot;</em>
              </p>
              <div className="community-audiences">
                <div className="audience-card">
                  <div className="audience-icon">🏆</div>
                  <div>
                    <div className="audience-title">Sub-Elite &amp; Aspiring Athletes</div>
                    <p className="audience-desc">
                      You want to go elite. We&apos;ll get you there. Same methods, same science, same physio, same dietitian as the
                      pros. No shortcuts — just the work that actually moves the needle.
                    </p>
                  </div>
                </div>
                <div className="audience-card">
                  <div className="audience-icon">💪</div>
                  <div>
                    <div className="audience-title">Regular Adults</div>
                    <p className="audience-desc">
                      You don&apos;t need to be an athlete to train like one. Our coaches meet you exactly where you are. No judgment.
                      No one-size-fits-all. Just proper coaching built around you.
                    </p>
                  </div>
                </div>
                <div className="audience-card">
                  <div className="audience-icon">👨‍👩‍👧</div>
                  <div>
                    <div className="audience-title">Sporty &amp; Non-Sporty Parents</div>
                    <p className="audience-desc">
                      Whether your kid loves sport or has never tried it — we build their confidence, movement, and love of being
                      active. We develop the whole person, not just the athlete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="community-visual">
              <div className="cv-cell tall">
                <img src="https://athletix.com.au/wp-content/uploads/2021/07/IMG_5921-scaled-e1723499457589.jpeg" alt="Athletix coaching" />
                <div className="cv-label">
                  <span>The Village</span>Our Community
                </div>
              </div>
              <div className="cv-cell">
                <img src="https://athletix.com.au/wp-content/uploads/2024/07/DSC02067-768x512.jpg" alt="Athletix facility" />
                <div className="cv-label">
                  <span>The Floor</span>Our Space
                </div>
              </div>
              <div className="cv-cell">
                <img src="https://athletix.com.au/wp-content/uploads/2022/01/Youth-sport-1-e1684274091394.png" alt="Youth training" />
                <div className="cv-label">
                  <span>Youth</span>Next Generation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VS */}
      <section className="vs-section reveal">
        <div className="vs-inner">
          <div className="kicker">The Difference</div>
          <h2 className="sec-title">
            Not a Gym.
            <br />
            A Performance Village.
          </h2>
          <div className="vs-grid">
            <div className="vs-head them">Regular 24/7 Gyms</div>
            <div className="vs-head mid">vs</div>
            <div className="vs-head us">Athletix</div>
            <div className="vs-c bad"><span className="ic">✕</span>No coach on the floor</div>
            <div className="vs-c midc">01</div>
            <div className="vs-c good"><span className="ic">✓</span>ASCA &amp; ESSA coaches every session</div>
            <div className="vs-c bad"><span className="ic">✕</span>Generic programs for everyone</div>
            <div className="vs-c midc">02</div>
            <div className="vs-c good"><span className="ic">✓</span>Science-based, personalised programming</div>
            <div className="vs-c bad"><span className="ic">✕</span>No injury support or physio</div>
            <div className="vs-c midc">03</div>
            <div className="vs-c good"><span className="ic">✓</span>Specialist sports physio on-site</div>
            <div className="vs-c bad"><span className="ic">✕</span>No nutrition guidance</div>
            <div className="vs-c midc">04</div>
            <div className="vs-c good"><span className="ic">✓</span>Sports dietitian (Olympic / NRL / NBL)</div>
            <div className="vs-c bad"><span className="ic">✕</span>Adults only — no youth or family</div>
            <div className="vs-c midc">05</div>
            <div className="vs-c good"><span className="ic">✓</span>Youth, adults, families &amp; elite athletes</div>
            <div className="vs-c bad"><span className="ic">✕</span>No results tracking or data</div>
            <div className="vs-c midc">06</div>
            <div className="vs-c good"><span className="ic">✓</span>Force plate testing &amp; benchmarking</div>
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section className="classes-section reveal" id="classes">
        <div className="classes-inner">
          <div className="kicker">What We Offer</div>
          <h2 className="sec-title">
            Classes for Every
            <br />
            Stage of Your Journey.
          </h2>
          <p className="sec-body">
            Small group sessions led by elite S&amp;C coaches. The same methods used by professional athletes — built for every level,
            every age, every goal.
          </p>
          <div className="classes-grid">
            <div className="class-card">
              <div className="class-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/2.png" alt="Youth Classes" />
                <div className="class-grad" />
                <div className="class-overlay" />
              </div>
              <div className="class-info">
                <span className="class-tag">Ages 8–17</span>
                <div className="class-name">Youth Classes</div>
                <p className="class-desc">
                  Build confidence, coordination, strength and athletic foundations. We develop the whole person — not just the
                  athlete. Safe, expert-led, and genuinely fun.
                </p>
                <div className="class-cta">
                  Learn More <span>→</span>
                </div>
              </div>
            </div>
            <div className="class-card">
              <div className="class-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/DSC06320-scaled-e1723546921926.jpg" alt="Adult Classes" />
                <div className="class-grad" />
                <div className="class-overlay" />
              </div>
              <div className="class-info">
                <span className="class-tag">All Levels</span>
                <div className="class-name">Adult Classes</div>
                <p className="class-desc">
                  Challenging, exciting small group sessions scaled to you. Our coaches meet you exactly where you are — then push you
                  further than you expected.
                </p>
                <div className="class-cta">
                  Learn More <span>→</span>
                </div>
              </div>
            </div>
            <div className="class-card">
              <div className="class-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/DSC06236-scaled-e1733203149463.jpg" alt="Family Classes" />
                <div className="class-grad" />
                <div className="class-overlay" />
              </div>
              <div className="class-info">
                <span className="class-tag">All Ages</span>
                <div className="class-name">Family Classes</div>
                <p className="class-desc">
                  Train side-by-side with the people who matter most. Fun, challenging, built for all ages. The whole family — one
                  roof, one community.
                </p>
                <div className="class-cta">
                  Learn More <span>→</span>
                </div>
              </div>
            </div>
            <div className="class-card">
              <div className="class-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/06/ATHLETIX-AFT-53-scaled-e1733206277887.jpg" alt="Athlete Programs" />
                <div className="class-grad" />
                <div className="class-overlay" />
              </div>
              <div className="class-info">
                <span className="class-tag">Sub-Elite &amp; Pro</span>
                <div className="class-name">Athlete Programs</div>
                <p className="class-desc">
                  You want to go elite. We&apos;ll get you there. Speed, power, mechanics, force plate testing, physio, and sports
                  nutrition — the complete package.
                </p>
                <div className="class-cta">
                  Learn More <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="disc-section reveal">
        <div className="disc-inner">
          <div className="kicker">Specialisations</div>
          <h2 className="sec-title">
            Every Discipline
            <br />
            Under One Roof.
          </h2>
          <div className="disc-grid">
            <div className="disc-card">
              <div className="disc-num">01</div>
              <div className="disc-name">Strength Training</div>
              <p className="disc-desc">Progressive overload, perfected. Barbell fundamentals through advanced periodisation — built for every level.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">02</div>
              <div className="disc-name">Speed &amp; Agility</div>
              <p className="disc-desc">Acceleration, deceleration, and change of direction built around your sport and tested every block.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">03</div>
              <div className="disc-name">Conditioning</div>
              <p className="disc-desc">Aerobic and anaerobic capacity — measured, programmed, and progressed every session without exception.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">04</div>
              <div className="disc-name">Sprint Mechanics</div>
              <p className="disc-desc">Drills and video feedback to refine stride, posture, and ground contact for faster times.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">05</div>
              <div className="disc-name">Pilates</div>
              <p className="disc-desc">Core control, breath work, and precision movement to complement heavy training and build long-term resilience.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">06</div>
              <div className="disc-name">Mobility</div>
              <p className="disc-desc">Structured routines that keep joints healthy and training uninterrupted — designed for the long haul.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">07</div>
              <div className="disc-name">Allied Health</div>
              <p className="disc-desc">Sports physiotherapy and rehab integrated directly with your S&amp;C coaching — seamless care, zero gaps.</p>
            </div>
            <div className="disc-card">
              <div className="disc-num">08</div>
              <div className="disc-name">NDIS Program</div>
              <p className="disc-desc">Tailored movement and strength programs delivered with genuine care by qualified professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COACHES */}
      <section className="coaches-section reveal" id="coaches">
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
                Every Athletix coach holds dual accreditation from Australia&apos;s two peak national bodies — ASCA and ESSA.
                University degrees merged with real on-field experience at the highest level of Australian sport.
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
                <span className="cred-val">8</span>
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
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2021/07/IMG_5921-scaled-e1723499457589.jpeg" alt="Marco Mastrorocco" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Marco Mastrorocco</div>
                <span className="coach-role">Director of Athletic Performance</span>
                <div className="coach-tags">
                  <span className="coach-tag">ASCA L2</span>
                  <span className="coach-tag">ESSA</span>
                  <span className="coach-tag">Youth Dev</span>
                  <span className="coach-tag">Founder</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2023/05/IMG_9109-scaled-e1684449065529.jpg" alt="Reza Sharifian" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Reza Sharifian</div>
                <span className="coach-role">Head Coach</span>
                <div className="coach-tags">
                  <span className="coach-tag">ASCA</span>
                  <span className="coach-tag">ESSA</span>
                  <span className="coach-tag">Performance</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2025/08/1000133313-1-e1759098729912.jpg" alt="Sam Mulherin" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Sam Mulherin</div>
                <span className="coach-role">S&amp;C Coach</span>
                <div className="coach-tags">
                  <span className="coach-tag">ASCA</span>
                  <span className="coach-tag">ESSA</span>
                  <span className="coach-tag">Athlete Dev</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2023/05/IMG_9049-scaled-e1684450928402.jpg" alt="Ritti Kagi" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Ritti Kagi</div>
                <span className="coach-role">S&amp;C Coach</span>
                <div className="coach-tags">
                  <span className="coach-tag">ASCA</span>
                  <span className="coach-tag">Speed</span>
                  <span className="coach-tag">Agility</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2026/04/20260319_123309-scaled-e1775810245164.jpg" alt="Sam Kwong" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Sam Kwong</div>
                <span className="coach-role">S&amp;C Coach</span>
                <div className="coach-tags">
                  <span className="coach-tag">UQ Honours</span>
                  <span className="coach-tag">AFL</span>
                  <span className="coach-tag">Youth</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2023/05/IMG_0147-e1685322267891.jpg" alt="David Lawrence" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">David Lawrence</div>
                <span className="coach-role">Exercise Physiologist</span>
                <div className="coach-tags">
                  <span className="coach-tag">ESSA</span>
                  <span className="coach-tag">NDIS</span>
                  <span className="coach-tag">Clinical</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/DSC06038-scaled-e1723499280792.jpg" alt="Sasha Cochrane" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Sasha Cochrane</div>
                <span className="coach-role">S&amp;C Coach</span>
                <div className="coach-tags">
                  <span className="coach-tag">ASCA</span>
                  <span className="coach-tag">ESSA</span>
                  <span className="coach-tag">Mobility</span>
                </div>
              </div>
            </div>
            <div className="coach-card">
              <div className="coach-photo">
                <img src="https://athletix.com.au/wp-content/uploads/2026/04/20260320_144026-scaled-e1775810315378.jpg" alt="Toby Wallis" />
                <div className="coach-grad" />
              </div>
              <div className="coach-info">
                <div className="coach-name">Toby Wallis</div>
                <span className="coach-role">S&amp;C Coach</span>
                <div className="coach-tags">
                  <span className="coach-tag">ASCA</span>
                  <span className="coach-tag">AFL</span>
                  <span className="coach-tag">Rugby</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUB */}
      <section className="hub-section reveal" id="hub">
        <div className="hub-inner">
          <div className="kicker">Allied Health &amp; Nutrition</div>
          <h2 className="sec-title">
            The Full Hub.
            <br />
            Nothing Missing.
          </h2>
          <p className="sec-body" style={{ maxWidth: 700 }}>
            Most gyms stop at coaching. We don&apos;t. Athletix is a complete high performance environment — S&amp;C, physio, rehab,
            sports nutrition, and return to play. All under one roof. All talking to each other.
          </p>
          <div className="hub-layout">
            <div>
              <div className="hub-card">
                <div className="hub-badge">
                  <div className="hub-dot" />
                  <span>Live on the Floor</span>
                </div>
                <div className="hub-card-title">Sports Physiotherapy &amp; Rehab</div>
                <p className="hub-card-desc">
                  25+ years of combined clinical experience. Our physios work alongside coaches — not in a separate clinic. Integrated
                  care, real communication, zero gaps between training and recovery.
                </p>
                <div className="hub-services">
                  <div className="hub-svc">
                    <div className="hub-svc-icon">⚡</div>
                    <span className="hub-svc-text">Specialist Sports Physiotherapy — on-site weekly</span>
                  </div>
                  <div className="hub-svc">
                    <div className="hub-svc-icon">🔬</div>
                    <span className="hub-svc-text">Injury screening &amp; prevention protocols</span>
                  </div>
                  <div className="hub-svc">
                    <div className="hub-svc-icon">📈</div>
                    <span className="hub-svc-text">Structured rehabilitation programs</span>
                  </div>
                  <div className="hub-svc">
                    <div className="hub-svc-icon">🏅</div>
                    <span className="hub-svc-text">Best practice return to sport &amp; return to play</span>
                  </div>
                  <div className="hub-svc">
                    <div className="hub-svc-icon">📊</div>
                    <span className="hub-svc-text">Force plate testing &amp; performance benchmarking</span>
                  </div>
                </div>
              </div>
              <div className="dietitian-callout">
                <span className="diet-label">Sports Nutrition · Athlete Members</span>
                <div className="diet-title">
                  Elite Sports Dietitian.
                  <br />
                  Olympic &amp; Pro Credentials.
                </div>
                <p className="diet-desc">
                  Our resident sports dietitian has fuelled athletes at the highest levels of Australian sport — NRL, NBL basketball,
                  and Olympic programs. Now working with Athletix athletes to optimise every session and every plate. Available to
                  Athlete members.
                </p>
                <div className="diet-creds">
                  <span className="diet-cred">NRL Programs</span>
                  <span className="diet-cred">NBL Basketball</span>
                  <span className="diet-cred">Olympic Teams</span>
                  <span className="diet-cred">Accredited APD</span>
                </div>
              </div>
            </div>
            <div>
              <div className="hub-physios">
                <div className="physio-card">
                  <div className="physio-photo">
                    <img src="https://athletix.com.au/wp-content/uploads/2022/12/IMG_9100-scaled-e1670906460682.jpg" alt="Myles Burfield" />
                  </div>
                  <div className="physio-info">
                    <div className="physio-name">Myles Burfield</div>
                    <span className="physio-role">Head Physio · Specialist Sports &amp; Exercise Physio</span>
                    <p className="physio-exp">
                      Fellowship ACP · Australian Institute of Sport · Australian Olympic Canoe/Kayak Team Physio (Rio 2016 Bronze) ·
                      Cirque du Soleil · 16 yrs private practice · ACU Clinical Educator
                    </p>
                  </div>
                </div>
                <div className="physio-card">
                  <div className="physio-photo">
                    <img src="https://athletix.com.au/wp-content/uploads/2024/07/IMG-20240130-WA0019-e1727084066284.jpg" alt="Bridie Nicholson" />
                  </div>
                  <div className="physio-info">
                    <div className="physio-name">Bridie Nicholson</div>
                    <span className="physio-role">Physiotherapist · Titled Sport &amp; Exercise Physio</span>
                    <p className="physio-exp">
                      7+ yrs sports physio · Canadian Basketball Team · Brisbane Roar FC · NHL Ice Hockey · Para-Swimming · Running
                      &amp; Boxing
                    </p>
                  </div>
                </div>
              </div>
              <div className="hub-stat-row">
                <div className="hub-stat-box">
                  <span className="hub-stat-n">25+</span>
                  <span className="hub-stat-l">Yrs Combined XP</span>
                </div>
                <div className="hub-stat-box">
                  <span className="hub-stat-n">AIS</span>
                  <span className="hub-stat-l">Experience</span>
                </div>
                <div className="hub-stat-box">
                  <span className="hub-stat-n">Olympic</span>
                  <span className="hub-stat-l">Games Physio</span>
                </div>
              </div>
              <div style={{ marginTop: 3, background: "var(--card)", border: "1px solid var(--border)", padding: "24px 22px" }}>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--silver)" }}>
                  <strong style={{ color: "var(--white)" }}>
                    &quot;Your physio and your S&amp;C coach are in the same building, working from the same plan.&quot;
                  </strong>
                  <br />
                  <br />
                  No referral delays. No information gaps. No guessing. This is what integrated care actually looks like — and it&apos;s
                  what separates Athletix from every gym in Brisbane.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPACE */}
      <section className="space-section reveal">
        <div className="space-inner">
          <div className="kicker">The Floor</div>
          <h2 className="sec-title">Inside Athletix.</h2>
          <p className="sec-body">
            Open warehouse space. Elite equipment. A sprint track. Built for movement — not intimidation. Where champions train
            alongside beginners, and everyone belongs.
          </p>
          <div className="space-grid">
            <div className="space-cell tall">
              <img src="https://athletix.com.au/wp-content/uploads/2024/07/DSC02067-768x512.jpg" alt="Main floor" />
              <div className="s-grad" />
              <div className="space-label">
                <span>Main Training Floor</span>
                <strong>120sqm S&amp;C Area</strong>
              </div>
            </div>
            <div className="space-cell">
              <img src="https://athletix.com.au/wp-content/uploads/2024/06/DSC01921-768x512.jpg" alt="Sprint track" />
              <div className="s-grad" />
              <div className="space-label">
                <span>Performance</span>
                <strong>3-Lane Sprint Track</strong>
              </div>
            </div>
            <div className="space-cell">
              <img src="https://athletix.com.au/wp-content/uploads/2024/08/DSC06320-scaled-e1723546921926.jpg" alt="Coaching" />
              <div className="s-grad" />
              <div className="space-label">
                <span>Coaching</span>
                <strong>Small Group Sessions</strong>
              </div>
            </div>
            <div className="space-cell">
              <img src="https://athletix.com.au/wp-content/uploads/2022/01/Youth-sport-1-e1684274091394.png" alt="Youth" />
              <div className="s-grad" />
              <div className="space-label">
                <span>Youth</span>
                <strong>Athletic Development</strong>
              </div>
            </div>
            <div className="space-cell">
              <img src="https://athletix.com.au/wp-content/uploads/2024/06/ATHLETIX-AFT-53-scaled-e1733206277887.jpg" alt="Athletes" />
              <div className="s-grad" />
              <div className="space-label">
                <span>Elite</span>
                <strong>Athlete Programs</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section reveal">
        <div className="testi-inner">
          <div className="kicker">Member Stories</div>
          <h2 className="sec-title">
            What Our
            <br />
            Members Say.
          </h2>
          <p className="sec-body">
            Real people. Real results. Hear directly from the athletes, parents, and everyday members who train with us every week.
          </p>
          <div className="testi-grid">
            <div className="testi-card">
              <div className="testi-video" onClick={toggleVid}>
                <video preload="none" loop>
                  <source src="https://athletix.com.au/wp-content/uploads/2024/07/Testimonial-2-Website.mp4" type="video/mp4" />
                </video>
                <div className="testi-play">
                  <div className="play-ring">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="testi-quote">
                &quot;The coaches here genuinely care. <strong>It&apos;s not just a gym — it&apos;s a community</strong> where everyone
                pushes each other to be better every single session.&quot;
              </p>
              <div className="testi-person">
                <div className="testi-avatar">💪</div>
                <div>
                  <div className="testi-name">Athletix Member</div>
                  <span className="testi-meta">Adult Program</span>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-video" onClick={toggleVid}>
                <video preload="none" loop>
                  <source src="https://athletix.com.au/wp-content/uploads/2024/07/Testimonial-1-Website.mp4" type="video/mp4" />
                </video>
                <div className="testi-play">
                  <div className="play-ring">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="testi-quote">
                &quot;I never thought I&apos;d be the type of person to love training. <strong>The coaches met me where I was</strong>{" "}
                and I haven&apos;t looked back since joining.&quot;
              </p>
              <div className="testi-person">
                <div className="testi-avatar">🏃</div>
                <div>
                  <div className="testi-name">Athletix Member</div>
                  <span className="testi-meta">Adult Program</span>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-video" onClick={toggleVid}>
                <video preload="none" loop>
                  <source src="https://athletix.com.au/wp-content/uploads/2024/07/DARCY.mp4" type="video/mp4" />
                </video>
                <div className="testi-play">
                  <div className="play-ring">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="testi-quote">
                &quot;<strong>Best decision I made for my athletic career.</strong> The level of coaching and the science here is the
                same as what the pros get. No question.&quot;
              </p>
              <div className="testi-person">
                <div className="testi-avatar">🏆</div>
                <div>
                  <div className="testi-name">Darcy</div>
                  <span className="testi-meta">Athlete Program</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="membership-section reveal" id="membership">
        <div className="membership-inner">
          <div className="kicker">Join Athletix</div>
          <h2 className="sec-title">Membership Plans.</h2>
          <p className="sec-body">
            Choose the plan that matches where you are today. Weekly billing, flexible upgrades, full facility access from day one.
          </p>
          <div className="membership-grid">
            <div className="plan-card">
              <div className="plan-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/2.png" alt="Youth" />
                <div className="plan-img-grad" />
              </div>
              <div className="plan-content">
                <div className="plan-tier">Ages 8–17</div>
                <div className="plan-name">Youth</div>
                <div className="plan-price">
                  <span className="plan-price-n">$42</span>
                  <span className="plan-price-p">/ week</span>
                </div>
                <ul className="plan-features">
                  <li>Unlimited Classes</li>
                  <li>Free benchmark test days</li>
                  <li>30 min 1-on-1 consultation</li>
                  <li>Physio Screening</li>
                  <li>All Area Access</li>
                </ul>
                <button className="btn-plan-out" onClick={() => scrollTo("book")}>
                  View Options
                </button>
              </div>
            </div>
            <div className="plan-card featured">
              <div className="plan-badge">Most Popular</div>
              <div className="plan-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/DSC06320-scaled-e1723546921926.jpg" alt="Adults" />
                <div className="plan-img-grad" />
              </div>
              <div className="plan-content">
                <div className="plan-tier">All Levels</div>
                <div className="plan-name">Adults</div>
                <div className="plan-price">
                  <span className="plan-price-n">$50</span>
                  <span className="plan-price-p">/ week</span>
                </div>
                <ul className="plan-features">
                  <li>Unlimited Classes</li>
                  <li>Free benchmark test days</li>
                  <li>30 min 1-on-1 consultation</li>
                  <li>Physio Screening</li>
                  <li>S&amp;C Consultation</li>
                  <li>All Area Access</li>
                </ul>
                <button className="btn-plan" onClick={() => scrollTo("book")}>
                  View Options
                </button>
              </div>
            </div>
            <div className="plan-card">
              <div className="plan-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/08/DSC06236-scaled-e1733203149463.jpg" alt="Family" />
                <div className="plan-img-grad" />
              </div>
              <div className="plan-content">
                <div className="plan-tier">All Ages</div>
                <div className="plan-name">Family</div>
                <div className="plan-price">
                  <span className="plan-price-n">$120</span>
                  <span className="plan-price-p">/ week</span>
                </div>
                <ul className="plan-features">
                  <li>Unlimited Classes</li>
                  <li>Free benchmark test days</li>
                  <li>30 min 1-on-1 consultation</li>
                  <li>Physio Screening</li>
                  <li>S&amp;C Consultation</li>
                  <li>All Area Access</li>
                </ul>
                <button className="btn-plan-out" onClick={() => scrollTo("book")}>
                  View Options
                </button>
              </div>
            </div>
            <div className="plan-card">
              <div className="plan-img">
                <img src="https://athletix.com.au/wp-content/uploads/2024/06/ATHLETIX-AFT-53-scaled-e1733206277887.jpg" alt="Athlete" />
                <div className="plan-img-grad" />
              </div>
              <div className="plan-content">
                <div className="plan-tier">12-Month Subscription</div>
                <div className="plan-name">Athlete</div>
                <div className="plan-price">
                  <span className="plan-price-n">$150</span>
                  <span className="plan-price-p">/ week</span>
                </div>
                <ul className="plan-features">
                  <li>Unlimited Force Plate Tests</li>
                  <li>Unlimited Classes</li>
                  <li>Dedicated Coach</li>
                  <li>Weekly PT Session</li>
                  <li>Sports Dietitian Access</li>
                  <li>All Area Access</li>
                </ul>
                <button className="btn-plan-out" onClick={() => scrollTo("book")}>
                  View Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section reveal">
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
            <button className="btn-primary" onClick={() => scrollTo("book")}>
              Claim Your Trial
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("membership")}>
              See All Plans
            </button>
          </div>
        </div>
      </div>

      {/* BOOK (formerly footer) */}
      <section className="book-section" id="book">
        <div className="book-top">
          <div>
            <div className="f-logo">
              <div className="f-hex">
                <span>A</span>
              </div>
              ATHLETIX
            </div>
            <p className="f-tagline">
              Elite S&amp;C coaching, sports physiotherapy, and sports nutrition — all under one roof. World-class expertise, built for
              every level. Fortitude Valley, Brisbane.
            </p>
            <div className="f-contacts">
              <div className="f-contact-row">
                <div className="f-contact-icon">📍</div>42 Baxter Street, Fortitude Valley QLD 4006
              </div>
              <div className="f-contact-row">
                <div className="f-contact-icon">📞</div>0499 981 286
              </div>
              <div className="f-contact-row">
                <div className="f-contact-icon">✉️</div>info@athletix.com.au
              </div>
              <div className="f-contact-row">
                <div className="f-contact-icon">🕐</div>Mon/Wed/Fri 5:15am–7:30pm · Tue/Thu 6am–7:30pm · Sat 6am–11:30am
              </div>
            </div>
          </div>
          <div>
            <div className="f-form-title">Book Your Trial.</div>
            <p className="f-form-sub">Tell us about yourself and we&apos;ll have you on the floor this week.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="frow">
                <div className="ff">
                  <label className="flbl">Full Name</label>
                  <input className="finput" type="text" placeholder="John Athlete" />
                </div>
                <div className="ff">
                  <label className="flbl">Phone</label>
                  <input className="finput" type="tel" placeholder="04XX XXX XXX" />
                </div>
              </div>
              <div className="ff">
                <label className="flbl">Email</label>
                <input className="finput" type="email" placeholder="you@email.com" />
              </div>
              <div className="ff">
                <label className="flbl">I&apos;m Joining As</label>
                <select className="finput" defaultValue="">
                  <option value="">— Select —</option>
                  <option>Adult Member</option>
                  <option>Youth (Under 17)</option>
                  <option>Family</option>
                  <option>Athlete / Sub-Elite</option>
                  <option>NDIS Participant</option>
                </select>
              </div>
              <div className="ff">
                <label className="flbl">What&apos;s Your Goal?</label>
                <input className="finput" type="text" placeholder="e.g. Get stronger, return from injury, my kid loves sport..." />
              </div>
              <button type="submit" className="btn-submit">
                Claim My $7 Trial
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
