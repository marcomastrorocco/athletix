"use client";

import { useState } from "react";
import {
  Save,
  ExternalLink,
  Menu,
  PanelLeft,
  Clock,
  Share2,
  Trash2,
  Plus,
} from "lucide-react";
import type { HeaderContent } from "@/lib/data";
import { showToast } from "./Toast";
import LivePreview from "./LivePreview";

function SectionCard({
  icon,
  title,
  hint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="head">
        <div className="icon-bg">{icon}</div>
        <div>
          <h2>{title}</h2>
          {hint && (
            <p className="muted" style={{ margin: 0 }}>
              {hint}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function TF({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TA({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function ListEd<T>({
  label,
  items,
  onChange,
  newItem,
  render,
}: {
  label: string;
  items: T[];
  onChange: (next: T[]) => void;
  newItem: () => T;
  render: (item: T, i: number, update: (next: T) => void) => React.ReactNode;
}) {
  const update = (i: number, next: T) => {
    const arr = [...items];
    arr[i] = next;
    onChange(arr);
  };
  const remove = (i: number) => onChange(items.filter((_, n) => n !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const arr = [...items];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  };
  return (
    <div className="list-editor">
      {items.map((item, i) => (
        <div key={i} className="list-row">
          <div className="list-row-head">
            <span className="muted" style={{ fontSize: 11 }}>
              {label} #{i + 1}
            </span>
            <div className="row" style={{ gap: 6 }}>
              <button
                type="button"
                className="btn ghost sm"
                onClick={() => move(i, -1)}
                disabled={i === 0}
              >
                ↑
              </button>
              <button
                type="button"
                className="btn ghost sm"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
              >
                ↓
              </button>
              <button
                type="button"
                className="btn ghost sm danger"
                onClick={() => remove(i)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="list-row-body">
            {render(item, i, (next) => update(i, next))}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn ghost sm"
        onClick={() => onChange([...items, newItem()])}
      >
        <Plus size={14} /> Add {label.toLowerCase()}
      </button>
    </div>
  );
}

export default function HeaderEditor({ initial }: { initial: HeaderContent }) {
  const [h, setH] = useState<HeaderContent>(initial);
  const [saving, setSaving] = useState(false);
  const [refreshToken, setRefreshToken] = useState(Date.now());

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ header: h }),
      });
      if (res.ok) {
        showToast("Saved", "ok");
        setRefreshToken(Date.now());
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error || `Save failed (HTTP ${res.status})`, "err");
      }
    } catch (err) {
      showToast(`Network error: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-editor">
      <form onSubmit={save} className="page-editor-form">
        {/* NAVIGATION */}
        <SectionCard
          icon={<Menu size={16} />}
          title="Navigation Menu"
          hint="Top menu links. Add submenu cards to a link to turn it into a dropdown (mega-menu)."
        >
          <ListEd
            label="Menu item"
            items={h.nav}
            onChange={(nav) => setH({ ...h, nav })}
            newItem={() => ({ label: "", href: "/", mega: [] })}
            render={(item, _i, upd) => (
              <>
                <div className="field-row">
                  <TF
                    label="Label"
                    value={item.label}
                    onChange={(v) => upd({ ...item, label: v })}
                  />
                  <TF
                    label="Link (href)"
                    value={item.href}
                    onChange={(v) => upd({ ...item, href: v })}
                  />
                </div>
                <div className="field">
                  <label>
                    Dropdown cards{" "}
                    <span className="muted" style={{ fontSize: 11 }}>
                      (leave empty for a plain link)
                    </span>
                  </label>
                  <ListEd
                    label="Card"
                    items={item.mega}
                    onChange={(mega) => upd({ ...item, mega })}
                    newItem={() => ({ href: "/", title: "", desc: "" })}
                    render={(m, _j, updM) => (
                      <>
                        <div className="field-row">
                          <TF
                            label="Title"
                            value={m.title}
                            onChange={(v) => updM({ ...m, title: v })}
                          />
                          <TF
                            label="Link (href)"
                            value={m.href}
                            onChange={(v) => updM({ ...m, href: v })}
                          />
                        </div>
                        <TA
                          label="Description"
                          rows={2}
                          value={m.desc}
                          onChange={(v) => updM({ ...m, desc: v })}
                        />
                      </>
                    )}
                  />
                </div>
              </>
            )}
          />
        </SectionCard>

        {/* SIDE PANEL — ABOUT */}
        <SectionCard
          icon={<PanelLeft size={16} />}
          title="Side Panel — About"
          hint="The slide-out panel opened from the header. Address & phone come from Homepage & SEO → Site Contact Info."
        >
          <TA
            label="About blurb"
            rows={5}
            value={h.sideAbout}
            onChange={(v) => setH({ ...h, sideAbout: v })}
          />
        </SectionCard>

        {/* SIDE PANEL — HOURS */}
        <SectionCard
          icon={<Clock size={16} />}
          title="Working Hours"
          hint="Shown in the side panel. The weekday controls which row gets the “Today” badge."
        >
          <TF
            label="Heading"
            value={h.hoursHeading}
            onChange={(v) => setH({ ...h, hoursHeading: v })}
          />
          <div className="field">
            <label>Days</label>
            <ListEd
              label="Day"
              items={h.hours}
              onChange={(hours) => setH({ ...h, hours })}
              newItem={() => ({ weekday: 1, short: "", hours: "" })}
              render={(it, _i, upd) => (
                <div className="field-row-3">
                  <TF
                    label="Day label (e.g. MON)"
                    value={it.short}
                    onChange={(v) => upd({ ...it, short: v })}
                  />
                  <TF
                    label="Hours (e.g. 6:00 AM – 7:30 PM)"
                    value={it.hours}
                    onChange={(v) => upd({ ...it, hours: v })}
                  />
                  <div className="field">
                    <label>Weekday</label>
                    <select
                      value={it.weekday}
                      onChange={(e) =>
                        upd({ ...it, weekday: Number(e.target.value) })
                      }
                    >
                      <option value={0}>Sunday</option>
                      <option value={1}>Monday</option>
                      <option value={2}>Tuesday</option>
                      <option value={3}>Wednesday</option>
                      <option value={4}>Thursday</option>
                      <option value={5}>Friday</option>
                      <option value={6}>Saturday</option>
                    </select>
                  </div>
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* SIDE PANEL — SOCIALS */}
        <SectionCard
          icon={<Share2 size={16} />}
          title="Social Links"
          hint="Shown in the side panel. Leave a URL blank to hide that icon."
        >
          <TF
            label="Heading"
            value={h.socialsHeading}
            onChange={(v) => setH({ ...h, socialsHeading: v })}
          />
          <div className="field">
            <label>Links</label>
            <ListEd
              label="Social"
              items={h.socials}
              onChange={(socials) => setH({ ...h, socials })}
              newItem={() => ({ platform: "instagram", href: "" })}
              render={(it, _i, upd) => (
                <div className="field-row">
                  <div className="field">
                    <label>Platform</label>
                    <select
                      value={it.platform}
                      onChange={(e) => upd({ ...it, platform: e.target.value })}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="x">X (Twitter)</option>
                    </select>
                  </div>
                  <TF
                    label="URL (leave blank to hide)"
                    value={it.href}
                    onChange={(v) => upd({ ...it, href: v })}
                  />
                </div>
              )}
            />
          </div>
        </SectionCard>

        <div className="card save-bar">
          <div className="row">
            <a href="/" target="_blank" rel="noopener" className="btn ghost">
              <ExternalLink size={14} /> View site
            </a>
            <div className="gap" />
            <button type="submit" className="btn primary" disabled={saving}>
              <Save />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </form>

      <aside className="page-editor-preview">
        <LivePreview path="/" refreshToken={refreshToken} />
      </aside>
    </div>
  );
}
