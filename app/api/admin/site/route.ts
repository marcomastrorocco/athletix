import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSite, setSite, type SiteContent } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const site = await getSite();
    return NextResponse.json(site);
  } catch (e) {
    return NextResponse.json(
      { error: `Read failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updates = (await req.json()) as Partial<SiteContent>;
    const current = await getSite();
    const merged: SiteContent = {
      ...current,
      ...updates,
      meta: { ...current.meta, ...(updates.meta ?? {}) },
      contact: { ...current.contact, ...(updates.contact ?? {}) },
      trial: { ...current.trial, ...(updates.trial ?? {}) },
      hero: { ...current.hero, ...(updates.hero ?? {}) },
      trust: { ...current.trust, ...(updates.trust ?? {}) },
      community: { ...current.community, ...(updates.community ?? {}) },
      vs: { ...current.vs, ...(updates.vs ?? {}) },
      classes: { ...current.classes, ...(updates.classes ?? {}) },
      disciplines: { ...current.disciplines, ...(updates.disciplines ?? {}) },
      coaches: { ...current.coaches, ...(updates.coaches ?? {}) },
      hub: { ...current.hub, ...(updates.hub ?? {}) },
      space: { ...current.space, ...(updates.space ?? {}) },
      testimonials: {
        ...current.testimonials,
        ...(updates.testimonials ?? {}),
      },
      membership: { ...current.membership, ...(updates.membership ?? {}) },
      cta: { ...current.cta, ...(updates.cta ?? {}) },
      footer: { ...current.footer, ...(updates.footer ?? {}) },
    };
    await setSite(merged);
    await logActivity({ kind: "site", action: "update", target: "Site content" });
    revalidatePath("/", "layout");
    return NextResponse.json(merged);
  } catch (e) {
    console.error("[/api/admin/site PUT] error:", e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
