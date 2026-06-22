import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSeoSettings, setSeoSettings, type SeoSettings } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function GET() {
  return NextResponse.json(await getSeoSettings());
}

export async function PUT(req: NextRequest) {
  try {
    const incoming = (await req.json()) as SeoSettings;
    if (!incoming || typeof incoming !== "object" || !incoming.siteUrl) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    await setSeoSettings(incoming);
    await logActivity({ kind: "site", action: "update", target: "Global SEO settings" });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
