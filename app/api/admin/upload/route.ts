import { NextRequest, NextResponse } from "next/server";
import { saveUpload } from "@/lib/storage";
import { logActivity } from "@/lib/activity";

const ALLOWED = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX = 8 * 1024 * 1024; // 8 MB

function safeName(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
  const ts = Date.now().toString(36);
  return `${ts}-${cleaned}`.slice(0, 80);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: `Type ${file.type || "unknown"} not allowed` },
      { status: 400 }
    );
  }
  if (file.size > MAX) {
    return NextResponse.json(
      { error: "File too large (>8 MB)" },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const fname = safeName(file.name || "upload");

  try {
    const result = await saveUpload(fname, buf, file.type);
    await logActivity({ kind: "upload", action: "create", target: fname });
    return NextResponse.json({
      url: result.url,
      name: result.name,
      size: file.size,
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message || "Upload failed" },
      { status: 500 }
    );
  }
}
