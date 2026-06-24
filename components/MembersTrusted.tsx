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

  return (
    <div className="home-v2" ref={rootRef}>
      <link rel="stylesheet" href="/css/home-v2.css" />

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
