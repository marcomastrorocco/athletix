import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBlog, setBlog, type BlogPost } from "@/lib/data";
import { logActivity } from "@/lib/activity";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const posts = await getBlog();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const updates = (await req.json()) as Partial<BlogPost>;
  const posts = await getBlog();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated: BlogPost = { ...posts[idx], ...updates, slug: posts[idx].slug };
  posts[idx] = updated;
  await setBlog(posts);
  await logActivity({ kind: "blog", action: "update", target: updated.title });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const posts = await getBlog();
  const target = posts.find((p) => p.slug === slug);
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  await setBlog(next);
  await logActivity({
    kind: "blog",
    action: "delete",
    target: target?.title ?? slug,
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ ok: true });
}
