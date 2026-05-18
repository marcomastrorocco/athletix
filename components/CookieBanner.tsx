"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "athletix-cookie-consent";

type Choice = "accepted" | "rejected";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Small delay so the banner animates in after page paint
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      document.cookie = `${STORAGE_KEY}=${choice};path=/;max-age=${
        60 * 60 * 24 * 365
      };SameSite=Lax`;
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-icon" aria-hidden>
          🍪
        </div>
        <div className="cookie-banner-copy">
          <h4>We use cookies</h4>
          <p>
            We use cookies to improve your browsing experience, analyse site
            traffic and personalise content. By clicking{" "}
            <strong>Accept</strong>, you agree to our use of cookies.{" "}
            <a href="/privacy-policy">Read our Privacy Policy</a>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-ghost"
            onClick={() => decide("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-primary"
            onClick={() => decide("accepted")}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
