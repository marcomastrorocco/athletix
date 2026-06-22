import type { Metadata } from "next";
import HomeV2 from "@/components/HomeV2";
import { getSite, getTeam } from "@/lib/data";
import { resolvePageMetadata } from "@/lib/seo-server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return resolvePageMetadata("/", {
    title: site.meta.title,
    description: site.meta.description,
  });
}

export default async function HomePage() {
  const [site, team] = await Promise.all([getSite(), getTeam()]);
  const heroBg = site?.hero?.bgImage;
  return (
    <>
      {heroBg ? (
        <link rel="preload" as="image" href={heroBg} fetchPriority="high" />
      ) : null}
      <HomeV2 site={site} coaches={team} />
    </>
  );
}
