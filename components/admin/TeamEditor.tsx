"use client";

import { useState } from "react";
import { Save, Trash2, ArrowUp, ArrowDown, UserPlus, Users } from "lucide-react";
import { showToast } from "./Toast";
import ImagePicker from "./ImagePicker";
import type { Coach } from "@/lib/data";

function newCoach(): Coach {
  return {
    id: `coach-${Date.now()}`,
    name: "",
    displayName: "",
    role: "",
    image: "",
  };
}

export default function TeamEditor({ initial }: { initial: Coach[] }) {
  const [team, setTeam] = useState<Coach[]>(initial);
  const [saving, setSaving] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const update = (i: number, patch: Partial<Coach>) =>
    setTeam((t) => t.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  const remove = (i: number) =>
    setTeam((t) => t.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= team.length) return;
    const next = team.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setTeam(next);
  };
  const add = () => {
    setTeam((t) => [...t, newCoach()]);
    setOpenIdx(team.length);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });
    setSaving(false);
    showToast(res.ok ? "Team saved" : "Save failed", res.ok ? "ok" : "err");
  };

  return (
    <form onSubmit={save}>
      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <Users size={16} />
          </div>
          <div>
            <h2>Coaches ({team.length})</h2>
            <p className="muted" style={{ margin: 0 }}>
              Click a coach to edit photo. Reorder with arrows.
            </p>
          </div>
          <div className="gap" />
          <button type="button" className="btn" onClick={add}>
            <UserPlus />
            Add coach
          </button>
        </div>

        {team.map((c, i) => (
          <div key={c.id}>
            <div className="coach-row">
              <img src={c.image || "/image/athlethix-logo.png"} alt={c.name || "coach"} />
              <input
                value={c.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Full name"
              />
              <input
                value={c.displayName}
                onChange={(e) => update(i, { displayName: e.target.value })}
                placeholder="Display name"
              />
              <input
                value={c.role}
                onChange={(e) => update(i, { role: e.target.value })}
                placeholder="Role"
              />
              <div className="row" style={{ gap: 4 }}>
                <button type="button" className="btn sm" onClick={() => move(i, -1)} aria-label="Up">
                  <ArrowUp />
                </button>
                <button type="button" className="btn sm" onClick={() => move(i, 1)} aria-label="Down">
                  <ArrowDown />
                </button>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  {openIdx === i ? "Hide" : "Photo"}
                </button>
                <button
                  type="button"
                  className="btn danger sm"
                  onClick={() => remove(i)}
                  aria-label="Delete"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
            {openIdx === i && (
              <div style={{ padding: "10px 0 18px" }}>
                <ImagePicker
                  value={c.image}
                  onChange={(v) => update(i, { image: v })}
                  label="Coach photo"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="row">
          <div className="gap" />
          <button type="submit" className="btn primary" disabled={saving}>
            <Save />
            {saving ? "Saving..." : "Save team"}
          </button>
        </div>
      </div>
    </form>
  );
}
