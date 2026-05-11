"use client";

import { useState } from "react";
import { Save, PlusCircle, ArrowUp, ArrowDown, Trash2, CalendarDays } from "lucide-react";
import { showToast } from "./Toast";
import type { TimetableData, TimetableCell } from "@/lib/data";

const KINDS = ["adult", "youth", "recovery", "performance"];

type Filled = NonNullable<TimetableCell>;
function emptyCell(): Filled {
  return { kind: "adult", title: "", sub: "" };
}

export default function TimetableEditor({ initial }: { initial: TimetableData }) {
  const [data, setData] = useState<TimetableData>(initial);
  const [saving, setSaving] = useState(false);

  const updateDay = (i: number, value: string) =>
    setData((d) => ({
      ...d,
      days: d.days.map((day, idx) => (idx === i ? value : day)),
    }));

  const updateRowTime = (rowIdx: number, time: string) =>
    setData((d) => ({
      ...d,
      rows: d.rows.map((r, i) => (i === rowIdx ? { ...r, time } : r)),
    }));

  const updateCell = (
    rowIdx: number,
    colIdx: number,
    patch: Partial<Filled> | null
  ) =>
    setData((d) => ({
      ...d,
      rows: d.rows.map((r, i) => {
        if (i !== rowIdx) return r;
        const cells = r.cells.slice();
        if (patch === null) {
          cells[colIdx] = null;
        } else {
          const base: Filled = cells[colIdx] ?? emptyCell();
          cells[colIdx] = { ...base, ...patch };
        }
        return { ...r, cells };
      }),
    }));

  const addRow = () =>
    setData((d) => ({
      ...d,
      rows: [
        ...d.rows,
        { time: "12:00 PM", cells: d.days.map(() => null) },
      ],
    }));

  const removeRow = (i: number) =>
    setData((d) => ({ ...d, rows: d.rows.filter((_, idx) => idx !== i) }));

  const moveRow = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= data.rows.length) return;
    const rows = data.rows.slice();
    [rows[i], rows[j]] = [rows[j], rows[i]];
    setData({ ...data, rows });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/timetable", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    showToast(
      res.ok ? "Timetable saved" : "Save failed",
      res.ok ? "ok" : "err"
    );
  };

  return (
    <form onSubmit={save}>
      <div className="card">
        <div className="head">
          <div className="icon-bg"><CalendarDays size={16} /></div>
          <div>
            <h2>Day labels</h2>
            <p className="muted" style={{ margin: 0 }}>
              Shown above each column. Format like &quot;Monday 27 Apr&quot;.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 8,
          }}
        >
          {data.days.map((d, i) => (
            <input
              key={i}
              value={d}
              onChange={(e) => updateDay(i, e.target.value)}
              style={{
                background: "#0e0e14",
                border: "1px solid var(--border)",
                color: "var(--text)",
                borderRadius: 6,
                padding: "8px 10px",
                fontSize: 13,
              }}
            />
          ))}
        </div>
      </div>

      {data.rows.map((row, rowIdx) => (
        <div className="card" key={rowIdx}>
          <div className="row" style={{ marginBottom: 12 }}>
            <div className="field" style={{ marginBottom: 0, flex: "0 0 200px" }}>
              <label>Time slot</label>
              <input
                value={row.time}
                onChange={(e) => updateRowTime(rowIdx, e.target.value)}
              />
            </div>
            <div className="gap" />
            <button type="button" className="btn sm" onClick={() => moveRow(rowIdx, -1)}>
              <ArrowUp />
            </button>
            <button type="button" className="btn sm" onClick={() => moveRow(rowIdx, 1)}>
              <ArrowDown />
            </button>
            <button type="button" className="btn danger sm" onClick={() => removeRow(rowIdx)}>
              <Trash2 />
              Delete row
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 8,
            }}
          >
            {row.cells.map((cell, colIdx) => (
              <div
                key={colIdx}
                style={{
                  background: "#0e0e14",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {data.days[colIdx]?.split(" ")[0] || `Col ${colIdx + 1}`}
                </div>
                {cell ? (
                  <>
                    <select
                      value={cell.kind}
                      onChange={(e) =>
                        updateCell(rowIdx, colIdx, { kind: e.target.value })
                      }
                      style={{
                        background: "#1a1a22",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        borderRadius: 4,
                        padding: "4px 6px",
                        fontSize: 12,
                      }}
                    >
                      {KINDS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                    <input
                      value={cell.title}
                      placeholder="Title"
                      onChange={(e) =>
                        updateCell(rowIdx, colIdx, { title: e.target.value })
                      }
                      style={{
                        background: "#1a1a22",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        borderRadius: 4,
                        padding: "4px 6px",
                        fontSize: 12,
                      }}
                    />
                    <input
                      value={cell.sub}
                      placeholder="Subtitle"
                      onChange={(e) =>
                        updateCell(rowIdx, colIdx, { sub: e.target.value })
                      }
                      style={{
                        background: "#1a1a22",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        borderRadius: 4,
                        padding: "4px 6px",
                        fontSize: 11,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => updateCell(rowIdx, colIdx, null)}
                      style={{
                        background: "transparent",
                        border: 0,
                        color: "var(--danger)",
                        fontSize: 11,
                        cursor: "pointer",
                        marginTop: 2,
                      }}
                    >
                      clear
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateCell(rowIdx, colIdx, emptyCell())}
                    style={{
                      background: "transparent",
                      border: "1px dashed var(--border)",
                      color: "var(--muted)",
                      borderRadius: 4,
                      padding: "12px 6px",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    + add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <div className="row">
          <button type="button" className="btn" onClick={addRow}>
            <PlusCircle />
            Add time slot
          </button>
          <div className="gap" />
          <button type="submit" className="btn primary" disabled={saving}>
            <Save />
            {saving ? "Saving..." : "Save timetable"}
          </button>
        </div>
      </div>
    </form>
  );
}
