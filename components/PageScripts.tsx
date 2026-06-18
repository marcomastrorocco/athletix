"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-runs page-level interactive scripts after every route change.
 * Mirrors the logic in the legacy /js/script.js (rotator, hero tilt,
 * counters, testimonials slider, marquee duplicator, reveal-on-scroll).
 * Header/SidePanel interactivity is handled inside Header.tsx, not here.
 */
export default function PageScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // Duplicate partner row for seamless marquee
    const partnerRow = document.querySelector(".partner-row");
    if (partnerRow && !partnerRow.hasAttribute("data-doubled")) {
      partnerRow.innerHTML += partnerRow.innerHTML;
      partnerRow.setAttribute("data-doubled", "true");
    }

    // Hero word rotator
    const words = document.querySelectorAll<HTMLElement>(
      ".rotator-inline .r-word"
    );
    if (words.length) {
      let i = 0;
      const id = window.setInterval(() => {
        const current = words[i];
        const next = words[(i + 1) % words.length];
        current.classList.remove("active");
        current.classList.add("leaving");
        next.classList.add("active");
        window.setTimeout(() => current.classList.remove("leaving"), 700);
        i = (i + 1) % words.length;
      }, 2400);
      cleanups.push(() => window.clearInterval(id));
    }

    // Hero image 3D tilt
    const media = document.getElementById("heroMedia");
    if (media) {
      const maxTilt = 8;
      let raf = 0;
      const onMove = (e: MouseEvent) => {
        const rect = media.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          media.classList.add("tilt");
          media.style.transform = `perspective(1200px) rotateY(${
            x * maxTilt
          }deg) rotateX(${-y * maxTilt}deg) scale(1.02)`;
        });
      };
      const onLeave = () => {
        media.classList.remove("tilt");
        media.style.transform = "";
      };
      media.addEventListener("mousemove", onMove);
      media.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        media.removeEventListener("mousemove", onMove);
        media.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
      });
    }

    // Animated counters
    const counters = document.querySelectorAll<HTMLElement>(
      ".hero-meta [data-count]"
    );
    if (counters.length) {
      const animate = (el: HTMLElement) => {
        const target = parseInt(el.dataset.count || "0", 10);
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        };
        requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target as HTMLElement);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => io.observe(c));
      cleanups.push(() => io.disconnect());
    }

    // Testimonials slider
    const track = document.getElementById("testimonialTrack");
    const prevBtn = document.querySelector<HTMLButtonElement>(".prev-btn");
    const nextBtn = document.querySelector<HTMLButtonElement>(".next-btn");
    const dotsContainer = document.getElementById("testimonialDots");
    if (track && prevBtn && nextBtn) {
      let currentIndex = 0;
      const cards = track.children;
      const totalCards = cards.length;
      let autoSlideInterval: number | null = null;
      let isVideoPlaying = false;

      const getCardsToShow = () => {
        if (window.innerWidth <= 720) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      };
      const getMaxIndex = () => Math.max(0, totalCards - getCardsToShow());

      const renderDots = () => {
        if (!dotsContainer) return;
        const dotCount = getMaxIndex() + 1;
        if (dotsContainer.children.length === dotCount) return;
        dotsContainer.innerHTML = "";
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "slider-dot";
          dot.setAttribute("aria-label", `Go to testimonial set ${i + 1}`);
          dot.dataset.index = String(i);
          dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlider();
            startAutoSlide();
          });
          dotsContainer.appendChild(dot);
        }
      };

      const updateActiveDot = () => {
        if (!dotsContainer) return;
        Array.from(dotsContainer.children).forEach((dot, idx) => {
          dot.classList.toggle("active", idx === currentIndex);
        });
      };

      const updateSlider = () => {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        const cardWidth = (cards[0] as HTMLElement).offsetWidth;
        const moveAmount = currentIndex * (cardWidth + 30);
        track.style.transform = `translateX(-${moveAmount}px)`;
        renderDots();
        updateActiveDot();
      };

      const stopAutoSlide = () => {
        if (autoSlideInterval) window.clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      };
      const startAutoSlide = () => {
        stopAutoSlide();
        if (isVideoPlaying) return;
        autoSlideInterval = window.setInterval(() => {
          const maxIndex = getMaxIndex();
          if (currentIndex < maxIndex) currentIndex++;
          else currentIndex = 0;
          updateSlider();
        }, 4000);
      };

      const onPrev = () => {
        if (currentIndex > 0) currentIndex--;
        else currentIndex = getMaxIndex();
        updateSlider();
        startAutoSlide();
      };
      const onNext = () => {
        if (currentIndex < getMaxIndex()) currentIndex++;
        else currentIndex = 0;
        updateSlider();
        startAutoSlide();
      };
      const onResize = () => requestAnimationFrame(updateSlider);

      prevBtn.addEventListener("click", onPrev);
      nextBtn.addEventListener("click", onNext);
      window.addEventListener("resize", onResize);

      const cardArr = Array.from(cards);
      const videoCleanups: Array<() => void> = [];
      cardArr.forEach((card) => {
        const vid = card.querySelector("video");
        if (!vid) return;
        const onPlay = () => {
          isVideoPlaying = true;
          stopAutoSlide();
          cardArr.forEach((c) => {
            const otherVid = c.querySelector("video");
            if (otherVid && otherVid !== vid) {
              otherVid.pause();
              c.classList.remove("is-playing");
              otherVid.removeAttribute("controls");
            }
          });
          card.classList.add("is-playing");
          vid.setAttribute("controls", "true");
        };
        const onPause = () => {
          const anyPlaying = cardArr.some((c) => {
            const v = c.querySelector("video");
            return v && !v.paused && !v.ended;
          });
          if (!anyPlaying) {
            isVideoPlaying = false;
            startAutoSlide();
          }
        };
        const onCardClick = () => {
          if (!card.classList.contains("is-playing")) vid.play();
        };
        vid.addEventListener("play", onPlay);
        vid.addEventListener("pause", onPause);
        card.addEventListener("click", onCardClick);
        videoCleanups.push(() => {
          vid.removeEventListener("play", onPlay);
          vid.removeEventListener("pause", onPause);
          card.removeEventListener("click", onCardClick);
        });
      });

      const onMouseEnter = () => stopAutoSlide();
      const onMouseLeave = () => {
        if (!isVideoPlaying) startAutoSlide();
      };
      track.addEventListener("mouseenter", onMouseEnter);
      track.addEventListener("mouseleave", onMouseLeave);

      updateSlider();
      startAutoSlide();
      const settleId = window.setTimeout(updateSlider, 200);

      cleanups.push(() => {
        stopAutoSlide();
        prevBtn.removeEventListener("click", onPrev);
        nextBtn.removeEventListener("click", onNext);
        window.removeEventListener("resize", onResize);
        track.removeEventListener("mouseenter", onMouseEnter);
        track.removeEventListener("mouseleave", onMouseLeave);
        window.clearTimeout(settleId);
        videoCleanups.forEach((fn) => fn());
      });
    }

    // Reveal on scroll
    const revealTargets = document.querySelectorAll(
      ".section-head, .class-card, .program, .plan-card, .elite-coach-card, .manifesto-copy, .manifesto-image, .tt-item, .contact-copy, .contact-form, .trial-inner"
    );
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Reveal when entering the viewport OR when already scrolled past
          // (bottom <= 0). The latter handles browser back-navigation where
          // scroll restoration lands mid/bottom of the page — without it,
          // every target above the restored scroll position stays at
          // opacity:0 and the page looks black.
          if (e.isIntersecting || e.boundingClientRect.bottom <= 0) {
            e.target.classList.add("visible");
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => revealIO.observe(el));

    // Failsafe: reveal anything already at or above the viewport. Re-run
    // across a few frames/timeouts to catch the browser's scroll restoration
    // whenever it lands (it can fire before or after this effect).
    const revealAtOrAbove = () => {
      const vh = window.innerHeight;
      revealTargets.forEach((el) => {
        if (el.getBoundingClientRect().top < vh) {
          el.classList.add("visible");
          revealIO.unobserve(el);
        }
      });
    };
    revealAtOrAbove();
    const revealRaf = requestAnimationFrame(() => {
      revealAtOrAbove();
      requestAnimationFrame(revealAtOrAbove);
    });
    const revealT1 = window.setTimeout(revealAtOrAbove, 60);
    const revealT2 = window.setTimeout(revealAtOrAbove, 250);
    cleanups.push(() => {
      revealIO.disconnect();
      cancelAnimationFrame(revealRaf);
      window.clearTimeout(revealT1);
      window.clearTimeout(revealT2);
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
