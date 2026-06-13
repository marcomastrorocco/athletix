"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressively enhances any server-rendered lead form. Add `data-lead` and
 * `data-source="..."` to a <form>, and this intercepts its submit, POSTs the
 * fields as JSON to /api/lead (same backend as the Book Trial popup), and
 * shows an inline success/error message. No markup rewrite needed.
 *
 * Mounted once in the (site) layout; re-scans on client-side navigation.
 */
export default function LeadFormEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const forms = Array.from(
      document.querySelectorAll<HTMLFormElement>("form[data-lead]")
    );
    const cleanups: Array<() => void> = [];

    for (const form of forms) {
      if (form.dataset.leadWired === "1") continue; // already enhanced
      form.dataset.leadWired = "1";

      const onSubmit = async (e: Event) => {
        e.preventDefault();
        if (form.dataset.sending === "1") return;

        const val = (sel: string) =>
          (
            form.querySelector(sel) as
              | HTMLInputElement
              | HTMLTextAreaElement
              | HTMLSelectElement
              | null
          )?.value?.trim() || "";

        const name = val('[name="full_name"]') || val('[name="name"]');
        const email = val('[name="email"]');
        const phone = val('[name="phone"]');
        const audience = form.querySelector<HTMLInputElement>(
          '[name="audience"]:checked'
        )?.value;
        const trainingAs = audience || val('[name="interest"]');
        const message =
          val('[name="message"]') || val('[name="msg"]') || val('[name="subject"]');
        const hp = val('[name="_hp"]');
        const source =
          form.dataset.source || document.title || "Website form";

        const status = ensureStatusEl(form);
        form.dataset.sending = "1";
        status.textContent = "Sending…";
        status.className = "lead-status sending";

        try {
          const res = await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              phone,
              trainingAs,
              source,
              message,
              _hp: hp,
            }),
          });
          const data = (await res.json().catch(() => ({}))) as {
            ok?: boolean;
            error?: string;
          };
          if (!res.ok || !data.ok) {
            status.textContent =
              data.error || "Something went wrong. Please try again.";
            status.className = "lead-status error";
          } else {
            status.textContent = "Thanks! A coach will be in touch shortly.";
            status.className = "lead-status success";
            form.reset();
          }
        } catch {
          status.textContent =
            "Network error. Please check your connection and try again.";
          status.className = "lead-status error";
        } finally {
          form.dataset.sending = "";
        }
      };

      form.addEventListener("submit", onSubmit);
      cleanups.push(() => {
        form.removeEventListener("submit", onSubmit);
        form.dataset.leadWired = "";
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}

function ensureStatusEl(form: HTMLFormElement): HTMLElement {
  let el = form.querySelector<HTMLElement>(".lead-status");
  if (!el) {
    el = document.createElement("p");
    el.className = "lead-status";
    form.appendChild(el);
  }
  return el;
}
