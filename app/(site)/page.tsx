import type { Metadata } from "next";
import HomeV2 from "@/components/HomeV2";
import { getSite, getTeam } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: site.meta.title, description: site.meta.description };
}

export default async function HomePage() {
  const [site, team] = await Promise.all([getSite(), getTeam()]);
  return <HomeV2 site={site} coaches={team} />;
}
