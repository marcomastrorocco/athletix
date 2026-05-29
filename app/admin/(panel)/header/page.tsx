import HeaderEditor from "@/components/admin/HeaderEditor";
import { getSite } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminHeaderPage() {
  const site = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Header</h1>
          <p>Edit the navigation menu, dropdowns and the slide-out side panel.</p>
        </div>
      </div>
      <HeaderEditor initial={site.header} />
    </>
  );
}
