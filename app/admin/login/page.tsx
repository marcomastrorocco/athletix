"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, User } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (res.ok) {
          router.push(from);
          router.refresh();
        } else {
          setError("Incorrect password");
          setLoading(false);
        }
      }}
      className={`auth-card ${error ? "shake" : ""}`}
    >
      <div className="auth-avatar">
        <User size={34} strokeWidth={1.6} />
      </div>

      <h1 className="auth-title">Admin Login</h1>

      <div className={`auth-field ${error ? "is-error" : ""}`}>
        <Lock size={17} className="auth-field__icon" />
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          aria-label="Admin password"
        />
        <button
          type="button"
          className="auth-field__toggle"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className={`auth-error ${error ? "visible" : ""}`}>{error}</div>

      <button
        type="submit"
        className="auth-submit"
        disabled={loading || !password}
      >
        {loading ? <span className="auth-spinner" /> : "Login"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="auth-wrap">
        <div className="auth-bg" aria-hidden>
          <span className="auth-orb auth-orb--1" />
          <span className="auth-orb auth-orb--2" />
          <span className="auth-grid" />
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>

      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          background: #060a12;
        }
        * { box-sizing: border-box; }

        .auth-wrap {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
          font-family: "Inter", system-ui, -apple-system, sans-serif;
          /* deep blue-tinted base instead of flat black */
          background:
            radial-gradient(120% 90% at 50% 0%, #06283a 0%, #07151f 40%, #050a0f 100%);
        }

        /* ambient background layer behind the card */
        .auth-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .auth-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
        }
        .auth-orb--1 {
          width: 480px; height: 480px;
          top: -140px; left: -120px;
          background: radial-gradient(circle, rgba(0,184,239,0.55), transparent 70%);
          animation: orbFloat 16s ease-in-out infinite alternate;
        }
        .auth-orb--2 {
          width: 560px; height: 560px;
          bottom: -180px; right: -140px;
          background: radial-gradient(circle, rgba(51,212,255,0.42), transparent 70%);
          animation: orbFloat 20s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.18); }
        }
        /* faint dotted grid for depth */
        .auth-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(120% 90% at 50% 30%, #000 0%, transparent 72%);
          -webkit-mask-image: radial-gradient(120% 90% at 50% 30%, #000 0%, transparent 72%);
        }

        .auth-card { z-index: 1; }

        .auth-card {
          width: min(420px, 92vw);
          padding: 54px 48px 48px;
          border-radius: 22px;
          position: relative;
          overflow: hidden;
          /* dark frosted glass with cyan tint */
          background:
            linear-gradient(160deg, rgba(16,30,40,0.78) 0%, rgba(8,15,21,0.84) 100%);
          border: 1px solid rgba(0, 184, 239, 0.22);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          box-shadow:
            0 30px 70px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(0, 184, 239, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        /* cyan accent line along the top edge */
        .auth-card::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00b8ef, #33d4ff, transparent);
          opacity: 0.9;
          pointer-events: none;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* avatar */
        .auth-avatar {
          width: 76px;
          height: 76px;
          margin: 0 auto 22px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #eafaff;
          background: radial-gradient(circle at 50% 35%, #0c93c6 0%, #064a68 100%);
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.20);
        }

        .auth-title {
          margin: 0 0 34px;
          text-align: center;
          font-size: 21px;
          font-weight: 300;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          text-indent: 0.32em; /* optical center for tracked text */
        }

        /* underline-style field */
        .auth-field {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 2px;
          margin-bottom: 26px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.40);
          transition: border-color 0.2s ease;
        }
        .auth-field:focus-within { border-bottom-color: #ffffff; }
        .auth-field.is-error { border-bottom-color: #ffd1d1; }
        .auth-field__icon { color: rgba(255, 255, 255, 0.85); flex: none; }
        .auth-field input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          outline: none;
          color: #fff;
          font-size: 15px;
          letter-spacing: 0.02em;
        }
        .auth-field input::placeholder {
          color: rgba(255, 255, 255, 0.62);
          letter-spacing: 0.04em;
        }
        .auth-field__toggle {
          display: grid;
          place-items: center;
          background: transparent;
          border: 0;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          padding: 2px;
          transition: color 0.15s ease;
        }
        .auth-field__toggle:hover { color: #fff; }

        .auth-error {
          text-align: center;
          color: #ffd9d9;
          font-size: 12.5px;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin 0.25s ease;
        }
        .auth-error.visible { max-height: 30px; opacity: 1; margin: -14px 0 14px; }

        /* button */
        .auth-submit {
          width: 100%;
          padding: 14px;
          border: 0;
          border-radius: 8px;
          cursor: pointer;
          color: #001018;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #00b8ef 0%, #33d4ff 100%);
          box-shadow:
            0 10px 26px rgba(0, 184, 239, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.30);
          display: grid;
          place-items: center;
          min-height: 47px;
          transition: transform 0.12s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .auth-submit:hover:not(:disabled) {
          filter: brightness(1.12);
          box-shadow: 0 14px 30px rgba(6, 24, 45, 0.6), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .auth-submit:active:not(:disabled) { transform: translateY(1px); }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(0, 16, 24, 0.30);
          border-top-color: #001018;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .shake { animation: cardIn 0.6s cubic-bezier(0.22,1,0.36,1) both, shake 0.4s ease; }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .auth-card, .shake, .auth-orb { animation: none !important; }
        }
      `}</style>
    </>
  );
}
