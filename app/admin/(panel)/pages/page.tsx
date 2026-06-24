import Link from "next/link";
import {
  FileEdit,
  ExternalLink,
  FileText,
  Home,
  Stethoscope,
} from "lucide-react";
import { listPages, getSite, getAlliedHealth } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPagesIndex() {
  const [pages, site, allied] = await Promise.all([
    listPages(),
    getSite(),
    getAlliedHealth(),
  ]);

  // homepage = 13 dynamic sections + announce/meta/contact/trial settings
  const homeSections = 13;
  const homeMembers = site.membership.plans.length;

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Pages</h1>
          <p>Edit any page's sections, text, images and SEO metadata.</p>
        </div>
      </div>

      <div className="pages-grid">
        {/* Home page — uses the bespoke SiteEditor at /admin/site */}
        <div key="home" className="card page-card">
          <div className="head" style={{ marginBottom: 8 }}>
            <div className="icon-bg">
              <Home size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>
                Home{" "}
                <span
                  className="badge featured"
                  style={{ marginLeft: 6, verticalAlign: "middle" }}
                >
                  <span className="dot" /> Bespoke
                </span>
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: 12 }}>
                <code>/</code> · {homeSections} sections ·{" "}
                {homeMembers} membership plans
              </p>
            </div>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 12 }}>
            <Link href="/admin/site" className="btn primary sm">
              <FileEdit size={14} /> Edit
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="btn ghost sm"
            >
              <ExternalLink size={14} /> View
            </a>
          </div>
        </div>

        {/* Allied Health — bespoke editor at /admin/allied-health */}
        <div key="allied-health" className="card page-card">
          <div className="head" style={{ marginBottom: 8 }}>
            <div className="icon-bg">
              <Stethoscope size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>
                Allied Health{" "}
                <span
                  className="badge featured"
                  style={{ marginLeft: 6, verticalAlign: "middle" }}
                >
                  <span className="dot" /> Bespoke
                </span>
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: 12 }}>
                <code>/allied-health-staff</code> ·{" "}
                {allied.practitioners.length} practitioners ·{" "}
                {allied.faqs.length} FAQs
              </p>
            </div>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 12 }}>
            <Link href="/admin/allied-health" className="btn primary sm">
              <FileEdit size={14} /> Edit
            </Link>
            <a
              href="/allied-health-staff"
              target="_blank"
              rel="noopener"
              className="btn ghost sm"
            >
              <ExternalLink size={14} /> View
            </a>
          </div>
        </div>

        {pages.map((p) => (
          <div key={p.slug} className="card page-card">
            <div className="head" style={{ marginBottom: 8 }}>
              <div className="icon-bg">
                <FileText size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0 }}>{p.title}</h2>
                <p className="muted" style={{ margin: 0, fontSize: 12 }}>
                  <code>{p.path}</code> · {p.blockCount} section
                  {p.blockCount === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div className="row" style={{ gap: 8, marginTop: 12 }}>
              <Link
                href={`/admin/pages/${p.slug}`}
                className="btn primary sm"
              >
                <FileEdit size={14} /> Edit
              </Link>
              <a
                href={p.path}
                target="_blank"
                rel="noopener"
                className="btn ghost sm"
              >
                <ExternalLink size={14} /> View
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
