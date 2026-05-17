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

const CLOSE_DURATION = 450;

type Status = "idle" | "sending" | "success" | "error";

export default function BookTrialModal({ open, onClose }: Props) {
  const [trainingAs, setTrainingAs] = useState<TrainingAs>("Adult");
  const [form, setForm] = useState({ name: "", email: "", phone: "", hp: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
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
      closeTimer.current = setTimeout(() => {
        setMounted(false);
        setStatus("idle");
        setErrorMsg("");
        setForm({ name: "", email: "", phone: "", hp: "" });
      }, CLOSE_DURATION);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          trainingAs,
          source: "Book Trial popup (header)",
          _hp: form.hp,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
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
            {status === "success" ? (
              <div className="tm-success" role="status" aria-live="polite">
                <div className="tm-success-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3 className="tm-form-title">You&apos;re In, {form.name.split(" ")[0] || "Champion"}!</h3>
                <p className="tm-form-sub">
                  We&apos;ve received your details. A coach will call <strong>{form.phone}</strong> within{" "}
                  <strong>24 hours</strong> to lock in your 7-day trial.
                </p>
                <button type="button" className="tm-submit" onClick={onClose}>
                  Close
                </button>
                <div className="tm-foot">
                  <span>
                    📞 Need it sooner? Call <strong>0499 981 286</strong>
                  </span>
                </div>
              </div>
            ) : (
              <>
                <h3 className="tm-form-title">Reserve Your Spot</h3>
                <p className="tm-form-sub">
                  A coach will call within <strong>24 hours</strong> to lock it in.
                </p>

                <form className="tm-form" onSubmit={onSubmit} noValidate>
                  <div className="tm-field">
                    <input
                      id="tm-name"
                      type="text"
                      placeholder=" "
                      required
                      autoComplete="name"
                      disabled={status === "sending"}
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
                      autoComplete="email"
                      disabled={status === "sending"}
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
                      autoComplete="tel"
                      disabled={status === "sending"}
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
                          disabled={status === "sending"}
                          className={`tm-radio-pill${trainingAs === opt ? " active" : ""}`}
                          onClick={() => setTrainingAs(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Honeypot — hidden from real users, bots fill it */}
                  <div className="tm-hp" aria-hidden>
                    <label htmlFor="tm-hp">Leave this field empty</label>
                    <input
                      id="tm-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.hp}
                      onChange={(e) => setForm({ ...form, hp: e.target.value })}
                    />
                  </div>

                  {status === "error" && (
                    <div className="tm-error" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="tm-submit" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <span className="tm-spinner" aria-hidden />
                        Sending&hellip;
                      </>
                    ) : (
                      <>
                        Claim My Trial
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="tm-foot">
                    <span>🔒 No credit card needed</span>
                    <span>
                      📞 Or call <strong>0499 981 286</strong>
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
