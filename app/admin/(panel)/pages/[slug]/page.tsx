import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import PageEditor from "@/components/admin/PageEditor";
import { getPage } from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export default async function AdminPageEdit({ params }: Ctx) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <Link
            href="/admin/pages"
            className="btn ghost sm"
            style={{ marginBottom: 8 }}
          >
            <ChevronLeft size={14} /> All pages
          </Link>
          <h1>{page.title}</h1>
          <p>
            Editing <code>{page.path}</code> — {page.blocks.length} section
            {page.blocks.length === 1 ? "" : "s"}.
          </p>
        </div>
      </div>
      <PageEditor initial={page} />
    </>
  );
}
