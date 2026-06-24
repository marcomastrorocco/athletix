import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { setAlliedHealth, type AlliedHealthContent } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function PUT(req: NextRequest) {
  try {
    const next = (await req.json()) as AlliedHealthContent;
    if (!next || !Array.isArray(next.practitioners) || !Array.isArray(next.faqs))
      return NextResponse.json(
        { error: "Expected allied-health content" },
        { status: 400 }
      );
    await setAlliedHealth(next);
    await logActivity({
      kind: "page",
      action: "update",
      target: `Allied Health (${next.practitioners.length} practitioners)`,
    });
    revalidatePath("/allied-health-staff");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/admin/allied-health PUT] error:", e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
