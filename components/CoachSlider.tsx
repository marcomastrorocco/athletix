"use client";

import { useEffect, useRef, useState } from "react";
import type { Coach } from "@/lib/data";

type Props = {
  coaches: Coach[];
  visible?: number;
  autoMs?: number;
};

function bioTeaser(bio?: string): string {
  if (!bio) return "";
  // Strip markdown emphasis and grab first paragraph
  const firstPara = bio.split(/\n\n/)[0] || bio;
  return firstPara.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
}

export default function CoachSlider({
  coaches,
  visible = 4,
  autoMs = 5000,
}: Props) {
  const total = coaches.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [viewport, setViewport] = useState(visible);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive: 1 / 2 / 3 / `visible` cards depending on viewport width
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setViewport(1);
      else if (w < 960) setViewport(2);
      else if (w < 1280) setViewport(3);
      else setViewport(visible);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [visible]);

  const maxIndex = Math.max(0, total - viewport);
  const safeIndex = Math.min(index, maxIndex);

  // Auto-advance
  useEffect(() => {
    if (paused || total <= viewport) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1 > maxIndex ? 0 : i + 1));
    }, autoMs);
    return () => clearInterval(t);
  }, [paused, autoMs, maxIndex, total, viewport]);

  // Keyboard left/right
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 < 0 ? maxIndex : i - 1));
      else if (e.key === "ArrowRight")
        setIndex((i) => (i + 1 > maxIndex ? 0 : i + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [maxIndex]);

  if (total === 0) return null;

  const cardPct = 100 / viewport;
  const offset = -(safeIndex * cardPct);

  return (
    <div
      className="ot-slider"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ot-slider-viewport">
        <div
          ref={trackRef}
          className="ot-slider-track"
          style={{
            transform: `translateX(${offset}%)`,
            transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          {coaches.map((c) => (
            <div
              key={c.id}
              className="ot-slide-item"
              style={{ flex: `0 0 ${cardPct}%` }}
            >
              <article className="ot-coach-card">
                <div className="ot-coach-card-photo">
                  <img src={c.image} alt={c.name} loading="lazy" />
                  <div className="ot-coach-card-overlay">
                    <p className="ot-coach-card-role">{c.role}</p>
                  </div>
                </div>

                <div className="ot-coach-card-body">
                  <h3 className="ot-coach-card-name">{c.name}</h3>
                  {c.bio && (
                    <p className="ot-coach-card-bio">{bioTeaser(c.bio)}</p>
                  )}

                  {c.qualifications && c.qualifications.length > 0 && (
                    <ul className="ot-coach-card-quals">
                      {c.qualifications.slice(0, 3).map((q, j) => (
                        <li key={j}>
                          <span className="ot-tick">✓</span>
                          <span>{q}</span>
                        </li>
                      ))}
                      {c.qualifications.length > 3 && (
                        <li className="ot-coach-card-more">
                          + {c.qualifications.length - 3} more
                        </li>
                      )}
                    </ul>
                  )}

                  {(c.linkedin || c.instagram) && (
                    <div className="ot-coach-card-socials">
                      {c.linkedin && (
                        <a
                          href={c.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${c.name} on LinkedIn`}
                        >
                          in
                        </a>
                      )}
                      {c.instagram && (
                        <a
                          href={c.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${c.name} on Instagram`}
                        >
                          ◉
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="ot-slider-nav">
        <button
          type="button"
          className="ot-slider-arrow ot-slider-arrow--prev"
          aria-label="Previous coaches"
          onClick={() =>
            setIndex((i) => (i - 1 < 0 ? maxIndex : i - 1))
          }
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className="ot-slider-dots"
          role="tablist"
          aria-label="Coach pages"
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Go to page ${i + 1}`}
              className={`ot-slider-dot${i === safeIndex ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="ot-slider-arrow ot-slider-arrow--next"
          aria-label="Next coaches"
          onClick={() =>
            setIndex((i) => (i + 1 > maxIndex ? 0 : i + 1))
          }
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
