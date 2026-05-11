"use client";

import { useRef, useState } from "react";
import { Download, Upload, ShieldCheck, AlertTriangle } from "lucide-react";
import { showToast } from "./Toast";

export default function BackupRestore() {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onPick = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const text = String(reader.result || "");
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        showToast("Invalid JSON", "err");
        return;
      }
      if (!confirm("Replace ALL site content with this backup?")) return;
      setBusy(true);
      const res = await fetch("/api/admin/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      setBusy(false);
      if (!res.ok) return showToast("Restore failed", "err");
      const data = await res.json();
      showToast(`Restored: ${data.restored.join(", ")}`, "ok");
    };
    reader.readAsText(f);
  };

  return (
    <div className="card">
      <div className="head">
        <div className="icon-bg">
          <ShieldCheck size={16} />
        </div>
        <div>
          <h2>Backup &amp; Restore</h2>
          <p className="muted" style={{ margin: 0 }}>
            Download a single JSON snapshot of every site setting, post and
            schedule. Keep one before risky changes.
          </p>
        </div>
      </div>
      <div className="row" style={{ flexWrap: "wrap" }}>
        <a className="btn primary" href="/api/admin/backup">
          <Download />
          Download backup
        </a>
        <button
          className="btn"
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
        >
          <Upload />
          {busy ? "Restoring..." : "Restore from JSON"}
        </button>
        <input
          ref={input}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => onPick(e.target.files)}
        />
      </div>
      <p
        style={{
          color: "var(--warn)",
          fontSize: 12,
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <AlertTriangle style={{ width: 14, height: 14 }} />
        Restore replaces existing data. Always download a backup first.
      </p>
    </div>
  );
}
