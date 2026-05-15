import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { setTimetable, type TimetableData } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function PUT(req: NextRequest) {
  try {
    const next = (await req.json()) as TimetableData;
    if (!next || !Array.isArray(next.days) || !Array.isArray(next.rows))
      return NextResponse.json({ error: "Bad shape" }, { status: 400 });
    await setTimetable(next);
    await logActivity({
      kind: "timetable",
      action: "update",
      target: `${next.rows.length} time slots`,
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/admin/timetable PUT] error:", e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
