"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Edit3, Search, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/data";

type Filter = "all" | "live" | "draft";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (filter === "live" && !p.published) return false;
      if (filter === "draft" && p.published) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(s) &&
          !p.category.toLowerCase().includes(s) &&
          !p.slug.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [posts, filter, q]);

  const counts = {
    all: posts.length,
    live: posts.filter((p) => p.published).length,
    draft: posts.filter((p) => !p.published).length,
  };

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {(["all", "live", "draft"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`btn sm${filter === f ? " primary" : " ghost"}`}
              style={{ textTransform: "capitalize" }}
            >
              {f} <span style={{ opacity: 0.6, marginLeft: 4 }}>{counts[f]}</span>
            </button>
          ))}
        </div>
        <div className="gap" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "6px 12px",
            color: "var(--muted)",
            fontSize: 13,
            minWidth: 220,
          }}
        >
          <Search size={14} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter posts..."
            style={{
              border: 0,
              background: "transparent",
              color: "var(--text)",
              outline: "none",
              flex: 1,
              fontSize: 13,
            }}
          />
        </div>
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <th style={{ paddingLeft: 22 }}>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.slug}>
              <td style={{ paddingLeft: 22 }}>
                <Link href={`/admin/blog/${p.slug}`} className="row-title">
                  {p.title}
                </Link>
                <div className="row-sub">/{p.slug}</div>
              </td>
              <td>{p.category}</td>
              <td>{p.date}</td>
              <td>
                <span className={`badge ${p.published ? "live" : "draft"}`}>
                  <span className="dot" />
                  {p.published ? "Live" : "Draft"}
                </span>
              </td>
              <td className="actions" style={{ paddingRight: 22 }}>
                <Link href={`/admin/blog/${p.slug}`} className="btn sm">
                  <Edit3 />
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5}>
                <div className="empty">
                  <FileText />
                  {posts.length === 0
                    ? "No posts yet."
                    : "No posts match your filter."}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
