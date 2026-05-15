import { NextRequest, NextResponse } from "next/server";
import {
  listMedia,
  deleteUpload,
  renameUpload,
  isBlobEnabled,
} from "@/lib/storage";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const items = await listMedia();
  return NextResponse.json(items);
}

export async function DELETE(req: NextRequest) {
  const { name } = (await req.json()) as { name?: string };
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  try {
    await deleteUpload(name);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message || "Could not delete" },
      { status: 404 }
    );
  }
  await logActivity({ kind: "media", action: "delete", target: name });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { from, to } = (await req.json()) as { from?: string; to?: string };
  if (!from || !to) {
    return NextResponse.json({ error: "Missing from/to" }, { status: 400 });
  }
  try {
    const url = await renameUpload(from, to);
    await logActivity({
      kind: "media",
      action: "update",
      target: `${from} → ${to}`,
    });
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message || "Could not rename" },
      { status: 404 }
    );
  }
}
