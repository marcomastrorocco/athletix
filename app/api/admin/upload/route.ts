import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { logActivity } from "@/lib/activity";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
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
    return NextResponse.json({ error: "File too large (>8 MB)" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const fname = safeName(file.name || "upload");
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, fname), buf);

  const url = `/uploads/${fname}`;
  await logActivity({ kind: "upload", action: "create", target: fname });
  return NextResponse.json({ url, name: fname, size: file.size });
}
