"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import BookTrialModal from "@/components/BookTrialModal";
import type { TimetableData, TimetableCell } from "@/lib/data";

// Map class-title strings (as they appear in the timetable) to the
// matching detail-page route. Unknown titles fall back to /classes.
const CLASS_DETAIL_ROUTES: { match: RegExp; href: string }[] = [
  { match: /mat\s*pilates/i, href: "/mat-pilates" },
  { match: /mobility/i, href: "/mobility" },
  { match: /youth\s*agility\s*foundations|^yaf\b/i, href: "/youth-agility-foundations" },
  { match: /youth\s*agility\s*development|^yad\b/i, href: "/youth-agility-development" },
  { match: /youth\s*speed\s*development/i, href: "/youth-speed-development" },
  { match: /youth\s*speed\s*foundation/i, href: "/youth-speed-foundation" },
  { match: /youth\s*(strength|fitness)\s*development/i, href: "/youth-fitness-development" },
  { match: /youth\s*fitness\s*foundation/i, href: "/youth-fitness-foundations" },
  { match: /youth\s*open\s*workout/i, href: "/youth-open-workout" },
  { match: /^lift\b/i, href: "/lift" },
  { match: /met-?\s*con/i, href: "/met-con" },
  { match: /push\s*&?\s*drag|hi+t\s*-?\s*push/i, href: "/hiit-push-and-drag" },
  { match: /strength\s*&\s*con/i, href: "/strength-con" },
];

function routeForClass(title: string): string {
  for (const { match, href } of CLASS_DETAIL_ROUTES) {
    if (match.test(title)) return href;
  }
  return "/classes";
}

type Kind = "adult" | "youth" | "recovery" | "performance";
type KindFilter = "all" | Kind;
type DayFilter = "all" | number;

const KIND_LABEL: Record<Kind, string> = {
  adult: "Adults",
  youth: "Youth",
  recovery: "Recovery",
  performance: "Performance",
};

type Selected = {
  cell: NonNullable<TimetableCell>;
  day: string;
  time: string;
};

export default function TimetableGrid({ data }: { data: TimetableData }) {
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");
  const [selected, setSelected] = useState<Selected | null>(null);
  const [trialOpen, setTrialOpen] = useState(false);

  const matches = (cell: TimetableCell) =>
    !!cell && (kindFilter === "all" || cell.kind === kindFilter);

  const dayList = useMemo(() => {
    if (dayFilter === "all") return [];
    const idx = dayFilter;
    const out: { time: string; cell: NonNullable<TimetableCell> }[] = [];
    for (const row of data.rows) {
      const cell = row.cells[idx];
      if (cell && (kindFilter === "all" || cell.kind === kindFilter)) {
        out.push({ time: row.time, cell });
      }
    }
    return out;
  }, [data, dayFilter, kindFilter]);

  const openDetails = (cell: NonNullable<TimetableCell>, day: string, time: string) =>
    setSelected({ cell, day, time });

  return (
    <>
      <div className="tt-controls">
        <div className="tt-legend" aria-label="Filter by class type">
          <button
            type="button"
            className={`tt-pill tt-pill-btn ${kindFilter === "all" ? "is-active" : ""}`}
            onClick={() => setKindFilter("all")}
          >
            All
          </button>
          {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`tt-pill tt-pill-btn ${k} ${kindFilter === k ? "is-active" : ""}`}
              onClick={() => setKindFilter(k)}
            >
              {KIND_LABEL[k]}
            </button>
          ))}
        </div>

        <div className="tt-tabs" role="tablist" aria-label="Day">
          <button
            type="button"
            role="tab"
            aria-selected={dayFilter === "all"}
            className={`tt-tab ${dayFilter === "all" ? "is-active" : ""}`}
            onClick={() => setDayFilter("all")}
          >
            Week
          </button>
          {data.days.map((d, i) => {
            const [name, ...rest] = d.split(" ");
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={dayFilter === i}
                className={`tt-tab ${dayFilter === i ? "is-active" : ""}`}
                onClick={() => setDayFilter(i)}
              >
                <strong>{name.slice(0, 3)}</strong>
                <span>{rest.join(" ")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {dayFilter === "all" ? (
        <div className="tt-scroll">
          <div
            className="tt-grid"
            style={{
              gridTemplateColumns: `95px repeat(${data.days.length}, minmax(130px, 1fr))`,
            }}
          >
            <div className="tt-head-cell tt-corner">Time</div>
            {data.days.map((d) => {
              const [name, ...rest] = d.split(" ");
              return (
                <div key={d} className="tt-head-cell">
                  {name} <span>{rest.join(" ")}</span>
                </div>
              );
            })}

            {data.rows.map((row) => (
              <Fragment key={row.time}>
                <div className="tt-time-cell">{row.time}</div>
                {row.cells.map((cell, i) => (
                  <div key={`${row.time}-${i}`} className="tt-cell">
                    {cell && (
                      <button
                        type="button"
                        className={`tt-item ${cell.kind} ${matches(cell) ? "" : "is-faded"}`}
                        onClick={() => openDetails(cell, data.days[i], row.time)}
                        aria-label={`${cell.title} on ${data.days[i]} at ${row.time}`}
                      >
                        <h3>{cell.title}</h3>
                        <p>{cell.sub}</p>
                      </button>
                    )}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="tt-day-view">
          <h2 className="tt-day-heading">{data.days[dayFilter]}</h2>
          {dayList.length === 0 ? (
            <p className="tt-day-empty">
              No {kindFilter === "all" ? "" : KIND_LABEL[kindFilter] + " "}
              classes scheduled for this day.
            </p>
          ) : (
            <ul className="tt-day-list">
              {dayList.map(({ time, cell }) => (
                <li key={`${time}-${cell.title}`}>
                  <button
                    type="button"
                    className={`tt-day-card ${cell.kind}`}
                    onClick={() => openDetails(cell, data.days[dayFilter], time)}
                  >
                    <span className="tt-day-time">{time}</span>
                    <span className="tt-day-body">
                      <strong>{cell.title}</strong>
                      <span>{cell.sub}</span>
                    </span>
                    <span className={`tt-day-tag ${cell.kind}`}>{KIND_LABEL[cell.kind as Kind] ?? cell.kind}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selected && (
        <div
          className="tt-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tt-modal-title"
          onClick={() => setSelected(null)}
        >
          <div className="tt-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="tt-modal-close"
              aria-label="Close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <span className={`tt-modal-tag ${selected.cell.kind}`}>
              {KIND_LABEL[selected.cell.kind as Kind] ?? selected.cell.kind}
            </span>
            <h3 id="tt-modal-title">{selected.cell.title}</h3>
            <dl className="tt-modal-meta">
              <div>
                <dt>Day</dt>
                <dd>{selected.day}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{selected.time}</dd>
              </div>
              <div>
                <dt>Details</dt>
                <dd>{selected.cell.sub}</dd>
              </div>
            </dl>
            <div className="tt-modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelected(null);
                  setTrialOpen(true);
                }}
              >
                Book a Trial
              </button>
              <Link
                href={routeForClass(selected.cell.title)}
                className="btn btn-ghost"
                onClick={() => setSelected(null)}
              >
                View Class
              </Link>
            </div>
          </div>
        </div>
      )}

      <BookTrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
    </>
  );
}
