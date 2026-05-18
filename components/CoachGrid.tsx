"use client";

import { useEffect, useState } from "react";
import type { Coach } from "@/lib/data";

type Props = { coaches: Coach[] };

export default function CoachGrid({ coaches }: Props) {
  const [active, setActive] = useState<Coach | null>(null);

  // Lock body scroll while modal is open + close on Escape
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="elite-coaches-grid">
        {coaches.map((c) => (
          <button
            key={c.id}
            type="button"
            className="elite-coach-card coach-trigger"
            onClick={() => setActive(c)}
            aria-haspopup="dialog"
            aria-label={`View profile for ${c.name}`}
          >
            <div className="elite-coach-photo">
              <img src={c.image} alt={c.name} />
              <div className="coach-trigger-overlay">
                <span>View Profile →</span>
              </div>
            </div>
            <div className="elite-coach-meta">
              <p className="elite-role">{c.role}</p>
              <h3>{c.displayName}</h3>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="coach-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coach-modal-title"
          onClick={() => setActive(null)}
        >
          <div
            className="coach-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="coach-modal-close"
              aria-label="Close profile"
              onClick={() => setActive(null)}
            >
              ×
            </button>

            <div className="coach-modal-media">
              <img src={active.image} alt={active.name} />
            </div>

            <div className="coach-modal-body">
              <p className="coach-modal-role">{active.role}</p>
              <h2 id="coach-modal-title" className="coach-modal-name">
                {active.name}
              </h2>
              {active.experience && (
                <p className="coach-modal-meta">
                  <span>{active.experience}</span> coaching experience
                </p>
              )}

              {active.bio && <p className="coach-modal-bio">{active.bio}</p>}

              {active.qualifications && active.qualifications.length > 0 && (
                <section className="coach-modal-section">
                  <h3>Qualifications</h3>
                  <ul>
                    {active.qualifications.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </section>
              )}

              {active.specialties && active.specialties.length > 0 && (
                <section className="coach-modal-section">
                  <h3>Specialties</h3>
                  <ul>
                    {active.specialties.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </section>
              )}

              {active.sports && active.sports.length > 0 && (
                <section className="coach-modal-section">
                  <h3>Sports &amp; Clients</h3>
                  <div className="coach-modal-chips">
                    {active.sports.map((sp) => (
                      <span key={sp} className="coach-chip">
                        {sp}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {active.linkedin && (
                <a
                  className="coach-modal-link"
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
