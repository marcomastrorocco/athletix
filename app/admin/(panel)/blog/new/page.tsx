import BlogEditor from "@/components/admin/BlogEditor";
import { getSeoSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const settings = await getSeoSettings();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>New Blog Post</h1>
          <p>Write a new article. Save as draft, publish when ready.</p>
        </div>
      </div>
      <BlogEditor mode="create" siteUrl={settings.siteUrl} />
    </>
  );
}
