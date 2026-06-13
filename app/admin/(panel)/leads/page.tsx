import LeadsViewer from "@/components/admin/LeadsViewer";
import { getLeads } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await getLeads();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Enquiries / Leads</h1>
          <p>Trial enquiries submitted through the website forms.</p>
        </div>
      </div>
      <LeadsViewer initial={leads} />
    </>
  );
}
