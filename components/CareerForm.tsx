"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Strength & Conditioning Coach",
  "Sports Physiotherapist",
  "Exercise Physiologist",
  "University Placement / Internship",
  "Other / General Enquiry",
] as const;

type Status = "idle" | "sending" | "success" | "error";

export default function CareerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: ROLES[0] as string,
    link: "",
    message: "",
    hp: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const update = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const match = hash.match(/role=([^&]+)/);
      if (match) {
        const decoded = decodeURIComponent(match[1]);
        const found = ROLES.find((r) => r === decoded);
        if (found) setForm((f) => ({ ...f, role: found }));
      }
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const compiledMessage = [
      form.message.trim() ? form.message.trim() : "",
      form.link.trim() ? `\nLinkedIn / CV / Portfolio:\n${form.link.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          trainingAs: form.role,
          source: "Careers page",
          message: compiledMessage,
          _hp: form.hp,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", role: ROLES[0], link: "", message: "", hp: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="cf-success">
        <div className="cf-success-icon">✓</div>
        <h3>Application sent.</h3>
        <p>
          Thanks — we&apos;ve received your details. The team reviews every
          application personally; expect a reply within a few working days.
        </p>
        <button
          type="button"
          className="cf-secondary"
          onClick={() => setStatus("idle")}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={submit} noValidate>
      <input
        type="text"
        name="company"
        value={form.hp}
        onChange={set("hp")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", opacity: 0, pointerEvents: "none" }}
      />

      <div className="cf-field">
        <label htmlFor="cf-name">Full name</label>
        <input
          id="cf-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          placeholder="Jane Athlete"
        />
      </div>

      <div className="cf-two">
        <div className="cf-field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@email.com"
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-phone">Phone</label>
          <input
            id="cf-phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="0400 000 000"
          />
        </div>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-role">Role you&apos;re applying for</label>
        <select
          id="cf-role"
          required
          value={form.role}
          onChange={set("role")}
        >
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-link">
          LinkedIn / CV / Portfolio URL <span className="cf-optional">(optional)</span>
        </label>
        <input
          id="cf-link"
          type="url"
          value={form.link}
          onChange={set("link")}
          placeholder="https://linkedin.com/in/your-name"
        />
      </div>

      <div className="cf-field">
        <label htmlFor="cf-message">
          About you <span className="cf-optional">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us a bit about your experience, accreditations and what you're looking for."
        />
      </div>

      {status === "error" && (
        <p className="cf-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" className="cf-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send application"}
      </button>
      <p className="cf-fineprint">
        Or email us directly at{" "}
        <a href="mailto:info@athletix.com.au">info@athletix.com.au</a>.
      </p>
    </form>
  );
}
