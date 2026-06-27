"use client";

import { useState } from "react";
import {
  Save,
  Trash2,
  ArrowUp,
  ArrowDown,
  UserPlus,
  Plus,
  Stethoscope,
  HelpCircle,
  Link as LinkIcon,
} from "lucide-react";
import { showToast } from "./Toast";
import ImagePicker from "./ImagePicker";
import RichTextEditor from "./RichTextEditor";
import type {
  AlliedHealthContent,
  Practitioner,
  PracLink,
  AhFaq,
} from "@/lib/data";

const LINK_TYPES = ["linkedin", "instagram", "website"];

function newPractitioner(): Practitioner {
  return {
    id: `prac-${Date.now()}`,
    name: "",
    role: "",
    title: "",
    image: "",
    bioHtml: "<p></p>",
    qualifications: [],
    experience: [],
    links: [],
  };
}

function newFaq(): AhFaq {
  return { q: "", a: "" };
}

/** Editor for a simple list of strings (qualifications / experience). */
function StringList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
}) {
  const set = (i: number, v: string) =>
    onChange(items.map((it, idx) => (idx === i ? v : it)));
  return (
    <div>
      <div className="ah-sublabel">{label}</div>
      {items.map((it, i) => (
        <div className="row" key={i} style={{ gap: 6, marginBottom: 6 }}>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <input
              value={it}
              onChange={(e) => set(i, e.target.value)}
              placeholder={`${label} item`}
            />
          </div>
          <button
            type="button"
            className="btn danger sm"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="Remove"
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn sm"
        onClick={() => onChange([...items, ""])}
      >
        <Plus />
        Add {label.toLowerCase()}
      </button>
    </div>
  );
}

/** Editor for a practitioner's profile / contact links. */
function LinksEditor({
  links,
  onChange,
}: {
  links: PracLink[];
  onChange: (next: PracLink[]) => void;
}) {
  const set = (i: number, patch: Partial<PracLink>) =>
    onChange(links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  return (
    <div>
      <div className="ah-sublabel">
        <LinkIcon size={12} style={{ verticalAlign: "-2px" }} /> Links
      </div>
      {links.map((l, i) => (
        <div className="row" key={i} style={{ gap: 6, marginBottom: 6 }}>
          <div className="field" style={{ width: 130, marginBottom: 0 }}>
            <select
              value={LINK_TYPES.includes(l.type) ? l.type : "website"}
              onChange={(e) => set(i, { type: e.target.value })}
            >
              {LINK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <input
              value={l.label}
              onChange={(e) => set(i, { label: e.target.value })}
              placeholder="Label (e.g. LinkedIn, Book here)"
            />
          </div>
          <div className="field" style={{ flex: 1.5, marginBottom: 0 }}>
            <input
              value={l.href}
              onChange={(e) => set(i, { href: e.target.value })}
              placeholder="https://…"
            />
          </div>
          <button
            type="button"
            className="btn danger sm"
            onClick={() => onChange(links.filter((_, idx) => idx !== i))}
            aria-label="Remove link"
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn sm"
        onClick={() =>
          onChange([...links, { type: "website", label: "", href: "" }])
        }
      >
        <Plus />
        Add link
      </button>
    </div>
  );
}

export default function AlliedHealthEditor({
  initial,
}: {
  initial: AlliedHealthContent;
}) {
  const [data, setData] = useState<AlliedHealthContent>(initial);
  const [saving, setSaving] = useState(false);
  const [openPrac, setOpenPrac] = useState<number | null>(null);

  // --- intro ---
  const setIntro = (patch: Partial<AlliedHealthContent["intro"]>) =>
    setData((d) => ({ ...d, intro: { ...d.intro, ...patch } }));

  // --- practitioners ---
  const setPracs = (next: Practitioner[]) =>
    setData((d) => ({ ...d, practitioners: next }));
  const updatePrac = (i: number, patch: Partial<Practitioner>) =>
    setPracs(
      data.practitioners.map((p, idx) => (idx === i ? { ...p, ...patch } : p))
    );
  const movePrac = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= data.practitioners.length) return;
    const next = data.practitioners.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setPracs(next);
  };

  // --- faqs ---
  const setFaqs = (next: AhFaq[]) => setData((d) => ({ ...d, faqs: next }));
  const updateFaq = (i: number, patch: Partial<AhFaq>) =>
    setFaqs(data.faqs.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  const moveFaq = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= data.faqs.length) return;
    const next = data.faqs.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setFaqs(next);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/allied-health", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    showToast(
      res.ok ? "Allied Health saved" : "Save failed",
      res.ok ? "ok" : "err"
    );
  };

  return (
    <form onSubmit={save} className="ah-editor">
      {/* INTRO */}
      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <Stethoscope size={16} />
          </div>
          <div>
            <h2>Intro section</h2>
            <p className="muted" style={{ margin: 0 }}>
              The eyebrow, heading and intro paragraphs at the top of the page.
            </p>
          </div>
        </div>

        <div className="field">
          <label>Eyebrow</label>
          <input
            value={data.intro.eyebrow}
            onChange={(e) => setIntro({ eyebrow: e.target.value })}
            placeholder="Multi-disciplinary team"
          />
        </div>
        <div className="field">
          <label>Heading (use &lt;em&gt;…&lt;/em&gt; for the accent)</label>
          <input
            value={data.intro.heading}
            onChange={(e) => setIntro({ heading: e.target.value })}
            placeholder="Specialist care, <em>under one roof.</em>"
          />
        </div>
        <div className="field">
          <label>Body (HTML — paragraphs, &lt;strong&gt;, &lt;a href&gt; links)</label>
          <textarea
            rows={6}
            value={data.intro.bodyHtml}
            onChange={(e) => setIntro({ bodyHtml: e.target.value })}
          />
        </div>
        <div className="field-row">
          <div>
            <ImagePicker
              value={data.intro.image.src}
              onChange={(v) =>
                setIntro({ image: { ...data.intro.image, src: v } })
              }
              label="Intro image"
            />
          </div>
          <div className="field">
            <label>Image alt text</label>
            <input
              value={data.intro.image.alt}
              onChange={(e) =>
                setIntro({
                  image: { ...data.intro.image, alt: e.target.value },
                })
              }
              placeholder="Describe the image"
            />
          </div>
        </div>
      </div>

      {/* PRACTITIONERS */}
      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <Stethoscope size={16} />
          </div>
          <div>
            <h2>Practitioners ({data.practitioners.length})</h2>
            <p className="muted" style={{ margin: 0 }}>
              Click a practitioner to edit. Reorder with the arrows.
            </p>
          </div>
          <div className="gap" />
          <button
            type="button"
            className="btn"
            onClick={() => {
              setPracs([...data.practitioners, newPractitioner()]);
              setOpenPrac(data.practitioners.length);
            }}
          >
            <UserPlus />
            Add practitioner
          </button>
        </div>

        {data.practitioners.map((p, i) => (
          <div key={p.id} className="prac-block">
            <div className="coach-row">
              <img
                src={p.image || "/image/athlethix-logo.png"}
                alt={p.name || "practitioner"}
              />
              <input
                value={p.name}
                onChange={(e) => updatePrac(i, { name: e.target.value })}
                placeholder="Full name"
              />
              <input
                value={p.role}
                onChange={(e) => updatePrac(i, { role: e.target.value })}
                placeholder="Role (e.g. Dietician)"
              />
              <div className="row" style={{ gap: 4 }}>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => movePrac(i, -1)}
                  aria-label="Up"
                >
                  <ArrowUp />
                </button>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => movePrac(i, 1)}
                  aria-label="Down"
                >
                  <ArrowDown />
                </button>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => setOpenPrac(openPrac === i ? null : i)}
                >
                  {openPrac === i ? "Hide" : "Edit"}
                </button>
                <button
                  type="button"
                  className="btn danger sm"
                  onClick={() =>
                    setPracs(data.practitioners.filter((_, idx) => idx !== i))
                  }
                  aria-label="Delete"
                >
                  <Trash2 />
                </button>
              </div>
            </div>

            {openPrac === i && (
              <div style={{ padding: "14px 0 8px" }}>
                <div className="field">
                  <label>Title</label>
                  <input
                    value={p.title}
                    onChange={(e) => updatePrac(i, { title: e.target.value })}
                    placeholder="e.g. Head Physiotherapist"
                  />
                </div>

                <ImagePicker
                  value={p.image}
                  onChange={(v) => updatePrac(i, { image: v })}
                  label="Photo"
                />

                <div className="field" style={{ marginTop: 14 }}>
                  <label>
                    Description — use the toolbar for bold, italic, lists and
                    links
                  </label>
                  <RichTextEditor
                    value={p.bioHtml}
                    onChange={(html) => updatePrac(i, { bioHtml: html })}
                    minHeight={180}
                    ariaLabel={`Description for ${p.name || "practitioner"}`}
                    placeholder="Write the full practitioner description…"
                  />
                </div>

                <StringList
                  label="Qualifications"
                  items={p.qualifications}
                  onChange={(v) => updatePrac(i, { qualifications: v })}
                />
                <StringList
                  label="Experience"
                  items={p.experience}
                  onChange={(v) => updatePrac(i, { experience: v })}
                />
                <LinksEditor
                  links={p.links}
                  onChange={(v) => updatePrac(i, { links: v })}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQS */}
      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <HelpCircle size={16} />
          </div>
          <div>
            <h2>FAQs ({data.faqs.length})</h2>
            <p className="muted" style={{ margin: 0 }}>
              Frequently asked questions shown near the bottom of the page.
            </p>
          </div>
          <div className="gap" />
          <button
            type="button"
            className="btn"
            onClick={() => setFaqs([...data.faqs, newFaq()])}
          >
            <Plus />
            Add FAQ
          </button>
        </div>

        {data.faqs.map((f, i) => (
          <div key={i} className="prac-block">
            <div className="row" style={{ gap: 8, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div className="field" style={{ marginBottom: 8 }}>
                  <input
                    value={f.q}
                    onChange={(e) => updateFaq(i, { q: e.target.value })}
                    placeholder="Question"
                  />
                </div>
                <div className="field" style={{ marginBottom: 8 }}>
                  <textarea
                    rows={3}
                    value={f.a}
                    onChange={(e) => updateFaq(i, { a: e.target.value })}
                    placeholder="Answer"
                  />
                </div>
                <label className="ah-checkbox">
                  <input
                    type="checkbox"
                    checked={!!f.open}
                    onChange={(e) => updateFaq(i, { open: e.target.checked })}
                  />
                  Open by default
                </label>
              </div>
              <div className="row" style={{ gap: 4 }}>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => moveFaq(i, -1)}
                  aria-label="Up"
                >
                  <ArrowUp />
                </button>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => moveFaq(i, 1)}
                  aria-label="Down"
                >
                  <ArrowDown />
                </button>
                <button
                  type="button"
                  className="btn danger sm"
                  onClick={() => setFaqs(data.faqs.filter((_, idx) => idx !== i))}
                  aria-label="Delete"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="row">
          <div className="gap" />
          <button type="submit" className="btn primary" disabled={saving}>
            <Save />
            {saving ? "Saving..." : "Save Allied Health"}
          </button>
        </div>
      </div>
    </form>
  );
}
