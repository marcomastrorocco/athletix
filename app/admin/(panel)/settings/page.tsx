import { ShieldCheck, Settings as SettingsIcon, KeyRound } from "lucide-react";
import BackupRestore from "@/components/admin/BackupRestore";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Backup &amp; Settings</h1>
          <p className="subtitle">
            Snapshot the entire site, restore from a previous export, and
            review system info.
          </p>
        </div>
      </div>

      <BackupRestore />

      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <KeyRound size={16} />
          </div>
          <div>
            <h2>Authentication</h2>
            <p className="muted" style={{ margin: 0 }}>
              Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code> in{" "}
              <code>.env.local</code>. Restart the dev server after changes.
            </p>
          </div>
        </div>
        <div
          style={{
            color: "var(--text-2)",
            fontSize: 13,
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: 14,
            fontFamily: "JetBrains Mono, ui-monospace, monospace",
            whiteSpace: "pre-wrap",
          }}
        >
{`# .env.local
ADMIN_PASSWORD=your-strong-password
ADMIN_SECRET=long-random-string-for-cookie-signing`}
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <SettingsIcon size={16} />
          </div>
          <div>
            <h2>System</h2>
            <p className="muted" style={{ margin: 0 }}>
              Storage and runtime info.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "8px 16px",
            fontSize: 13,
            color: "var(--text-2)",
          }}
        >
          <div style={{ color: "var(--muted)" }}>Storage</div>
          <div>JSON files in <code>data/</code></div>
          <div style={{ color: "var(--muted)" }}>Image uploads</div>
          <div><code>public/uploads/</code></div>
          <div style={{ color: "var(--muted)" }}>Activity log</div>
          <div><code>data/activity.json</code> (last 50 entries)</div>
        </div>
      </div>
    </>
  );
}
