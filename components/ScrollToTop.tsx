"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${visible ? " is-visible" : ""}`}
      aria-label="Scroll to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 5l-7 7M12 5l7 7M12 5v14"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
