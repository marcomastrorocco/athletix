"use client";

import { useState } from "react";
import { Save, Megaphone, Sparkles, BookOpen, Users, Send, Phone } from "lucide-react";
import { showToast } from "./Toast";
import type { SiteContent } from "@/lib/data";

export default function SiteEditor({ initial }: { initial: SiteContent }) {
  const [s, setS] = useState<SiteContent>(initial);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaving(false);
    showToast(res.ok ? "Saved" : "Save failed", res.ok ? "ok" : "err");
  };

  return (
    <form onSubmit={save}>
      <div className="card">
        <div className="head">
          <div className="icon-bg"><Megaphone size={16} /></div>
          <div>
            <h2>Announcement Bar</h2>
            <p className="muted" style={{ margin: 0 }}>Top yellow strip across every page.</p>
          </div>
        </div>
        <div className="field">
          <input
            value={s.announce}
            onChange={(e) => setS({ ...s, announce: e.target.value })}
          />
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg"><Sparkles size={16} /></div>
          <div>
            <h2>Page Meta (Homepage SEO)</h2>
            <p className="muted" style={{ margin: 0 }}>Title and description shown in browser tab and search results.</p>
          </div>
        </div>
        <div className="field">
          <label>Page Title</label>
          <input
            value={s.meta.title}
            onChange={(e) =>
              setS({ ...s, meta: { ...s.meta, title: e.target.value } })
            }
          />
        </div>
        <div className="field">
          <label>Meta Description</label>
          <textarea
            value={s.meta.description}
            rows={3}
            onChange={(e) =>
              setS({ ...s, meta: { ...s.meta, description: e.target.value } })
            }
          />
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg"><Sparkles size={16} /></div>
          <div>
            <h2>Hero Section</h2>
            <p className="muted" style={{ margin: 0 }}>Big headline area at the top of the homepage.</p>
          </div>
        </div>
        <div className="field">
          <label>Pill (small label above title)</label>
          <input
            value={s.hero.pill}
            onChange={(e) =>
              setS({ ...s, hero: { ...s.hero, pill: e.target.value } })
            }
          />
        </div>
        <div className="field">
          <label>Lede (paragraph below title)</label>
          <textarea
            value={s.hero.lede}
            rows={3}
            onChange={(e) =>
              setS({ ...s, hero: { ...s.hero, lede: e.target.value } })
            }
          />
        </div>
        <div className="field">
          <label>Rotating words (one per line)</label>
          <textarea
            value={s.hero.rotatingWords.join("\n")}
            rows={4}
            onChange={(e) =>
              setS({
                ...s,
                hero: {
                  ...s.hero,
                  rotatingWords: e.target.value
                    .split("\n")
                    .map((w) => w.trim())
                    .filter(Boolean),
                },
              })
            }
          />
        </div>

        <h3 style={{ fontSize: 14, marginTop: 18 }}>Stats (3 numbers shown in hero)</h3>
        {s.hero.stats.map((stat, i) => (
          <div className="field-row-3" key={i}>
            <div className="field">
              <label>Value</label>
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const next = [...s.hero.stats];
                  next[i] = { ...stat, value: Number(e.target.value) };
                  setS({ ...s, hero: { ...s.hero, stats: next } });
                }}
              />
            </div>
            <div className="field">
              <label>Label</label>
              <input
                value={stat.label}
                onChange={(e) => {
                  const next = [...s.hero.stats];
                  next[i] = { ...stat, label: e.target.value };
                  setS({ ...s, hero: { ...s.hero, stats: next } });
                }}
              />
            </div>
            <div className="field">
              <label>Plus sign?</label>
              <select
                value={stat.plus ? "yes" : "no"}
                onChange={(e) => {
                  const next = [...s.hero.stats];
                  next[i] = { ...stat, plus: e.target.value === "yes" };
                  setS({ ...s, hero: { ...s.hero, stats: next } });
                }}
              >
                <option value="no">No</option>
                <option value="yes">Yes (e.g. 4+)</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg"><BookOpen size={16} /></div>
          <div>
            <h2>Manifesto Section</h2>
            <p className="muted" style={{ margin: 0 }}>Mission statement under the hero.</p>
          </div>
        </div>
        <div className="field">
          <label>Eyebrow (small label)</label>
          <input
            value={s.manifesto.eyebrow}
            onChange={(e) =>
              setS({
                ...s,
                manifesto: { ...s.manifesto, eyebrow: e.target.value },
              })
            }
          />
        </div>
        <div className="field">
          <label>Heading</label>
          <textarea
            value={s.manifesto.heading}
            rows={2}
            onChange={(e) =>
              setS({
                ...s,
                manifesto: { ...s.manifesto, heading: e.target.value },
              })
            }
          />
        </div>
        <div className="field">
          <label>Body</label>
          <textarea
            value={s.manifesto.body}
            rows={4}
            onChange={(e) =>
              setS({
                ...s,
                manifesto: { ...s.manifesto, body: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg"><Users size={16} /></div>
          <div>
            <h2>Team Section Heading</h2>
            <p className="muted" style={{ margin: 0 }}>Heading above the coach grid on the homepage.</p>
          </div>
        </div>
        <div className="field">
          <label>Heading</label>
          <input
            value={s.team.heading}
            onChange={(e) =>
              setS({ ...s, team: { ...s.team, heading: e.target.value } })
            }
          />
        </div>
        <div className="field">
          <label>Sub-heading</label>
          <textarea
            value={s.team.sub}
            rows={3}
            onChange={(e) =>
              setS({ ...s, team: { ...s.team, sub: e.target.value } })
            }
          />
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg"><Send size={16} /></div>
          <div>
            <h2>Trial CTA</h2>
            <p className="muted" style={{ margin: 0 }}>Banner shown on many pages.</p>
          </div>
        </div>
        <div className="field">
          <label>Heading</label>
          <input
            value={s.trial.heading}
            onChange={(e) =>
              setS({ ...s, trial: { ...s.trial, heading: e.target.value } })
            }
          />
        </div>
        <div className="field">
          <label>Body</label>
          <textarea
            value={s.trial.body}
            rows={3}
            onChange={(e) =>
              setS({ ...s, trial: { ...s.trial, body: e.target.value } })
            }
          />
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg"><Phone size={16} /></div>
          <div>
            <h2>Contact Info</h2>
            <p className="muted" style={{ margin: 0 }}>Used in footer, side panel, and contact page.</p>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Phone</label>
            <input
              value={s.contact.phone}
              onChange={(e) =>
                setS({
                  ...s,
                  contact: { ...s.contact, phone: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              value={s.contact.email}
              onChange={(e) =>
                setS({
                  ...s,
                  contact: { ...s.contact, email: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="field">
          <label>Address</label>
          <input
            value={s.contact.address}
            onChange={(e) =>
              setS({
                ...s,
                contact: { ...s.contact, address: e.target.value },
              })
            }
          />
        </div>
        <div className="field">
          <label>Service Areas (comma/dot separated)</label>
          <textarea
            value={s.contact.areas}
            rows={2}
            onChange={(e) =>
              setS({
                ...s,
                contact: { ...s.contact, areas: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="card">
        <div className="row">
          <div className="gap" />
          <button type="submit" className="btn primary" disabled={saving}>
            <Save />
            {saving ? "Saving..." : "Save all changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
