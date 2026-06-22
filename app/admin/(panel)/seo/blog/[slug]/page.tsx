import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import BlogSeoEditor from "@/components/admin/seo/BlogSeoEditor";
import { getBlogSeoContext } from "@/lib/seo-server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export default async function BlogSeoEditPage({ params }: Ctx) {
  const { slug } = await params;
  const ctx = await getBlogSeoContext(slug);
  if (!ctx) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <Link href="/admin/seo" className="btn ghost sm" style={{ marginBottom: 8 }}>
            <ChevronLeft size={14} /> SEO Manager
          </Link>
          <h1>{ctx.title}</h1>
          <p>
            Blog SEO for <code>{ctx.path}</code> ·{" "}
            <Link href={`/admin/blog/${ctx.slug}`}>edit post content</Link>
          </p>
        </div>
        <a href={ctx.path} target="_blank" rel="noopener" className="btn ghost sm">
          <ExternalLink size={14} /> View post
        </a>
      </div>

      <BlogSeoEditor
        slug={ctx.slug}
        path={ctx.path}
        siteUrl={ctx.siteUrl}
        initial={ctx.seo}
        defaults={ctx.defaults}
      />
    </>
  );
}
