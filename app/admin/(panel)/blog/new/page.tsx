import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>New Blog Post</h1>
          <p>Write a new article. Save as draft, publish when ready.</p>
        </div>
      </div>
      <BlogEditor mode="create" />
    </>
  );
}
