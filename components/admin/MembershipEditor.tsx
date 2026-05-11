"use client";

import { useState } from "react";
import { Save, Trash2, ArrowUp, ArrowDown, PlusCircle, Tag } from "lucide-react";
import { showToast } from "./Toast";
import ImagePicker from "./ImagePicker";
import type { MembershipPlan } from "@/lib/data";

function newPlan(): MembershipPlan {
  return {
    id: `plan-${Date.now()}`,
    title: "New Plan",
    price: "$0",
    cycle: "/ week",
    note: "",
    featured: false,
    image: "",
    imageAlt: "",
    features: [],
  };
}

export default function MembershipEditor({
  initial,
}: {
  initial: MembershipPlan[];
}) {
  const [plans, setPlans] = useState<MembershipPlan[]>(initial);
  const [saving, setSaving] = useState(false);

  const update = (i: number, patch: Partial<MembershipPlan>) =>
    setPlans((p) => p.map((pl, idx) => (idx === i ? { ...pl, ...patch } : pl)));
  const remove = (i: number) =>
    setPlans((p) => p.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= plans.length) return;
    const next = plans.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setPlans(next);
  };
  const add = () => setPlans((p) => [...p, newPlan()]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/membership", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plans),
    });
    setSaving(false);
    showToast(res.ok ? "Plans saved" : "Save failed", res.ok ? "ok" : "err");
  };

  return (
    <form onSubmit={save}>
      {plans.map((p, i) => (
        <div className="card" key={p.id}>
          <div className="head">
            <div className="icon-bg">
              <Tag size={16} />
            </div>
            <div>
              <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {p.title || "Untitled plan"}
                {p.featured && (
                  <span className="badge featured">
                    <span className="dot" />
                    featured
                  </span>
                )}
              </h2>
              <p className="muted" style={{ margin: 0 }}>
                {p.price} {p.cycle}
              </p>
            </div>
            <div className="gap" />
            <button type="button" className="btn sm" onClick={() => move(i, -1)}>
              <ArrowUp />
            </button>
            <button type="button" className="btn sm" onClick={() => move(i, 1)}>
              <ArrowDown />
            </button>
            <button
              type="button"
              className="btn danger sm"
              onClick={() => remove(i)}
            >
              <Trash2 />
            </button>
          </div>

          <div className="field-row-3">
            <div className="field">
              <label>Title</label>
              <input
                value={p.title}
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Price (e.g. $50)</label>
              <input
                value={p.price}
                onChange={(e) => update(i, { price: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Cycle (e.g. / week)</label>
              <input
                value={p.cycle}
                onChange={(e) => update(i, { cycle: e.target.value })}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Note (optional)</label>
              <input
                value={p.note}
                onChange={(e) => update(i, { note: e.target.value })}
                placeholder="e.g. 12 months subscription"
              />
            </div>
            <div className="field">
              <label>Featured?</label>
              <select
                value={p.featured ? "yes" : "no"}
                onChange={(e) =>
                  update(i, { featured: e.target.value === "yes" })
                }
              >
                <option value="no">No</option>
                <option value="yes">Yes (highlighted)</option>
              </select>
            </div>
          </div>

          <div className="field-row">
            <div>
              <ImagePicker
                value={p.image}
                onChange={(v) => update(i, { image: v })}
                label="Plan image"
              />
            </div>
            <div>
              <div className="field">
                <label>Image alt text</label>
                <input
                  value={p.imageAlt}
                  onChange={(e) => update(i, { imageAlt: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Features (one per line)</label>
                <textarea
                  value={p.features.join("\n")}
                  rows={6}
                  onChange={(e) =>
                    update(i, {
                      features: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card">
        <div className="row">
          <button type="button" className="btn" onClick={add}>
            <PlusCircle />
            Add plan
          </button>
          <div className="gap" />
          <button type="submit" className="btn primary" disabled={saving}>
            <Save />
            {saving ? "Saving..." : "Save all plans"}
          </button>
        </div>
      </div>
    </form>
  );
}
