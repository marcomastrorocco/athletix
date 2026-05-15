import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPage, setPage, type PageContent } from "@/lib/data";
import { logActivity } from "@/lib/activity";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  try {
    const page = await getPage(slug);
    if (!page) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (e) {
    return NextResponse.json(
      { error: `Read failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  try {
    const incoming = (await req.json()) as PageContent;
    if (!incoming || typeof incoming !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const next: PageContent = {
      slug,
      title: incoming.title,
      path: incoming.path,
      cssFiles: incoming.cssFiles ?? [],
      seo: incoming.seo,
      blocks: incoming.blocks ?? [],
    };
    await setPage(slug, next);
    await logActivity({ kind: "page", action: "update", target: next.title });
    revalidatePath(next.path);
    return NextResponse.json(next);
  } catch (e) {
    console.error(`[/api/admin/pages/${slug} PUT] error:`, e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
