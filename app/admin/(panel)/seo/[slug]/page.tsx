import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import SeoEditor from "@/components/admin/seo/SeoEditor";
import { getSeoEditorContext } from "@/lib/seo-server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export default async function SeoEditPage({ params }: Ctx) {
  const { slug } = await params;
  const ctx = await getSeoEditorContext(slug);
  if (!ctx) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <Link href="/admin/seo" className="btn ghost sm" style={{ marginBottom: 8 }}>
            <ChevronLeft size={14} /> SEO Manager
          </Link>
          <h1>{ctx.page.label}</h1>
          <p>
            SEO for <code>{ctx.page.path}</code>
          </p>
        </div>
        <a href={ctx.page.path} target="_blank" rel="noopener" className="btn ghost sm">
          <ExternalLink size={14} /> View page
        </a>
      </div>

      <SeoEditor
        slug={ctx.page.slug}
        path={ctx.page.path}
        siteUrl={ctx.siteUrl}
        initial={ctx.override}
        defaults={ctx.defaults}
        signals={ctx.signals}
        analyzeContent={ctx.analyzeContent}
      />
    </>
  );
}
