import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getBlog } from "@/lib/data";
import BlogList from "@/components/admin/BlogList";

export const dynamic = "force-dynamic";

export default async function AdminBlogList() {
  const posts = (await getBlog())
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Blog Posts</h1>
          <p className="subtitle">
            Create, edit, publish or delete posts. Filter by status or search.
          </p>
        </div>
        <Link href="/admin/blog/new" className="btn primary">
          <PlusCircle />
          New post
        </Link>
      </div>

      <BlogList posts={posts} />
    </>
  );
}
