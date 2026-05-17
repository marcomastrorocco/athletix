import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  trainingAs?: string;
  source?: string;
  message?: string;
  _hp?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (body._hp && body._hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const trainingAs = (body.trainingAs || "").trim();
  const source = (body.source || "Website form").trim();
  const message = (body.message || "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO || smtpUser;
  const mailFrom = process.env.MAIL_FROM || smtpUser;

  if (!smtpUser || !smtpPass || !mailTo) {
    console.error("[lead] SMTP env vars missing");
    return NextResponse.json(
      { ok: false, error: "Email service not configured. Please contact us directly." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (process.env.SMTP_SECURE ?? "true") !== "false",
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subject = `New trial enquiry — ${name}${trainingAs ? ` (${trainingAs})` : ""}`;

  const textLines = [
    `New lead from ${source}`,
    `------------------------------------`,
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Phone:       ${phone}`,
    trainingAs ? `Training as: ${trainingAs}` : "",
    message ? `\nMessage:\n${message}` : "",
    `\nReceived: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#0f1318">
      <div style="background:#07090b;color:#fff;padding:24px 28px;border-radius:10px 10px 0 0">
        <div style="font-size:11px;letter-spacing:3px;color:#00d4f0;text-transform:uppercase;font-weight:700">Athletix</div>
        <div style="font-size:22px;font-weight:700;margin-top:4px">New Trial Enquiry</div>
      </div>
      <div style="background:#fff;border:1px solid #e5e9ee;border-top:none;padding:24px 28px;border-radius:0 0 10px 10px">
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.55">
          <tr><td style="padding:8px 0;color:#6b7c8a;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7c8a">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#00b8ef;text-decoration:none">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7c8a">Phone</td><td style="padding:8px 0"><a href="tel:${escapeHtml(phone)}" style="color:#00b8ef;text-decoration:none">${escapeHtml(phone)}</a></td></tr>
          ${trainingAs ? `<tr><td style="padding:8px 0;color:#6b7c8a">Training as</td><td style="padding:8px 0">${escapeHtml(trainingAs)}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#6b7c8a">Source</td><td style="padding:8px 0">${escapeHtml(source)}</td></tr>
        </table>
        ${message ? `<div style="margin-top:16px;padding-top:16px;border-top:1px solid #eef2f6"><div style="color:#6b7c8a;font-size:12px;margin-bottom:6px">Message</div><div style="white-space:pre-wrap">${escapeHtml(message)}</div></div>` : ""}
        <div style="margin-top:20px;font-size:11px;color:#9aa6b2">Received ${new Date().toUTCString()}</div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Athletix Website" <${mailFrom}>`,
      to: mailTo,
      replyTo: `${name} <${email}>`,
      subject,
      text: textLines,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown email error";
    console.error("[lead] sendMail failed:", msg);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please call 0499 981 286." },
      { status: 502 }
    );
  }
}
