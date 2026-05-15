"use client";

import { useState } from "react";
import {
  Save,
  ExternalLink,
  Megaphone,
  Sparkles,
  Phone,
  Users,
  Tag,
  CalendarDays,
  Award,
  Heart,
  Layers,
  Image as ImageIcon,
  Quote,
  Trash2,
  Plus,
  Send,
} from "lucide-react";
import type {
  SiteContent,
  HomeDiscipline,
  SpaceCell,
  TestiStory,
  FooterContact,
} from "@/lib/data";
import { showToast } from "./Toast";
import LivePreview from "./LivePreview";
import ImagePicker from "./ImagePicker";

type Setter<T> = (next: T) => void;

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

export default function SiteEditor({ initial }: { initial: SiteContent }) {
  const [s, setS] = useState<SiteContent>(initial);
  const [saving, setSaving] = useState(false);
  const [refreshToken, setRefreshToken] = useState(Date.now());

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaving(false);
    if (res.ok) {
      showToast("Saved", "ok");
      setRefreshToken(Date.now());
    } else {
      showToast("Save failed", "err");
    }
  };

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setS({ ...s, [key]: value });

  return (
    <div className="page-editor">
      <form onSubmit={save} className="page-editor-form">
        {/* GLOBAL SETTINGS */}
        <SectionCard
          icon={<Megaphone size={16} />}
          title="Announcement Bar"
          hint="Top yellow strip across every page."
        >
          <div className="field">
            <input
              value={s.announce}
              onChange={(e) => update("announce", e.target.value)}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<Sparkles size={16} />}
          title="SEO Meta (Homepage)"
          hint="Browser tab title and search-engine description."
        >
          <TF
            label="Title"
            value={s.meta.title}
            onChange={(v) => update("meta", { ...s.meta, title: v })}
          />
          <TA
            label="Description"
            value={s.meta.description}
            onChange={(v) => update("meta", { ...s.meta, description: v })}
          />
        </SectionCard>

        {/* HERO */}
        <SectionCard
          icon={<Sparkles size={16} />}
          title="Hero Section"
          hint="Top-of-page video, headline, stats."
        >
          <TF
            label="Kicker (small text above title)"
            value={s.hero.kicker}
            onChange={(v) => update("hero", { ...s.hero, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Headline line 1"
              value={s.hero.h1Top}
              onChange={(v) => update("hero", { ...s.hero, h1Top: v })}
            />
            <TF
              label="Headline line 2 (italic accent)"
              value={s.hero.h1Em}
              onChange={(v) => update("hero", { ...s.hero, h1Em: v })}
            />
          </div>
          <TA
            label="Sub-text"
            rows={3}
            value={s.hero.sub}
            onChange={(v) => update("hero", { ...s.hero, sub: v })}
          />
          <TF
            label="Bold callout (after sub-text)"
            value={s.hero.subBoldStart}
            onChange={(v) => update("hero", { ...s.hero, subBoldStart: v })}
          />
          <div className="field-row">
            <TF
              label="Primary button label"
              value={s.hero.primaryBtn.label}
              onChange={(v) =>
                update("hero", {
                  ...s.hero,
                  primaryBtn: { ...s.hero.primaryBtn, label: v },
                })
              }
            />
            <TF
              label="Primary button href"
              value={s.hero.primaryBtn.href}
              onChange={(v) =>
                update("hero", {
                  ...s.hero,
                  primaryBtn: { ...s.hero.primaryBtn, href: v },
                })
              }
            />
          </div>
          <div className="field-row">
            <TF
              label="Secondary button label"
              value={s.hero.secondaryBtn.label}
              onChange={(v) =>
                update("hero", {
                  ...s.hero,
                  secondaryBtn: { ...s.hero.secondaryBtn, label: v },
                })
              }
            />
            <TF
              label="Secondary button href"
              value={s.hero.secondaryBtn.href}
              onChange={(v) =>
                update("hero", {
                  ...s.hero,
                  secondaryBtn: { ...s.hero.secondaryBtn, href: v },
                })
              }
            />
          </div>
          <TA
            label="Background video embed URL"
            rows={2}
            value={s.hero.videoEmbedUrl}
            onChange={(v) => update("hero", { ...s.hero, videoEmbedUrl: v })}
          />
          <div className="field">
            <label>Hero stats (bottom row)</label>
            <ListEd
              label="Stat"
              items={s.hero.stats}
              onChange={(stats) => update("hero", { ...s.hero, stats })}
              newItem={() => ({ n: "", l: "" })}
              render={(it, _i, upd) => (
                <div className="field-row">
                  <TF
                    label="Number"
                    value={it.n}
                    onChange={(v) => upd({ ...it, n: v })}
                  />
                  <TF
                    label="Label"
                    value={it.l}
                    onChange={(v) => upd({ ...it, l: v })}
                  />
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* TRUST */}
        <SectionCard
          icon={<Award size={16} />}
          title="Trusted By (Logo Strip)"
          hint="Pro club logos band below hero."
        >
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.trust.headingTop}
              onChange={(v) => update("trust", { ...s.trust, headingTop: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.trust.headingEm}
              onChange={(v) => update("trust", { ...s.trust, headingEm: v })}
            />
          </div>
          <TF
            label="Section label"
            value={s.trust.label}
            onChange={(v) => update("trust", { ...s.trust, label: v })}
          />
          <div className="field">
            <label>Logos</label>
            <ListEd
              label="Logo"
              items={s.trust.logos}
              onChange={(logos) => update("trust", { ...s.trust, logos })}
              newItem={() => ({ src: "", alt: "" })}
              render={(it, _i, upd) => (
                <>
                  <ImagePicker
                    label="Logo image"
                    value={it.src}
                    onChange={(src) => upd({ ...it, src })}
                  />
                  <TF
                    label="Alt text"
                    value={it.alt}
                    onChange={(v) => upd({ ...it, alt: v })}
                  />
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* COMMUNITY */}
        <SectionCard
          icon={<Users size={16} />}
          title="Community Section"
          hint="Who we are — audience cards."
        >
          <TF
            label="Kicker"
            value={s.community.kicker}
            onChange={(v) => update("community", { ...s.community, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.community.h2Top}
              onChange={(v) => update("community", { ...s.community, h2Top: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.community.h2Em}
              onChange={(v) => update("community", { ...s.community, h2Em: v })}
            />
          </div>
          <TF
            label="Brand statement line 1"
            value={s.community.brandStatementTop}
            onChange={(v) =>
              update("community", { ...s.community, brandStatementTop: v })
            }
          />
          <TF
            label="Brand statement line 2 (italic)"
            value={s.community.brandStatementEm}
            onChange={(v) =>
              update("community", { ...s.community, brandStatementEm: v })
            }
          />
          <TA
            label="Body"
            rows={4}
            value={s.community.body}
            onChange={(v) => update("community", { ...s.community, body: v })}
          />
          <TF
            label="Slogan block label"
            value={s.community.sloganLabel}
            onChange={(v) =>
              update("community", { ...s.community, sloganLabel: v })
            }
          />
          <div className="field-row">
            <TF
              label="Slogan line 1"
              value={s.community.sloganTop}
              onChange={(v) =>
                update("community", { ...s.community, sloganTop: v })
              }
            />
            <TF
              label="Slogan line 2 (italic)"
              value={s.community.sloganEm}
              onChange={(v) =>
                update("community", { ...s.community, sloganEm: v })
              }
            />
          </div>
          <div className="field">
            <label>Audience cards</label>
            <ListEd
              label="Audience"
              items={s.community.audiences}
              onChange={(audiences) =>
                update("community", { ...s.community, audiences })
              }
              newItem={() => ({ icon: "", title: "", desc: "" })}
              render={(it, _i, upd) => (
                <>
                  <div className="field-row">
                    <TF
                      label="Icon (emoji)"
                      value={it.icon}
                      onChange={(v) => upd({ ...it, icon: v })}
                    />
                    <TF
                      label="Title"
                      value={it.title}
                      onChange={(v) => upd({ ...it, title: v })}
                    />
                  </div>
                  <TA
                    label="Description"
                    value={it.desc}
                    onChange={(v) => upd({ ...it, desc: v })}
                  />
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* VS */}
        <SectionCard
          icon={<Layers size={16} />}
          title="Versus Section"
          hint="Comparison rows: us vs. regular gyms."
        >
          <TF
            label="Kicker"
            value={s.vs.kicker}
            onChange={(v) => update("vs", { ...s.vs, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.vs.h2Top}
              onChange={(v) => update("vs", { ...s.vs, h2Top: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.vs.h2Em}
              onChange={(v) => update("vs", { ...s.vs, h2Em: v })}
            />
          </div>
          <TA
            label="Body"
            value={s.vs.body}
            onChange={(v) => update("vs", { ...s.vs, body: v })}
          />
          <div className="field-row-3">
            <TF
              label="Left column heading"
              value={s.vs.themHead}
              onChange={(v) => update("vs", { ...s.vs, themHead: v })}
            />
            <TF
              label="Middle"
              value={s.vs.midHead}
              onChange={(v) => update("vs", { ...s.vs, midHead: v })}
            />
            <TF
              label="Right column heading"
              value={s.vs.usHead}
              onChange={(v) => update("vs", { ...s.vs, usHead: v })}
            />
          </div>
          <div className="field">
            <label>Comparison rows</label>
            <ListEd
              label="Row"
              items={s.vs.rows}
              onChange={(rows) => update("vs", { ...s.vs, rows })}
              newItem={() => ({ bad: "", good: "" })}
              render={(it, _i, upd) => (
                <div className="field-row">
                  <TA
                    label="Them (negative)"
                    value={it.bad}
                    onChange={(v) => upd({ ...it, bad: v })}
                  />
                  <TA
                    label="Us (positive)"
                    value={it.good}
                    onChange={(v) => upd({ ...it, good: v })}
                  />
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* CLASSES */}
        <SectionCard
          icon={<CalendarDays size={16} />}
          title="Classes Section"
          hint="4 class cards (Youth, Adults, Family, Athlete)."
        >
          <TF
            label="Kicker"
            value={s.classes.kicker}
            onChange={(v) => update("classes", { ...s.classes, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.classes.h2Top}
              onChange={(v) => update("classes", { ...s.classes, h2Top: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.classes.h2Em}
              onChange={(v) => update("classes", { ...s.classes, h2Em: v })}
            />
          </div>
          <TA
            label="Body"
            value={s.classes.body}
            onChange={(v) => update("classes", { ...s.classes, body: v })}
          />
          <div className="field">
            <label>Class cards</label>
            <ListEd
              label="Class"
              items={s.classes.items}
              onChange={(items) => update("classes", { ...s.classes, items })}
              newItem={() => ({
                img: "",
                alt: "",
                tag: "",
                name: "",
                desc: "",
                href: "#form",
              })}
              render={(it, _i, upd) => (
                <>
                  <ImagePicker
                    label="Image"
                    value={it.img}
                    onChange={(img) => upd({ ...it, img })}
                  />
                  <div className="field-row">
                    <TF
                      label="Tag (ages, level)"
                      value={it.tag}
                      onChange={(v) => upd({ ...it, tag: v })}
                    />
                    <TF
                      label="Name"
                      value={it.name}
                      onChange={(v) => upd({ ...it, name: v })}
                    />
                  </div>
                  <TA
                    label="Description"
                    rows={4}
                    value={it.desc}
                    onChange={(v) => upd({ ...it, desc: v })}
                  />
                  <div className="field-row">
                    <TF
                      label="Image alt"
                      value={it.alt}
                      onChange={(v) => upd({ ...it, alt: v })}
                    />
                    <TF
                      label="Link href"
                      value={it.href}
                      onChange={(v) => upd({ ...it, href: v })}
                    />
                  </div>
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* DISCIPLINES */}
        <SectionCard
          icon={<Layers size={16} />}
          title="Disciplines Section"
          hint="Numbered specialisations."
        >
          <TF
            label="Kicker"
            value={s.disciplines.kicker}
            onChange={(v) =>
              update("disciplines", { ...s.disciplines, kicker: v })
            }
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.disciplines.h2Top}
              onChange={(v) =>
                update("disciplines", { ...s.disciplines, h2Top: v })
              }
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.disciplines.h2Em}
              onChange={(v) =>
                update("disciplines", { ...s.disciplines, h2Em: v })
              }
            />
          </div>
          <div className="field">
            <label>Discipline cards</label>
            <ListEd
              label="Discipline"
              items={s.disciplines.items}
              onChange={(items) =>
                update("disciplines", { ...s.disciplines, items })
              }
              newItem={(): HomeDiscipline => ({ num: "", name: "", desc: "" })}
              render={(it, _i, upd) => (
                <>
                  <div className="field-row">
                    <TF
                      label="Number"
                      value={it.num}
                      onChange={(v) => upd({ ...it, num: v })}
                    />
                    <TF
                      label="Name"
                      value={it.name}
                      onChange={(v) => upd({ ...it, name: v })}
                    />
                  </div>
                  <TA
                    label="Description"
                    rows={3}
                    value={it.desc}
                    onChange={(v) => upd({ ...it, desc: v })}
                  />
                  <div className="field-row">
                    <div className="field">
                      <label>Hawkin highlight?</label>
                      <select
                        value={it.hawkin ? "yes" : "no"}
                        onChange={(e) =>
                          upd({ ...it, hawkin: e.target.value === "yes" })
                        }
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <TF
                      label="Note (shown if Hawkin)"
                      value={it.note ?? ""}
                      onChange={(v) => upd({ ...it, note: v })}
                    />
                  </div>
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* COACHES */}
        <SectionCard
          icon={<Users size={16} />}
          title="Coaches Section"
          hint="Heading and credentials bar. The coach photo grid is managed under Team / Coaches."
        >
          <TF
            label="Kicker"
            value={s.coaches.kicker}
            onChange={(v) => update("coaches", { ...s.coaches, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.coaches.h2Top}
              onChange={(v) => update("coaches", { ...s.coaches, h2Top: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.coaches.h2Em}
              onChange={(v) => update("coaches", { ...s.coaches, h2Em: v })}
            />
          </div>
          <TA
            label="Body"
            rows={3}
            value={s.coaches.body}
            onChange={(v) => update("coaches", { ...s.coaches, body: v })}
          />
          <div className="field">
            <label>Credentials bar</label>
            <ListEd
              label="Credential"
              items={s.coaches.credBar}
              onChange={(credBar) =>
                update("coaches", { ...s.coaches, credBar })
              }
              newItem={() => ({ val: "", lbl: "" })}
              render={(it, _i, upd) => (
                <div className="field-row">
                  <TF
                    label="Value"
                    value={it.val}
                    onChange={(v) => upd({ ...it, val: v })}
                  />
                  <TF
                    label="Label"
                    value={it.lbl}
                    onChange={(v) => upd({ ...it, lbl: v })}
                  />
                </div>
              )}
            />
          </div>
        </SectionCard>

        {/* HUB / ALLIED HEALTH */}
        <SectionCard
          icon={<Heart size={16} />}
          title="Allied Health Hub"
          hint="Sports physio + dietitian section."
        >
          <TF
            label="Kicker"
            value={s.hub.kicker}
            onChange={(v) => update("hub", { ...s.hub, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.hub.h2Top}
              onChange={(v) => update("hub", { ...s.hub, h2Top: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.hub.h2Em}
              onChange={(v) => update("hub", { ...s.hub, h2Em: v })}
            />
          </div>
          <TA
            label="Body"
            rows={3}
            value={s.hub.body}
            onChange={(v) => update("hub", { ...s.hub, body: v })}
          />
          <div className="field">
            <label>Stat boxes (top row)</label>
            <ListEd
              label="Stat"
              items={s.hub.stats}
              onChange={(stats) => update("hub", { ...s.hub, stats })}
              newItem={() => ({ n: "", l: "" })}
              render={(it, _i, upd) => (
                <div className="field-row">
                  <TF
                    label="Number"
                    value={it.n}
                    onChange={(v) => upd({ ...it, n: v })}
                  />
                  <TF
                    label="Label"
                    value={it.l}
                    onChange={(v) => upd({ ...it, l: v })}
                  />
                </div>
              )}
            />
          </div>
          <TF
            label="Physio card badge"
            value={s.hub.cardBadge}
            onChange={(v) => update("hub", { ...s.hub, cardBadge: v })}
          />
          <TF
            label="Physio card title"
            value={s.hub.cardTitle}
            onChange={(v) => update("hub", { ...s.hub, cardTitle: v })}
          />
          <TA
            label="Physio card description"
            rows={4}
            value={s.hub.cardDesc}
            onChange={(v) => update("hub", { ...s.hub, cardDesc: v })}
          />
          <div className="field">
            <label>Physio services</label>
            <ListEd
              label="Service"
              items={s.hub.services}
              onChange={(services) => update("hub", { ...s.hub, services })}
              newItem={() => ({ icon: "", text: "" })}
              render={(it, _i, upd) => (
                <div className="field-row">
                  <TF
                    label="Icon"
                    value={it.icon}
                    onChange={(v) => upd({ ...it, icon: v })}
                  />
                  <TF
                    label="Text"
                    value={it.text}
                    onChange={(v) => upd({ ...it, text: v })}
                  />
                </div>
              )}
            />
          </div>
          <div className="field">
            <label>Physiotherapists</label>
            <ListEd
              label="Physio"
              items={s.hub.physios}
              onChange={(physios) => update("hub", { ...s.hub, physios })}
              newItem={() => ({ name: "", role: "", exp: "", img: "" })}
              render={(it, _i, upd) => (
                <>
                  <ImagePicker
                    label="Photo"
                    value={it.img}
                    onChange={(img) => upd({ ...it, img })}
                  />
                  <TF
                    label="Name"
                    value={it.name}
                    onChange={(v) => upd({ ...it, name: v })}
                  />
                  <TF
                    label="Role"
                    value={it.role}
                    onChange={(v) => upd({ ...it, role: v })}
                  />
                  <TA
                    label="Experience"
                    rows={4}
                    value={it.exp}
                    onChange={(v) => upd({ ...it, exp: v })}
                  />
                </>
              )}
            />
          </div>
          <TF
            label="Dietitian label"
            value={s.hub.dietLabel}
            onChange={(v) => update("hub", { ...s.hub, dietLabel: v })}
          />
          <div className="field-row">
            <TF
              label="Dietitian title line 1"
              value={s.hub.dietTitleTop}
              onChange={(v) => update("hub", { ...s.hub, dietTitleTop: v })}
            />
            <TF
              label="Dietitian title line 2 (italic)"
              value={s.hub.dietTitleEm}
              onChange={(v) => update("hub", { ...s.hub, dietTitleEm: v })}
            />
          </div>
          <TA
            label="Dietitian description"
            rows={3}
            value={s.hub.dietDesc}
            onChange={(v) => update("hub", { ...s.hub, dietDesc: v })}
          />
          <TF
            label="Dietitian credentials (comma separated)"
            value={s.hub.dietCreds.join(", ")}
            onChange={(v) =>
              update("hub", {
                ...s.hub,
                dietCreds: v
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
          />
        </SectionCard>

        {/* SPACE */}
        <SectionCard
          icon={<ImageIcon size={16} />}
          title="The Floor (Space) Section"
          hint="Photo grid of the facility."
        >
          <TF
            label="Kicker"
            value={s.space.kicker}
            onChange={(v) => update("space", { ...s.space, kicker: v })}
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.space.h2Top}
              onChange={(v) => update("space", { ...s.space, h2Top: v })}
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.space.h2Em}
              onChange={(v) => update("space", { ...s.space, h2Em: v })}
            />
          </div>
          <TA
            label="Body"
            value={s.space.body}
            onChange={(v) => update("space", { ...s.space, body: v })}
          />
          <div className="field">
            <label>Photo cells</label>
            <ListEd
              label="Cell"
              items={s.space.cells}
              onChange={(cells) => update("space", { ...s.space, cells })}
              newItem={(): SpaceCell => ({
                img: "",
                alt: "",
                labelTop: "",
                labelBottom: "",
              })}
              render={(it, _i, upd) => (
                <>
                  <ImagePicker
                    label="Image"
                    value={it.img}
                    onChange={(img) => upd({ ...it, img })}
                  />
                  <TF
                    label="Alt text"
                    value={it.alt}
                    onChange={(v) => upd({ ...it, alt: v })}
                  />
                  <div className="field-row">
                    <TF
                      label="Label top"
                      value={it.labelTop}
                      onChange={(v) => upd({ ...it, labelTop: v })}
                    />
                    <TF
                      label="Label bottom (bold)"
                      value={it.labelBottom}
                      onChange={(v) => upd({ ...it, labelBottom: v })}
                    />
                  </div>
                  <div className="field">
                    <label>Tall cell?</label>
                    <select
                      value={it.tall ? "yes" : "no"}
                      onChange={(e) =>
                        upd({ ...it, tall: e.target.value === "yes" })
                      }
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes (double height)</option>
                    </select>
                  </div>
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* TESTIMONIALS */}
        <SectionCard
          icon={<Quote size={16} />}
          title="Testimonials Section"
          hint="Hero quote, video testimonials, and member stories."
        >
          <TF
            label="Kicker"
            value={s.testimonials.kicker}
            onChange={(v) =>
              update("testimonials", { ...s.testimonials, kicker: v })
            }
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.testimonials.h2Top}
              onChange={(v) =>
                update("testimonials", { ...s.testimonials, h2Top: v })
              }
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.testimonials.h2Em}
              onChange={(v) =>
                update("testimonials", { ...s.testimonials, h2Em: v })
              }
            />
          </div>
          <TA
            label="Hero quote text (prefix)"
            value={s.testimonials.heroQuoteText}
            onChange={(v) =>
              update("testimonials", { ...s.testimonials, heroQuoteText: v })
            }
          />
          <TF
            label="Hero quote italic part"
            value={s.testimonials.heroQuoteEm}
            onChange={(v) =>
              update("testimonials", { ...s.testimonials, heroQuoteEm: v })
            }
          />
          <TA
            label="Hero quote attribution"
            value={s.testimonials.heroQuoteAttr}
            onChange={(v) =>
              update("testimonials", { ...s.testimonials, heroQuoteAttr: v })
            }
          />
          <div className="field">
            <label>Video testimonials</label>
            <ListEd
              label="Video"
              items={s.testimonials.videos}
              onChange={(videos) =>
                update("testimonials", { ...s.testimonials, videos })
              }
              newItem={() => ({
                src: "",
                quote: "",
                bold: "",
                tail: "",
                avatar: "",
                name: "",
                meta: "",
              })}
              render={(it, _i, upd) => (
                <>
                  <TF
                    label="Video URL (mp4)"
                    value={it.src}
                    onChange={(v) => upd({ ...it, src: v })}
                  />
                  <TA
                    label="Quote prefix"
                    value={it.quote}
                    onChange={(v) => upd({ ...it, quote: v })}
                  />
                  <TF
                    label="Bold part"
                    value={it.bold}
                    onChange={(v) => upd({ ...it, bold: v })}
                  />
                  <TA
                    label="Quote tail"
                    value={it.tail}
                    onChange={(v) => upd({ ...it, tail: v })}
                  />
                  <div className="field-row-3">
                    <TF
                      label="Avatar (emoji)"
                      value={it.avatar}
                      onChange={(v) => upd({ ...it, avatar: v })}
                    />
                    <TF
                      label="Name"
                      value={it.name}
                      onChange={(v) => upd({ ...it, name: v })}
                    />
                    <TF
                      label="Meta"
                      value={it.meta}
                      onChange={(v) => upd({ ...it, meta: v })}
                    />
                  </div>
                </>
              )}
            />
          </div>
          <div className="field">
            <label>Member stories</label>
            <ListEd
              label="Story"
              items={s.testimonials.stories}
              onChange={(stories) =>
                update("testimonials", { ...s.testimonials, stories })
              }
              newItem={(): TestiStory => ({
                icon: "🏆",
                titleTop: "",
                titleEm: "",
                body: "",
              })}
              render={(it, _i, upd) => (
                <>
                  <div className="field-row">
                    <TF
                      label="Icon"
                      value={it.icon}
                      onChange={(v) => upd({ ...it, icon: v })}
                    />
                    <div className="field">
                      <label>Style</label>
                      <select
                        value={it.isQuote ? "quote" : "regular"}
                        onChange={(e) =>
                          upd({
                            ...it,
                            isQuote: e.target.value === "quote",
                          })
                        }
                      >
                        <option value="regular">Regular paragraph</option>
                        <option value="quote">Pull quote</option>
                      </select>
                    </div>
                  </div>
                  <div className="field-row">
                    <TF
                      label="Title line 1"
                      value={it.titleTop}
                      onChange={(v) => upd({ ...it, titleTop: v })}
                    />
                    <TF
                      label="Title line 2 (italic)"
                      value={it.titleEm}
                      onChange={(v) => upd({ ...it, titleEm: v })}
                    />
                  </div>
                  <TA
                    label="Body"
                    rows={3}
                    value={it.body}
                    onChange={(v) => upd({ ...it, body: v })}
                  />
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* MEMBERSHIP */}
        <SectionCard
          icon={<Tag size={16} />}
          title="Membership Section"
          hint="Pricing plan cards."
        >
          <TF
            label="Kicker"
            value={s.membership.kicker}
            onChange={(v) =>
              update("membership", { ...s.membership, kicker: v })
            }
          />
          <div className="field-row">
            <TF
              label="Heading line 1"
              value={s.membership.h2Top}
              onChange={(v) =>
                update("membership", { ...s.membership, h2Top: v })
              }
            />
            <TF
              label="Heading line 2 (italic)"
              value={s.membership.h2Em}
              onChange={(v) =>
                update("membership", { ...s.membership, h2Em: v })
              }
            />
          </div>
          <TA
            label="Body"
            value={s.membership.body}
            onChange={(v) => update("membership", { ...s.membership, body: v })}
          />
          <div className="field">
            <label>Plans</label>
            <ListEd
              label="Plan"
              items={s.membership.plans}
              onChange={(plans) =>
                update("membership", { ...s.membership, plans })
              }
              newItem={() => ({
                tier: "",
                name: "",
                price: "",
                img: "",
                alt: "",
                features: [],
                href: "#form",
              })}
              render={(it, _i, upd) => (
                <>
                  <ImagePicker
                    label="Image"
                    value={it.img}
                    onChange={(img) => upd({ ...it, img })}
                  />
                  <div className="field-row-3">
                    <TF
                      label="Tier (small text)"
                      value={it.tier}
                      onChange={(v) => upd({ ...it, tier: v })}
                    />
                    <TF
                      label="Name"
                      value={it.name}
                      onChange={(v) => upd({ ...it, name: v })}
                    />
                    <TF
                      label="Price"
                      value={it.price}
                      onChange={(v) => upd({ ...it, price: v })}
                    />
                  </div>
                  <div className="field-row">
                    <TF
                      label="Image alt"
                      value={it.alt}
                      onChange={(v) => upd({ ...it, alt: v })}
                    />
                    <TF
                      label="Link href"
                      value={it.href}
                      onChange={(v) => upd({ ...it, href: v })}
                    />
                  </div>
                  <div className="field">
                    <label>Featured ("Most Popular")?</label>
                    <select
                      value={it.featured ? "yes" : "no"}
                      onChange={(e) =>
                        upd({ ...it, featured: e.target.value === "yes" })
                      }
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <TA
                    label="Features (one per line)"
                    rows={6}
                    value={it.features.join("\n")}
                    onChange={(v) =>
                      upd({
                        ...it,
                        features: v
                          .split("\n")
                          .map((x) => x.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </>
              )}
            />
          </div>
        </SectionCard>

        {/* CTA */}
        <SectionCard
          icon={<Send size={16} />}
          title="$7 Trial CTA"
          hint="Big call-to-action banner near the bottom."
        >
          <TF
            label="Tag (small label)"
            value={s.cta.tag}
            onChange={(v) => update("cta", { ...s.cta, tag: v })}
          />
          <div className="field-row">
            <TF
              label="Headline line 1"
              value={s.cta.hTop}
              onChange={(v) => update("cta", { ...s.cta, hTop: v })}
            />
            <TF
              label="Headline line 2 (italic)"
              value={s.cta.hEm}
              onChange={(v) => update("cta", { ...s.cta, hEm: v })}
            />
          </div>
          <TA
            label="Sub-text"
            value={s.cta.sub}
            onChange={(v) => update("cta", { ...s.cta, sub: v })}
          />
          <TF
            label="Detail line"
            value={s.cta.detail}
            onChange={(v) => update("cta", { ...s.cta, detail: v })}
          />
          <div className="field-row">
            <TF
              label="Primary button label"
              value={s.cta.primaryBtn.label}
              onChange={(v) =>
                update("cta", {
                  ...s.cta,
                  primaryBtn: { ...s.cta.primaryBtn, label: v },
                })
              }
            />
            <TF
              label="Primary button href"
              value={s.cta.primaryBtn.href}
              onChange={(v) =>
                update("cta", {
                  ...s.cta,
                  primaryBtn: { ...s.cta.primaryBtn, href: v },
                })
              }
            />
          </div>
          <div className="field-row">
            <TF
              label="Secondary button label"
              value={s.cta.secondaryBtn.label}
              onChange={(v) =>
                update("cta", {
                  ...s.cta,
                  secondaryBtn: { ...s.cta.secondaryBtn, label: v },
                })
              }
            />
            <TF
              label="Secondary button href"
              value={s.cta.secondaryBtn.href}
              onChange={(v) =>
                update("cta", {
                  ...s.cta,
                  secondaryBtn: { ...s.cta.secondaryBtn, href: v },
                })
              }
            />
          </div>
        </SectionCard>

        {/* FOOTER */}
        <SectionCard
          icon={<Phone size={16} />}
          title="Footer & Lead Form"
          hint="Bottom of homepage — brand, contacts, contact form."
        >
          <ImagePicker
            label="Brand logo image"
            value={s.footer.brandImg}
            onChange={(brandImg) => update("footer", { ...s.footer, brandImg })}
          />
          <TA
            label="Tagline"
            rows={3}
            value={s.footer.tagline}
            onChange={(v) => update("footer", { ...s.footer, tagline: v })}
          />
          <div className="field">
            <label>Contact rows</label>
            <ListEd
              label="Contact"
              items={s.footer.contacts}
              onChange={(contacts) =>
                update("footer", { ...s.footer, contacts })
              }
              newItem={(): FooterContact => ({ icon: "", text: "" })}
              render={(it, _i, upd) => (
                <>
                  <div className="field-row">
                    <TF
                      label="Icon"
                      value={it.icon}
                      onChange={(v) => upd({ ...it, icon: v })}
                    />
                    <TF
                      label="Text"
                      value={it.text}
                      onChange={(v) => upd({ ...it, text: v })}
                    />
                  </div>
                  <TF
                    label="Href (tel:/mailto:/url, optional)"
                    value={it.href ?? ""}
                    onChange={(v) =>
                      upd({ ...it, href: v || undefined })
                    }
                  />
                </>
              )}
            />
          </div>
          <TF
            label="Form title"
            value={s.footer.formTitle}
            onChange={(v) => update("footer", { ...s.footer, formTitle: v })}
          />
          <TA
            label="Form sub-text"
            value={s.footer.formSub}
            onChange={(v) => update("footer", { ...s.footer, formSub: v })}
          />
          <TF
            label="Form submit button label"
            value={s.footer.formButtonLabel}
            onChange={(v) =>
              update("footer", { ...s.footer, formButtonLabel: v })
            }
          />
          <TA
            label={`"I'm joining as" options (one per line)`}
            rows={5}
            value={s.footer.joinOptions.join("\n")}
            onChange={(v) =>
              update("footer", {
                ...s.footer,
                joinOptions: v
                  .split("\n")
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
          />
        </SectionCard>

        {/* SHARED — Contact (used in side panel, other pages) */}
        <SectionCard
          icon={<Phone size={16} />}
          title="Site Contact Info"
          hint="Used in side panel and other pages (separate from footer text)."
        >
          <div className="field-row">
            <TF
              label="Phone"
              value={s.contact.phone}
              onChange={(v) => update("contact", { ...s.contact, phone: v })}
            />
            <TF
              label="Email"
              value={s.contact.email}
              onChange={(v) => update("contact", { ...s.contact, email: v })}
            />
          </div>
          <TF
            label="Address"
            value={s.contact.address}
            onChange={(v) => update("contact", { ...s.contact, address: v })}
          />
          <TA
            label="Service areas"
            value={s.contact.areas}
            onChange={(v) => update("contact", { ...s.contact, areas: v })}
          />
        </SectionCard>

        {/* SHARED — Trial banner used on other pages */}
        <SectionCard
          icon={<Send size={16} />}
          title="Shared Trial Banner"
          hint="Used by other pages (our-gym CTA via TrialCTA component)."
        >
          <TF
            label="Heading"
            value={s.trial.heading}
            onChange={(v) => update("trial", { ...s.trial, heading: v })}
          />
          <TA
            label="Body"
            value={s.trial.body}
            onChange={(v) => update("trial", { ...s.trial, body: v })}
          />
        </SectionCard>

        <div className="card save-bar">
          <div className="row">
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="btn ghost"
            >
              <ExternalLink size={14} /> View page
            </a>
            <div className="gap" />
            <button type="submit" className="btn primary" disabled={saving}>
              <Save />
              {saving ? "Saving..." : "Save all changes"}
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
