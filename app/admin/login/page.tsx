"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";
  const [password, setPassword] = useState("");
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
          setError("Invalid password");
          setLoading(false);
        }
      }}
      className="card"
      style={{
        width: "min(420px, 92vw)",
        margin: "120px auto",
        padding: 32,
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "var(--grad)",
          display: "grid",
          placeItems: "center",
          marginBottom: 18,
          boxShadow: "0 12px 24px rgba(0,184,239,0.35)",
        }}
      >
        <ShieldCheck color="#001018" />
      </div>
      <h1 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.02em" }}>
        Sign in to Admin
      </h1>
      <p
        style={{
          margin: "6px 0 22px",
          color: "var(--muted)",
          fontSize: 14,
        }}
      >
        Enter your admin password to manage athletix.com.au.
      </p>

      <div className="field">
        <label>Password</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "0 12px",
          }}
        >
          <Lock size={16} color="var(--muted)" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 0,
              background: "transparent",
              color: "var(--text)",
              outline: "none",
              padding: "12px 0",
              fontSize: 15,
            }}
          />
        </div>
      </div>

      {error && (
        <p
          style={{
            color: "var(--danger)",
            fontSize: 13,
            margin: "6px 0 12px",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn primary"
        style={{ width: "100%", padding: "12px 16px", fontSize: 14 }}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
        <ArrowRight />
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/admin.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
