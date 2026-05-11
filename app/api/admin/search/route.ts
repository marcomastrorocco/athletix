import { NextResponse } from "next/server";
import { getBlog } from "@/lib/data";

export async function GET() {
  const posts = await getBlog();
  return NextResponse.json(
    posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      published: p.published,
    }))
  );
}
