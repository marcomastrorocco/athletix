import SiteEditor from "@/components/admin/SiteEditor";
import { getSite } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSitePage() {
  const site = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Site Text &amp; SEO</h1>
          <p>Edit homepage copy, SEO metadata and contact info.</p>
        </div>
      </div>
      <SiteEditor initial={site} />
    </>
  );
}
