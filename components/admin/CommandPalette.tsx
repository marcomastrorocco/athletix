"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  FileText,
  Type,
  Users,
  Tag,
  CalendarDays,
  Settings,
  PlusCircle,
  ExternalLink,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

type StaticItem = {
  id: string;
  label: string;
  hint: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
};

const STATIC: StaticItem[] = [
  { id: "dash", label: "Dashboard", hint: "Overview", href: "/admin", icon: LayoutDashboard },
  { id: "pages", label: "Pages", hint: "Edit any page", href: "/admin/pages", icon: Layers },
  { id: "blog", label: "Blog Posts", hint: "All posts", href: "/admin/blog", icon: FileText },
  { id: "blog-new", label: "New blog post", hint: "Create a new post", href: "/admin/blog/new", icon: PlusCircle },
  { id: "site", label: "Homepage & SEO", hint: "Edit homepage copy", href: "/admin/site", icon: Type },
  { id: "team", label: "Team / Coaches", hint: "Manage coach list", href: "/admin/team", icon: Users },
  { id: "membership", label: "Membership Plans", hint: "Pricing tiers", href: "/admin/membership", icon: Tag },
  { id: "timetable", label: "Timetable", hint: "Weekly schedule", href: "/admin/timetable", icon: CalendarDays },
  { id: "media", label: "Media Library", hint: "Manage uploaded images", href: "/admin/media", icon: ImageIcon },
  { id: "settings", label: "Backup & Settings", hint: "Export / import data", href: "/admin/settings", icon: Settings },
  { id: "site-view", label: "View website", hint: "Open public site in tab", href: "/", icon: ExternalLink },
];

type Post = { slug: string; title: string; category: string; published: boolean };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 30);
    fetch("/api/admin/search")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const sections: { label: string; items: StaticItem[] }[] = [];
    const matchStatic = STATIC.filter((it) =>
      !s ||
      it.label.toLowerCase().includes(s) ||
      it.hint.toLowerCase().includes(s)
    );
    if (matchStatic.length) sections.push({ label: "Navigate", items: matchStatic });

    const matchPosts = posts
      .filter(
        (p) =>
          !s ||
          p.title.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.slug.toLowerCase().includes(s)
      )
      .slice(0, 8)
      .map<StaticItem>((p) => ({
        id: `post-${p.slug}`,
        label: p.title,
        hint: `${p.published ? "Live" : "Draft"} · ${p.category}`,
        href: `/admin/blog/${p.slug}`,
        icon: FileText,
      }));
    if (matchPosts.length) sections.push({ label: "Blog posts", items: matchPosts });
    return sections;
  }, [q, posts]);

  const flat = filtered.flatMap((s) => s.items);
  const total = flat.length;

  useEffect(() => {
    if (active >= total && total) setActive(0);
  }, [total, active]);

  const select = (it: StaticItem) => {
    setOpen(false);
    if (it.href.startsWith("/admin")) router.push(it.href);
    else window.open(it.href, "_blank");
  };

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input">
          <Search />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts, jump to section..."
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => (a + 1) % Math.max(1, total));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => (a - 1 + total) % Math.max(1, total));
              } else if (e.key === "Enter" && flat[active]) {
                e.preventDefault();
                select(flat[active]);
              }
            }}
          />
        </div>
        <div className="cmd-results">
          {filtered.length === 0 && (
            <div className="cmd-empty">
              <Search style={{ width: 18, height: 18, opacity: 0.4 }} />
              <div style={{ marginTop: 6 }}>No results.</div>
            </div>
          )}
          {filtered.map((sec) => (
            <div key={sec.label}>
              <div className="cmd-section-label">{sec.label}</div>
              {sec.items.map((it) => {
                const Icon = it.icon;
                const idx = flat.indexOf(it);
                return (
                  <div
                    key={it.id}
                    className={`cmd-item${idx === active ? " active" : ""}`}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => select(it)}
                  >
                    <Icon />
                    <div>
                      <div>{it.label}</div>
                      <div style={{ color: "var(--muted)", fontSize: 12 }}>
                        {it.hint}
                      </div>
                    </div>
                    <span className="kind">↵</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
