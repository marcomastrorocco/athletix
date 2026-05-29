"use client";

import { useState } from "react";
import { KeyRound, Save, Eye, EyeOff } from "lucide-react";
import { showToast } from "./Toast";

const MIN_LENGTH = 8;

export default function PasswordChange() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (next.length < MIN_LENGTH) {
      setError(`New password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (next !== confirm) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (next === current) {
      setError("New password must be different from current password.");
      return;
    }

    setBusy(true);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current, next }),
    });
    setBusy(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data?.error || "Failed to update password";
      setError(msg);
      showToast(msg, "err");
      return;
    }

    reset();
    showToast("Password updated", "ok");
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 0,
    background: "transparent",
    color: "var(--text)",
    outline: "none",
    padding: "10px 0",
    fontSize: 14,
  };
  const wrapStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "0 12px",
  };

  return (
    <div className="card">
      <div className="head">
        <div className="icon-bg">
          <KeyRound size={16} />
        </div>
        <div>
          <h2>Change Password</h2>
          <p className="muted" style={{ margin: 0 }}>
            Update the admin sign-in password. Stored as a salted hash in{" "}
            <code>data/admin.json</code>; overrides the{" "}
            <code>ADMIN_PASSWORD</code> env var once set.
          </p>
        </div>
      </div>

      <form
        onSubmit={submit}
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 480,
        }}
      >
        <div className="field">
          <label>Current password</label>
          <div style={wrapStyle}>
            <input
              type={show ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              autoComplete="current-password"
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div className="field">
          <label>New password</label>
          <div style={wrapStyle}>
            <input
              type={show ? "text" : "password"}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              autoComplete="new-password"
              minLength={MIN_LENGTH}
              required
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide passwords" : "Show passwords"}
              style={{
                background: "transparent",
                border: 0,
                color: "var(--muted)",
                cursor: "pointer",
                padding: 4,
                display: "flex",
              }}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="field">
          <label>Confirm new password</label>
          <div style={wrapStyle}>
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              minLength={MIN_LENGTH}
              required
              style={inputStyle}
            />
          </div>
        </div>

        {error && (
          <p
            style={{
              color: "var(--danger)",
              fontSize: 13,
              margin: 0,
            }}
          >
            {error}
          </p>
        )}

        <div className="row" style={{ marginTop: 4 }}>
          <button
            type="submit"
            className="btn primary"
            disabled={busy || !current || !next || !confirm}
          >
            <Save />
            {busy ? "Saving..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
}
