import { NextResponse } from "next/server";
import {
  getBlog,
  getMembership,
  getSite,
  getTeam,
  getTimetable,
} from "@/lib/data";

export async function GET() {
  const [site, team, membership, timetable, blog] = await Promise.all([
    getSite(),
    getTeam(),
    getMembership(),
    getTimetable(),
    getBlog(),
  ]);
  const dump = {
    version: 1,
    exportedAt: new Date().toISOString(),
    site,
    team,
    membership,
    timetable,
    blog,
  };
  const filename = `athletix-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;
  return new NextResponse(JSON.stringify(dump, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
