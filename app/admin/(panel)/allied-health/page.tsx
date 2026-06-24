import AlliedHealthEditor from "@/components/admin/AlliedHealthEditor";
import { getAlliedHealth } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminAlliedHealthPage() {
  const data = await getAlliedHealth();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Allied Health</h1>
          <p>
            Edit the intro, practitioners (bios, qualifications, links) and FAQs
            on the Allied Health page.
          </p>
        </div>
      </div>
      <AlliedHealthEditor initial={data} />
    </>
  );
}
