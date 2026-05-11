import MembershipEditor from "@/components/admin/MembershipEditor";
import { getMembership } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminMembershipPage() {
  const plans = await getMembership();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Membership Plans</h1>
          <p>Pricing tiers shown on the homepage and /membership.</p>
        </div>
      </div>
      <MembershipEditor initial={plans} />
    </>
  );
}
