import TimetableEditor from "@/components/admin/TimetableEditor";
import { getTimetable } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminTimetablePage() {
  const tt = await getTimetable();
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Timetable</h1>
          <p>Edit weekly class schedule. Reflects on homepage and /timetable.</p>
        </div>
      </div>
      <TimetableEditor initial={tt} />
    </>
  );
}
