import Link from "next/link";
import type { Metadata } from "next";
import { resolvePageMetadata } from "@/lib/seo-server";
import HomeCTA from "@/components/HomeCTA";
import TimetableGrid from "@/components/TimetableGrid";
import { getTimetable } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/class-timetable");
}

export const dynamic = "force-dynamic";

export default async function TimetablePage() {
  const tt = await getTimetable();

  return (
    <>
      <section className="page-banner page-banner--compact">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Timetable
          </p>
          <h1>
            WEEKLY <span className="accent">TIMETABLE</span>
          </h1>
          <p className="lede">
            Plan your week with Athletix. Adult, youth, recovery and
            performance sessions seven days a week. Sunday is reserved for
            recovery.
          </p>
        </div>
      </section>

      <section
        className="timetable"
        id="timetable"
        style={{ paddingTop: "60px" }}
      >
        <div className="container">
          <TimetableGrid data={tt} />
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
