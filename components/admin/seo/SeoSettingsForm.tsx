"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { SeoSettings } from "@/lib/data";
import { showToast } from "../Toast";

export default function SeoSettingsForm({ initial }: { initial: SeoSettings }) {
  const [s, setS] = useState<SeoSettings>(initial);
  const [saving, setSaving] = useState(false);

  const set = (patch: Partial<SeoSettings>) => setS((p) => ({ ...p, ...patch }));
  const setA = (patch: Partial<SeoSettings["analytics"]>) =>
    setS((p) => ({ ...p, analytics: { ...p.analytics, ...patch } }));
  const setOrg = (patch: Partial<SeoSettings["organization"]>) =>
    setS((p) => ({ ...p, organization: { ...p.organization, ...patch } }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      if (res.ok) showToast("Settings saved", "ok");
      else {
        const d = await res.json().catch(() => ({}));
        showToast(d.error || `Save failed (HTTP ${res.status})`, "err");
      }
    } catch (e) {
      showToast((e as Error).message, "err");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="seo-editor-main" style={{ maxWidth: 760 }}>
      <div className="form-grid">
        <div className="field field-wide seo-subhead">Site defaults</div>
        <label className="field">
          <span>Site URL</span>
          <input value={s.siteUrl} onChange={(e) => set({ siteUrl: e.target.value })} placeholder="https://athletix.com.au" />
        </label>
        <label className="field">
          <span>Title template</span>
          <input value={s.titleTemplate} onChange={(e) => set({ titleTemplate: e.target.value })} placeholder="%s | ATHLETIX" />
        </label>
        <label className="field field-wide">
          <span>Default meta description</span>
          <textarea rows={2} value={s.defaultDescription} onChange={(e) => set({ defaultDescription: e.target.value })} />
        </label>
        <label className="field">
          <span>Default OG image</span>
          <input value={s.defaultOgImage} onChange={(e) => set({ defaultOgImage: e.target.value })} />
        </label>
        <label className="field">
          <span>Twitter handle</span>
          <input value={s.twitterHandle} onChange={(e) => set({ twitterHandle: e.target.value })} placeholder="@athletix_gym" />
        </label>

        <div className="field field-wide seo-subhead">Analytics &amp; verification</div>
        <label className="field">
          <span>Google Analytics ID</span>
          <input value={s.analytics.gaId ?? ""} onChange={(e) => setA({ gaId: e.target.value })} placeholder="G-XXXXXXXXXX" />
        </label>
        <label className="field">
          <span>Google Tag Manager ID</span>
          <input value={s.analytics.gtmId ?? ""} onChange={(e) => setA({ gtmId: e.target.value })} placeholder="GTM-XXXXXXX" />
        </label>
        <label className="field field-wide">
          <span>Search Console verification token</span>
          <input value={s.analytics.googleVerification ?? ""} onChange={(e) => setA({ googleVerification: e.target.value })} />
        </label>

        <div className="field field-wide seo-subhead">Organization (schema)</div>
        <label className="field">
          <span>Name</span>
          <input value={s.organization.name} onChange={(e) => setOrg({ name: e.target.value })} />
        </label>
        <label className="field">
          <span>Logo URL</span>
          <input value={s.organization.logo} onChange={(e) => setOrg({ logo: e.target.value })} />
        </label>
        <label className="field field-wide">
          <span>Social profile URLs (one per line)</span>
          <textarea
            rows={3}
            value={s.organization.sameAs.join("\n")}
            onChange={(e) =>
              setOrg({ sameAs: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })
            }
          />
        </label>
      </div>

      <div className="seo-editor-actions">
        <button className="btn primary" type="button" onClick={save} disabled={saving}>
          <Save size={15} /> {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
