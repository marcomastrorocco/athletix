"use client";

import { useState } from "react";
import type { Lead } from "@/lib/data";

const border = "1px solid rgba(128,128,128,0.25)";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function LeadsViewer({ initial }: { initial: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) setLeads((cur) => cur.filter((l) => l.id !== id));
      else alert("Could not delete. Try again.");
    } finally {
      setBusy(null);
    }
  }

  async function clearAll() {
    if (!confirm(`Delete ALL ${leads.length} enquiries? This cannot be undone.`))
      return;
    setBusy("all");
    try {
      const res = await fetch(`/api/admin/leads?all=1`, { method: "DELETE" });
      if (res.ok) setLeads([]);
      else alert("Could not clear. Try again.");
    } finally {
      setBusy(null);
    }
  }

  if (leads.length === 0) {
    return (
      <div
        style={{
          padding: "40px 24px",
          textAlign: "center",
          border,
          borderRadius: 12,
          opacity: 0.7,
        }}
      >
        No enquiries yet. Submissions from the website forms will appear here.
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <span style={{ opacity: 0.7, fontSize: 14 }}>
          {leads.length} {leads.length === 1 ? "enquiry" : "enquiries"}
        </span>
        <button
          type="button"
          onClick={clearAll}
          disabled={busy !== null}
          style={{
            background: "transparent",
            border,
            color: "inherit",
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Clear all
        </button>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {leads.map((l) => (
          <div
            key={l.id}
            style={{ border, borderRadius: 12, padding: "16px 18px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <strong style={{ fontSize: 16 }}>{l.name}</strong>
              <span style={{ opacity: 0.6, fontSize: 13 }}>
                {fmtDate(l.createdAt)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                margin: "8px 0",
                fontSize: 14,
              }}
            >
              <a href={`mailto:${l.email}`} style={{ color: "#00b8ef" }}>
                {l.email}
              </a>
              <a href={`tel:${l.phone}`} style={{ color: "#00b8ef" }}>
                {l.phone}
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                fontSize: 12,
              }}
            >
              {l.trainingAs && (
                <span
                  style={{
                    border,
                    borderRadius: 999,
                    padding: "2px 10px",
                    textTransform: "capitalize",
                  }}
                >
                  {l.trainingAs}
                </span>
              )}
              {l.source && (
                <span
                  style={{ border, borderRadius: 999, padding: "2px 10px", opacity: 0.8 }}
                >
                  {l.source}
                </span>
              )}
            </div>

            {l.message && (
              <p style={{ margin: "10px 0 0", fontSize: 14, whiteSpace: "pre-wrap" }}>
                {l.message}
              </p>
            )}

            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                onClick={() => remove(l.id)}
                disabled={busy !== null}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,80,80,0.4)",
                  color: "#ff6b6b",
                  borderRadius: 8,
                  padding: "5px 12px",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                {busy === l.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
