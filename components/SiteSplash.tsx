"use client";

import { useEffect, useState } from "react";
import AthletixLoader from "./AthletixLoader";

const FADE_MS = 250;
const HARD_CAP_MS = 1500;
const SESSION_KEY = "athletix.splash.seen";

export default function SiteSplash() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    let cancelled = false;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setPhase("gone");
        return;
      }
    } catch {}

    const fade = () => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setPhase("fading");
    };

    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      requestAnimationFrame(fade);
    } else {
      document.addEventListener("DOMContentLoaded", fade, { once: true });
    }

    const hardCap = window.setTimeout(fade, HARD_CAP_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(hardCap);
      document.removeEventListener("DOMContentLoaded", fade);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = window.setTimeout(() => setPhase("gone"), FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "gone") {
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
  }, [phase]);

  if (phase === "gone") return null;

  return <AthletixLoader className={phase === "fading" ? "is-fading" : ""} />;
}
