"use client";

import { useEffect, useRef, useState } from "react";

type TrainingAs = "Adult" | "Youth" | "Family" | "Athlete";

const LOGOS = [
  { src: "/image/Trusted%20By/Baseball_Australia_logo.png", alt: "Baseball Australia" },
  { src: "/image/Trusted%20By/Brisbane-Bullets-logo.png", alt: "Brisbane Bullets" },
  { src: "/image/Trusted%20By/brisbane-lions-logo.png", alt: "Brisbane Lions" },
  { src: "/image/Trusted%20By/crest-villanova-crest-logo.png", alt: "Villanova" },
  { src: "/image/Trusted%20By/cricket-australia-logo.png", alt: "Cricket Australia" },
  { src: "/image/Trusted%20By/gold-coast-titans-logo.png", alt: "Gold Coast Titans" },
  { src: "/image/Trusted%20By/kisspng-brisbane-heat-logo.png", alt: "Brisbane Heat" },
  { src: "/image/Trusted%20By/Queensland-Bulls.png", alt: "Queensland Bulls" },
];

type Props = { open: boolean; onClose: () => void };

const CLOSE_DURATION = 350;

export default function BookTrialModal({ open, onClose }: Props) {
  const [trainingAs, setTrainingAs] = useState<TrainingAs>("Adult");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setMounted(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      return () => cancelAnimationFrame(raf);
    }
    if (mounted) {
      setAnimateIn(false);
      closeTimer.current = setTimeout(() => setMounted(false), CLOSE_DURATION);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Trial submission:", { ...form, trainingAs });
    alert("Thanks! A coach will call you within 24 hours.");
    onClose();
  };

  return (
    <>
      <link rel="stylesheet" href="/css/trial-modal.css" />
      <div
        className={`tm-overlay${animateIn ? " tm-open" : ""}`}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div className="tm-modal" onClick={(e) => e.stopPropagation()}>
          <button className="tm-close" onClick={onClose} aria-label="Close">
            ×
          </button>

          <div className="tm-left">
            <div className="tm-pill">
              <span className="tm-pill-dot" />
              Limited Trial Offer
            </div>

            <h2 className="tm-title">Start Training With The Pros</h2>
            <p className="tm-sub">
              Brisbane&apos;s elite strength &amp; conditioning gym — built for athletes, open to everyone.
            </p>

            <div className="tm-price">
              <div className="tm-price-main">
                <span className="tm-dollar">$</span>
                <span className="tm-amount">7</span>
                <div className="tm-price-info">
                  <span className="tm-price-label">For 7 Days</span>
                  <span className="tm-usually">Usually $89</span>
                </div>
              </div>
              <span className="tm-refund">100% Refundable</span>
            </div>

            <p className="tm-desc">
              ATHLETIX is an Elite Athletic Development Center and Strength &amp; Conditioning Gym for youth and adults of all ages,
              providing a systematic and evidence-based approach to training and developing athletic excellence. Currently we are
              offering a <strong>7-day All Inclusive access</strong> to all Classes and testing equipment for only $7 —{" "}
              <strong>fully refundable</strong> on signup. Call Us on <strong>0499 981 286</strong> or complete the form to{" "}
              <strong>book your trial</strong> today!
            </p>

            <h4 className="tm-trusted-h">Trusted By</h4>
            <div className="tm-logos">
              {LOGOS.map((logo) => (
                <div className="tm-logo-cell" key={logo.alt}>
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>

          <div className="tm-right">
            <h3 className="tm-form-title">Reserve Your Spot</h3>
            <p className="tm-form-sub">
              A coach will call within <strong>24 hours</strong> to lock it in.
            </p>

            <form className="tm-form" onSubmit={onSubmit}>
              <div className="tm-field">
                <input
                  id="tm-name"
                  type="text"
                  placeholder=" "
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label htmlFor="tm-name">
                  Full Name <span>*</span>
                </label>
              </div>

              <div className="tm-field">
                <input
                  id="tm-email"
                  type="email"
                  placeholder=" "
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <label htmlFor="tm-email">
                  Email address <span>*</span>
                </label>
              </div>

              <div className="tm-field">
                <input
                  id="tm-phone"
                  type="tel"
                  placeholder=" "
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <label htmlFor="tm-phone">
                  Phone number <span>*</span>
                </label>
              </div>

              <div className="tm-radio-group">
                <label className="tm-radio-label">I&apos;m training as</label>
                <div className="tm-radio-pills" role="radiogroup">
                  {(["Adult", "Youth", "Family", "Athlete"] as TrainingAs[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={trainingAs === opt}
                      className={`tm-radio-pill${trainingAs === opt ? " active" : ""}`}
                      onClick={() => setTrainingAs(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="tm-submit">
                Claim My Trial
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>

              <div className="tm-foot">
                <span>🔒 No credit card needed</span>
                <span>
                  📞 Or call <strong>0499 981 286</strong>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
