import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { setMembership, type MembershipPlan } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function PUT(req: NextRequest) {
  try {
    const next = (await req.json()) as MembershipPlan[];
    if (!Array.isArray(next))
      return NextResponse.json({ error: "Expected array" }, { status: 400 });
    await setMembership(next);
    await logActivity({
      kind: "membership",
      action: "update",
      target: `${next.length} plans`,
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/admin/membership PUT] error:", e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
