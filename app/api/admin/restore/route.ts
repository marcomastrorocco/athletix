import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  setBlog,
  setMembership,
  setSite,
  setTeam,
  setTimetable,
} from "@/lib/data";
import { logActivity } from "@/lib/activity";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });

  const ops: Promise<unknown>[] = [];
  let restored: string[] = [];
  if (body.site) {
    ops.push(setSite(body.site));
    restored.push("site");
  }
  if (Array.isArray(body.team)) {
    ops.push(setTeam(body.team));
    restored.push("team");
  }
  if (Array.isArray(body.membership)) {
    ops.push(setMembership(body.membership));
    restored.push("membership");
  }
  if (body.timetable) {
    ops.push(setTimetable(body.timetable));
    restored.push("timetable");
  }
  if (Array.isArray(body.blog)) {
    ops.push(setBlog(body.blog));
    restored.push("blog");
  }
  if (ops.length === 0)
    return NextResponse.json({ error: "Nothing to restore" }, { status: 400 });

  await Promise.all(ops);
  await logActivity({
    kind: "site",
    action: "update",
    target: `Restore (${restored.join(", ")})`,
  });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, restored });
}
