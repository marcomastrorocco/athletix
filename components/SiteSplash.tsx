"use client";

import { useEffect, useState } from "react";
import AthletixLoader from "./AthletixLoader";

const MIN_VISIBLE_MS = 1200;
const FADE_MS = 500;

export default function SiteSplash() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const start = performance.now();

    const onReady = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setPhase("fading"), remaining);
    };

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
      return () => window.removeEventListener("load", onReady);
    }
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
