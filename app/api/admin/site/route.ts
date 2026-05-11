import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSite, setSite, type SiteContent } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const site = await getSite();
  return NextResponse.json(site);
}

export async function PUT(req: NextRequest) {
  const updates = (await req.json()) as Partial<SiteContent>;
  const current = await getSite();
  const merged: SiteContent = {
    ...current,
    ...updates,
    meta: { ...current.meta, ...(updates.meta ?? {}) },
    hero: { ...current.hero, ...(updates.hero ?? {}) },
    manifesto: { ...current.manifesto, ...(updates.manifesto ?? {}) },
    team: { ...current.team, ...(updates.team ?? {}) },
    trial: { ...current.trial, ...(updates.trial ?? {}) },
    contact: { ...current.contact, ...(updates.contact ?? {}) },
  };
  await setSite(merged);
  await logActivity({ kind: "site", action: "update", target: "Site content" });
  revalidatePath("/", "layout");
  return NextResponse.json(merged);
}
