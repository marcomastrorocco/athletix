"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Type,
  Users,
  Tag,
  CalendarDays,
  ExternalLink,
  Settings,
  LogOut,
  Layers,
  Image as ImageIcon,
  PanelTop,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type Item = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};
type Section = { label: string; items: Item[] };

const sections: Section[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/header", label: "Header", icon: PanelTop },
      { href: "/admin/pages", label: "Pages", icon: Layers },
      { href: "/admin/blog", label: "Blog Posts", icon: FileText },
      { href: "/admin/site", label: "Homepage & SEO", icon: Type },
      { href: "/admin/team", label: "Team / Coaches", icon: Users },
      { href: "/admin/membership", label: "Membership Plans", icon: Tag },
      { href: "/admin/timetable", label: "Timetable", icon: CalendarDays },
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Backup & Settings", icon: Settings },
      { href: "/", label: "View Website", icon: ExternalLink },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="badge-circle">A</div>
        <div className="label">
          <strong>Athletix</strong>
          <span>Admin</span>
        </div>
      </div>

      <nav className="admin-nav">
        {sections.map((s) => (
          <div key={s.label}>
            <div className="section-label">{s.label}</div>
            {s.items.map((it) => {
              const Icon = it.icon;
              const active =
                it.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === it.href ||
                    pathname.startsWith(it.href + "/");
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={active ? "active" : undefined}
                >
                  <Icon size={16} />
                  {it.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <ThemeToggle />
        <button
          className="theme-toggle"
          type="button"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
        >
          <LogOut />
          Sign out
        </button>
      </div>
    </aside>
  );
}
