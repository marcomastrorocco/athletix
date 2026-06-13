"use client";

import {
  Trophy,
  Dumbbell,
  Users,
  Zap,
  Microscope,
  TrendingUp,
  Medal,
  BarChart,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import type { HomeTestimonials } from "@/lib/data";

const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  trophy: Trophy,
  dumbbell: Dumbbell,
  users: Users,
  zap: Zap,
  microscope: Microscope,
  "trending-up": TrendingUp,
  medal: Medal,
  "bar-chart": BarChart,
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const C = ICONS[name?.toLowerCase?.()] ?? Trophy;
  return <C size={size} strokeWidth={1.75} />;
}

/**
 * The same testimonials block used on the home page (video cards + quotes +
 * community stories). Styles come from the scoped `home-v3.css` (`@scope
 * (.ax-home)`), so the whole block is wrapped in `.ax-home` and the stylesheet
 * is loaded here, keeping the component self-contained and reusable on any page.
 */
export default function TestimonialsSection({
  data,
}: {
  data: HomeTestimonials;
}) {
  const toggleVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = e.currentTarget;
    const v = wrap.querySelector("video") as HTMLVideoElement | null;
    const play = wrap.querySelector(".testi-play") as HTMLElement | null;
    if (!v) return;
    if (v.paused) {
      document
        .querySelectorAll<HTMLVideoElement>(".testi-video video")
        .forEach((x) => x.pause());
      document
        .querySelectorAll<HTMLElement>(".testi-play")
        .forEach((x) => (x.style.opacity = "1"));
      v.play();
      if (play) play.style.opacity = "0";
    } else {
      v.pause();
      if (play) play.style.opacity = "1";
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/css/home-v3.css" />

      <div className="ax-home">
        <section className="testi-section">
          <div className="testi-inner">
            <div className="kicker">{data.kicker}</div>
            <h2 className="sec-title">
              {data.h2Top}
              <br />
              <em>{data.h2Em}</em>
            </h2>

            <div className="hero-quote">
              <p className="hero-quote-text">
                &ldquo;{data.heroQuoteText}
                <em>{data.heroQuoteEm}</em>&rdquo;
              </p>
              <p className="hero-quote-attr">{data.heroQuoteAttr}</p>
            </div>

            <div className="testi-grid">
              {data.videos.map((t, i) => (
                <div key={i} className="testi-card">
                  <div className="testi-video" onClick={toggleVideo}>
                    <video
                      preload="none"
                      poster={t.src.replace(/\.[^/.]+$/, ".jpg")}
                      loop
                      playsInline
                    >
                      <source src={t.src} type="video/mp4" />
                    </video>
                    <div className="testi-play">
                      <div className="play-ring">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="testi-quote">
                    &ldquo;{t.quote}
                    <strong>{t.bold}</strong>
                    {t.tail}&rdquo;
                  </p>
                  <div className="testi-person">
                    <div className="testi-avatar">{t.avatar}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <span className="testi-meta">{t.meta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="community-stories">
              {data.stories.map((s, i) => (
                <div key={i} className="story-card">
                  <div className="story-head">
                    <span className="story-icon">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <div className="story-title">
                      {s.titleTop} <em>{s.titleEm}</em>
                    </div>
                  </div>
                  <p className={`story-body${s.isQuote ? " quote" : ""}`}>
                    {s.isQuote ? <>&ldquo;{s.body}&rdquo;</> : s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
