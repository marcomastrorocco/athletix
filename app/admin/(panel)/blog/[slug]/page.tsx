import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import { getBlogBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export default async function EditBlogPostPage({ params }: Ctx) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Edit Post</h1>
          <p>
            /{post.slug} · last touched {post.date}
          </p>
        </div>
      </div>
      <BlogEditor mode="edit" initial={post} />
    </>
  );
}
