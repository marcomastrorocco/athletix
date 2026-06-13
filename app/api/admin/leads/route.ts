import { NextRequest, NextResponse } from "next/server";
import { getLeads, setLeads } from "@/lib/data";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export async function GET() {
  const leads = await getLeads();
  return NextResponse.json({ leads });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const all = searchParams.get("all");

  const leads = await getLeads();

  if (all === "1") {
    await setLeads([]);
    await logActivity({
      kind: "leads",
      action: "delete",
      target: `cleared ${leads.length} enquiries`,
    });
    return NextResponse.json({ ok: true });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const next = leads.filter((l) => l.id !== id);
  await setLeads(next);
  await logActivity({ kind: "leads", action: "delete", target: id });
  return NextResponse.json({ ok: true });
}
