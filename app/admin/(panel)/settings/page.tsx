import { Settings as SettingsIcon } from "lucide-react";
import BackupRestore from "@/components/admin/BackupRestore";
import PasswordChange from "@/components/admin/PasswordChange";

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

      <PasswordChange />

      <BackupRestore />

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
