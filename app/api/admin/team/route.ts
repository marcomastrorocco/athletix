import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { setTeam, type Coach } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function PUT(req: NextRequest) {
  const next = (await req.json()) as Coach[];
  if (!Array.isArray(next))
    return NextResponse.json({ error: "Expected array" }, { status: 400 });
  await setTeam(next);
  await logActivity({
    kind: "team",
    action: "update",
    target: `${next.length} coaches`,
  });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
