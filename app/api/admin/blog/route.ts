import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBlog, setBlog, type BlogPost } from "@/lib/data";
import { logActivity } from "@/lib/activity";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function GET() {
  const posts = await getBlog();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BlogPost>;
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const posts = await getBlog();
    let slug = body.slug?.trim() || slugify(body.title);
    if (posts.some((p) => p.slug === slug)) {
      let i = 2;
      while (posts.some((p) => p.slug === `${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }

    const today = new Date().toISOString().slice(0, 10);
    const post: BlogPost = {
      slug,
      title: body.title,
      excerpt: body.excerpt ?? "",
      image:
        body.image ??
        "/image/607718345_1795235724507459_1936522859625566512_nlow.webp",
      category: body.category ?? "General",
      readTime: body.readTime ?? "3 min read",
      date: body.date ?? today,
      published: body.published ?? false,
      body: body.body ?? "",
      author: body.author || undefined,
      tags: body.tags && body.tags.length ? body.tags : undefined,
      seo: body.seo || undefined,
    };

    await setBlog([post, ...posts]);
    await logActivity({ kind: "blog", action: "create", target: post.title });
    revalidatePath("/blog");
    revalidatePath(`/${slug}`);
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    console.error("[/api/admin/blog POST] error:", e);
    return NextResponse.json(
      { error: `Save failed: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
