import TeamEditor from "@/components/admin/TeamEditor";
import { getTeam } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const team = await getTeam();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Team / Coaches</h1>
          <p>Add, edit, reorder or remove coaches.</p>
        </div>
      </div>
      <TeamEditor initial={team} />
    </>
  );
}
