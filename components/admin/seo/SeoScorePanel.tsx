"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { SeoScore } from "@/lib/seo";

function band(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Good", color: "#16a34a" };
  if (score >= 50) return { label: "Needs work", color: "#d97706" };
  return { label: "Poor", color: "#dc2626" };
}

export default function SeoScorePanel({ result }: { result: SeoScore }) {
  const { label, color } = band(result.score);
  // Conic-gradient ring as a dependency-free progress dial.
  const ring = `conic-gradient(${color} ${result.score * 3.6}deg, var(--seo-track, #e5e7eb) 0deg)`;

  return (
    <div className="seo-score">
      <div className="seo-score-head">
        <div className="seo-score-ring" style={{ background: ring }}>
          <div className="seo-score-ring-inner">
            <strong style={{ color }}>{result.score}</strong>
            <span>/100</span>
          </div>
        </div>
        <div>
          <div className="seo-score-label" style={{ color }}>
            {label}
          </div>
          <div className="seo-score-sub">
            {result.passed}/{result.total} checks passed
          </div>
        </div>
      </div>

      <ul className="seo-check-list">
        {result.checks.map((c) => (
          <li key={c.id} className={`seo-check ${c.status}`}>
            <span className="seo-check-icon">
              {c.status === "pass" ? (
                <CheckCircle2 size={16} />
              ) : c.status === "warn" ? (
                <AlertTriangle size={16} />
              ) : (
                <XCircle size={16} />
              )}
            </span>
            <span className="seo-check-body">
              <span className="seo-check-label">{c.label}</span>
              <span className="seo-check-hint">{c.hint}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
