import Link from "next/link";
import { Search, FileText, ChevronRight, ChevronDown } from "lucide-react";
import {
  getSeoOverview,
  getBlogSeoOverview,
  type SeoOverviewRow,
  type SeoBlogRow,
} from "@/lib/seo-server";
import { SEO_GROUPS } from "@/lib/seoPages";

export const dynamic = "force-dynamic";

function scoreColor(score: number) {
  if (score >= 80) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

function avgScore(scores: number[]) {
  return scores.length
    ? Math.round(scores.reduce((s, n) => s + n, 0) / scores.length)
    : 0;
}

export default async function SeoManagerIndex() {
  const [rows, blogRows] = await Promise.all([
    getSeoOverview(),
    getBlogSeoOverview(),
  ]);
  const customized =
    rows.filter((r) => r.hasOverride).length +
    blogRows.filter((r) => r.hasOverride).length;
  const totalPages = rows.length + blogRows.length;

  // Bucket the fixed routes by their registry group, preserving SEO_GROUPS order.
  const groups = SEO_GROUPS.map((name) => ({
    name,
    rows: rows.filter((r) => r.group === name),
  })).filter((g) => g.rows.length > 0);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>SEO Manager</h1>
          <p>
            {totalPages} pages · {customized} customised. Control titles, meta
            descriptions, social cards, schema and indexing. Edits go live on
            save.
          </p>
        </div>
        <Link href="/admin/seo/settings" className="btn ghost sm">
          Global settings
        </Link>
      </div>

      <div className="seo-groups">
        {groups.map((group) => {
          const avg = avgScore(group.rows.map((r) => r.score));
          const customisedCount = group.rows.filter((r) => r.hasOverride).length;
          return (
            <details key={group.name} className="seo-group card" open>
              <summary className="seo-group-head">
                <ChevronDown size={16} className="seo-group-caret" />
                <span className="seo-group-title">{group.name}</span>
                <span className="seo-group-count">
                  {group.rows.length} page{group.rows.length === 1 ? "" : "s"}
                  {customisedCount > 0 ? ` · ${customisedCount} customised` : ""}
                </span>
                <span
                  className="seo-group-score"
                  style={{ color: scoreColor(avg), borderColor: scoreColor(avg) }}
                  title="Average score"
                >
                  {avg}
                </span>
              </summary>
              <div className="seo-list">
                {group.rows.map((r) => (
                  <SeoRow key={r.slug} row={r} />
                ))}
              </div>
            </details>
          );
        })}

        {/* Blog posts — every post, newest first. */}
        {blogRows.length > 0 && (
          <details className="seo-group card">
            <summary className="seo-group-head">
              <ChevronDown size={16} className="seo-group-caret" />
              <span className="seo-group-title">Blog</span>
              <span className="seo-group-count">
                {blogRows.length} posts
                {blogRows.filter((r) => r.hasOverride).length > 0
                  ? ` · ${blogRows.filter((r) => r.hasOverride).length} customised`
                  : ""}
              </span>
              <span
                className="seo-group-score"
                style={{
                  color: scoreColor(avgScore(blogRows.map((r) => r.score))),
                  borderColor: scoreColor(avgScore(blogRows.map((r) => r.score))),
                }}
                title="Average score"
              >
                {avgScore(blogRows.map((r) => r.score))}
              </span>
            </summary>
            <div className="seo-list">
              {blogRows.map((r) => (
                <BlogSeoRow key={r.slug} row={r} />
              ))}
            </div>
          </details>
        )}
      </div>
    </>
  );
}

function SeoRow({ row: r }: { row: SeoOverviewRow }) {
  return (
    <Link href={`/admin/seo/${r.slug}`} className="card seo-list-row">
      <span className="seo-list-icon">
        <Search size={16} />
      </span>
      <span className="seo-list-meta">
        <strong>
          {r.label}
          {r.hasOverride && <span className="seo-pill">customised</span>}
        </strong>
        <span className="muted">
          <code>{r.path}</code>
          {r.focusKeyword ? ` · ${r.focusKeyword}` : ""}
        </span>
      </span>
      <span
        className="seo-list-score"
        style={{ color: scoreColor(r.score), borderColor: scoreColor(r.score) }}
      >
        {r.score}
      </span>
      <ChevronRight size={16} className="muted" />
    </Link>
  );
}

function BlogSeoRow({ row: r }: { row: SeoBlogRow }) {
  return (
    <Link href={`/admin/seo/blog/${r.slug}`} className="card seo-list-row">
      <span className="seo-list-icon">
        <FileText size={16} />
      </span>
      <span className="seo-list-meta">
        <strong>
          {r.title}
          {r.hasOverride && <span className="seo-pill">customised</span>}
          {!r.published && <span className="seo-pill draft">draft</span>}
        </strong>
        <span className="muted">
          <code>{r.path}</code> · {r.date}
        </span>
      </span>
      <span
        className="seo-list-score"
        style={{ color: scoreColor(r.score), borderColor: scoreColor(r.score) }}
      >
        {r.score}
      </span>
      <ChevronRight size={16} className="muted" />
    </Link>
  );
}
