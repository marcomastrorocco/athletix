"use client";

import { useEffect, useState } from "react";

function compute(at: string): string {
  const t = new Date(at).getTime();
  if (Number.isNaN(t)) return at;
  const diff = Date.now() - t;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(at).toLocaleDateString();
}

export default function TimeAgo({ at }: { at: string }) {
  const [label, setLabel] = useState(() => compute(at));
  useEffect(() => {
    const id = setInterval(() => setLabel(compute(at)), 60_000);
    return () => clearInterval(id);
  }, [at]);
  return <>{label}</>;
}
