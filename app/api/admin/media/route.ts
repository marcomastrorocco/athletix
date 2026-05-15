import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { logActivity } from "@/lib/activity";

const ALLOWED_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);

type MediaItem = {
  name: string;
  url: string;
  size: number;
  mtime: string;
};

async function listDir(dir: string, urlPrefix: string): Promise<MediaItem[]> {
  try {
    const names = await fs.readdir(dir);
    const out: MediaItem[] = [];
    for (const n of names) {
      const ext = path.extname(n).toLowerCase();
      if (!ALLOWED_EXT.has(ext)) continue;
      const full = path.join(dir, n);
      const stat = await fs.stat(full);
      if (!stat.isFile()) continue;
      out.push({
        name: n,
        url: `${urlPrefix}/${n}`,
        size: stat.size,
        mtime: stat.mtime.toISOString(),
      });
    }
    return out;
  } catch {
    return [];
  }
}

export async function GET() {
  const root = path.join(process.cwd(), "public");
  const [uploads, images] = await Promise.all([
    listDir(path.join(root, "uploads"), "/uploads"),
    listDir(path.join(root, "image"), "/image"),
  ]);
  const all = [...uploads, ...images].sort(
    (a, b) => (a.mtime < b.mtime ? 1 : -1)
  );
  return NextResponse.json(all);
}

function safeUploadPath(filename: string): string | null {
  if (!filename) return null;
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return path.join(process.cwd(), "public", "uploads", filename);
}

export async function DELETE(req: NextRequest) {
  const { name } = (await req.json()) as { name?: string };
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  const target = safeUploadPath(name);
  if (!target) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  try {
    await fs.unlink(target);
  } catch (e) {
    return NextResponse.json(
      { error: `Could not delete: ${(e as Error).message}` },
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
  const src = safeUploadPath(from);
  const dst = safeUploadPath(to);
  if (!src || !dst) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  try {
    await fs.rename(src, dst);
  } catch (e) {
    return NextResponse.json(
      { error: `Could not rename: ${(e as Error).message}` },
      { status: 404 }
    );
  }
  await logActivity({ kind: "media", action: "update", target: `${from} → ${to}` });
  return NextResponse.json({ ok: true, url: `/uploads/${to}` });
}
