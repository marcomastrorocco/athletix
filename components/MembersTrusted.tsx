"use client";

import { useEffect, useRef } from "react";

export default function MembersTrusted() {
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

  const seekToMiddle = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.dataset.posterSet === "1") return;
    if (v.duration && isFinite(v.duration)) {
      v.currentTime = v.duration / 2;
      v.dataset.posterSet = "1";
    }
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
                <video preload="metadata" loop onLoadedMetadata={seekToMiddle}>
                  <source src="/image/video/Testimonial-2-Website.mp4" type="video/mp4" />
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
                <video preload="metadata" loop onLoadedMetadata={seekToMiddle}>
                  <source src="/image/video/Testimonial-1-Website.mp4" type="video/mp4" />
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
                <video preload="metadata" loop onLoadedMetadata={seekToMiddle}>
                  <source src="/image/video/DARCY.mp4" type="video/mp4" />
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

      {/* TRUST */}
      <div className="trust-wrap reveal">
        <div className="trust-inner">
          <h2 className="trust-h">Trusted by Brisbane&apos;s Elite Clubs &amp; Institutions</h2>
          <p className="trust-tagline">
            The coaches and physios who work with <strong>professional athletes</strong> choose Athletix for their own players. If they
            trust us — you can too.
          </p>
          <div className="logo-row">
            <div className="logo-pill"><img src="/image/Trusted%20By/brisbane-lions-logo.png" alt="Brisbane Lions" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/cricket-australia-logo.png" alt="Cricket Australia" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/Queensland-Bulls.png" alt="Queensland Bulls" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/gold-coast-titans-logo.png" alt="Gold Coast Titans" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/Brisbane-Bullets-logo.png" alt="Brisbane Bullets" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/kisspng-brisbane-heat-logo.png" alt="Brisbane Heat" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/Baseball_Australia_logo.png" alt="Baseball Australia" /></div>
            <div className="logo-pill"><img src="/image/Trusted%20By/crest-villanova-crest-logo.png" alt="Villanova College" /></div>
          </div>
          <p className="trust-quote">
            &quot;The same science, the same standards, the same care used by <strong>NRL, cricket, and basketball clubs</strong> —
            built into a facility where every kid, adult, and family in Brisbane can access it.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
