import Link from "next/link";
import {
  Users,
  Tag,
  CalendarDays,
  FileText,
  PenLine,
  Type,
  ArrowRight,
  Image as ImageIcon,
  Trash2,
  Edit3,
  PlusCircle,
} from "lucide-react";
import {
  getBlog,
  getMembership,
  getTeam,
  getTimetable,
} from "@/lib/data";
import { readActivity } from "@/lib/activity";
import Sparkline from "@/components/admin/Sparkline";
import TimeAgo from "@/components/admin/TimeAgo";

export const dynamic = "force-dynamic";

const ACT_ICON: Record<string, React.ComponentType<{ size?: number }>> = {
  blog: FileText,
  site: Type,
  team: Users,
  membership: Tag,
  timetable: CalendarDays,
  upload: ImageIcon,
};
const ACT_VERB: Record<string, string> = {
  create: "created",
  update: "updated",
  delete: "deleted",
};

function postsPerMonth(posts: { date: string }[], months = 6): number[] {
  const now = new Date();
  const buckets = Array(months).fill(0);
  posts.forEach((p) => {
    const d = new Date(p.date);
    if (Number.isNaN(d.getTime())) return;
    const diffMonths =
      (now.getFullYear() - d.getFullYear()) * 12 +
      (now.getMonth() - d.getMonth());
    if (diffMonths >= 0 && diffMonths < months) {
      buckets[months - 1 - diffMonths] += 1;
    }
  });
  return buckets;
}

export default async function AdminHome() {
  const [posts, plans, team, tt, activity] = await Promise.all([
    getBlog(),
    getMembership(),
    getTeam(),
    getTimetable(),
    readActivity(),
  ]);
  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;
  const slots = tt.rows.reduce(
    (acc, r) => acc + r.cells.filter(Boolean).length,
    0
  );
  const ppm = postsPerMonth(posts);

  return (
    <>
      <section className="greeting">
        <div className="row">
          <div>
            <h1>Welcome back 👋</h1>
            <p>
              Manage everything athletix.com.au from one place. Quick start
              below.
            </p>
            <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
              <Link href="/admin/blog/new" className="btn primary">
                <PlusCircle />
                New blog post
              </Link>
              <Link href="/admin/site" className="btn">
                <Type />
                Edit site text
              </Link>
              <Link href="/admin/timetable" className="btn">
                <CalendarDays />
                Update timetable
              </Link>
              <Link href="/admin/settings" className="btn ghost">
                Backup &amp; Settings
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="stat-grid">
        <div className="stat-card accent-1">
          <div className="head-row">
            <span className="label">Published</span>
            <span className="icon-bg">
              <FileText />
            </span>
          </div>
          <div className="value">{published}</div>
          <div className="delta">posts visible on /blog</div>
          <Sparkline values={ppm} />
        </div>
        <div className="stat-card accent-2">
          <div className="head-row">
            <span className="label">Drafts</span>
            <span className="icon-bg">
              <PenLine />
            </span>
          </div>
          <div className="value">{drafts}</div>
          <div className="delta">in progress</div>
        </div>
        <div className="stat-card accent-3">
          <div className="head-row">
            <span className="label">Coaches</span>
            <span className="icon-bg">
              <Users />
            </span>
          </div>
          <div className="value">{team.length}</div>
          <div className="delta">on the team page</div>
        </div>
        <div className="stat-card accent-4">
          <div className="head-row">
            <span className="label">Active classes</span>
            <span className="icon-bg">
              <CalendarDays />
            </span>
          </div>
          <div className="value">{slots}</div>
          <div className="delta">timetable slots filled</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            className="head"
            style={{ padding: "18px 22px", marginBottom: 0 }}
          >
            <div className="icon-bg">
              <FileText size={16} />
            </div>
            <div>
              <h2>Latest posts</h2>
              <p className="muted" style={{ margin: 0 }}>
                Most recent first.
              </p>
            </div>
            <div className="gap" />
            <Link href="/admin/blog" className="btn ghost sm">
              All posts
              <ArrowRight />
            </Link>
          </div>
          <table className="list-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .slice()
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .slice(0, 5)
                .map((p) => (
                  <tr key={p.slug}>
                    <td>
                      <Link href={`/admin/blog/${p.slug}`} className="row-title">
                        {p.title}
                      </Link>
                      <div className="row-sub">/{p.slug}</div>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.date}</td>
                    <td>
                      <span
                        className={`badge ${p.published ? "live" : "draft"}`}
                      >
                        <span className="dot" />
                        {p.published ? "Live" : "Draft"}
                      </span>
                    </td>
                  </tr>
                ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="empty">
                      <FileText />
                      No posts yet.{" "}
                      <Link
                        href="/admin/blog/new"
                        style={{ color: "var(--accent)" }}
                      >
                        Create one →
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="head">
            <div className="icon-bg">
              <Edit3 size={16} />
            </div>
            <div>
              <h2>Recent activity</h2>
              <p className="muted" style={{ margin: 0 }}>
                Last {activity.length} changes.
              </p>
            </div>
          </div>
          <div className="feed">
            {activity.length === 0 && (
              <div className="empty">
                <Edit3 />
                Make a change to see activity here.
              </div>
            )}
            {activity.slice(0, 10).map((a) => {
              const Icon = ACT_ICON[a.kind] ?? Edit3;
              const verbColor =
                a.action === "delete"
                  ? "var(--danger)"
                  : a.action === "create"
                  ? "var(--ok)"
                  : "var(--text-2)";
              return (
                <div className="feed-item" key={a.id}>
                  <div className="icon-bg">
                    {a.action === "delete" ? <Trash2 size={13} /> : <Icon size={13} />}
                  </div>
                  <div className="body">
                    <div>
                      <strong style={{ color: verbColor }}>
                        {ACT_VERB[a.action] || a.action}
                      </strong>{" "}
                      {a.kind}{" "}
                      <span style={{ color: "var(--muted)" }}>—</span>{" "}
                      <span>{a.target}</span>
                    </div>
                    <div className="when">
                      <TimeAgo at={a.at} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
