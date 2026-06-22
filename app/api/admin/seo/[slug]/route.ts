import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSeoOverride, setSeoOverride, type PageSeo } from "@/lib/data";
import { seoPageBySlug } from "@/lib/seoPages";
import { logActivity } from "@/lib/activity";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const page = seoPageBySlug(slug);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json((await getSeoOverride(page.path)) ?? {});
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  try {
    const page = seoPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: "Unknown page" }, { status: 404 });
    }
    const seo = (await req.json()) as PageSeo;
    if (!seo || typeof seo !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    await setSeoOverride(page.path, seo);
    await logActivity({ kind: "page", action: "update", target: `SEO · ${page.label}` });
    revalidatePath(page.path);
    return NextResponse.json({ ok: true, seo });
  } catch (e) {
    console.error(`[/api/admin/seo/${slug} PUT] error:`, e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
