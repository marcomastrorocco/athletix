import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBlog } from "@/lib/data";
import { BlogListing, POSTS_PER_PAGE } from "../../page";

type Ctx = { params: Promise<{ n: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { n } = await params;
  return {
    title: `Blog — Page ${n} — ATHLETIX`,
    description:
      "Training tips, science-backed insights, athlete stories and behind-the-scenes from the Athletix Brisbane floor.",
  };
}

export default async function BlogPaginatedPage({ params }: Ctx) {
  const { n } = await params;
  const page = parseInt(n, 10);
  if (!Number.isFinite(page) || page < 1) notFound();

  const all = await getPublishedBlog();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  if (page > totalPages) notFound();

  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = all.slice(start, start + POSTS_PER_PAGE);

  return <BlogListing posts={posts} page={page} totalPages={totalPages} />;
}
