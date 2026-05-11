import { Fragment } from "react";
import type { TimetableData } from "@/lib/data";

export default function TimetableGrid({ data }: { data: TimetableData }) {
  return (
    <>
      <div className="tt-legend" aria-label="Class type legend">
        <span className="tt-pill adult">Adults</span>
        <span className="tt-pill youth">Youth</span>
        <span className="tt-pill recovery">Recovery</span>
        <span className="tt-pill performance">Performance</span>
      </div>

      <div className="tt-scroll">
        <div className="tt-grid">
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
                    <article className={`tt-item ${cell.kind}`}>
                      <h3>{cell.title}</h3>
                      <p>{cell.sub}</p>
                    </article>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
