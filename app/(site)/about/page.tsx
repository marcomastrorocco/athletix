import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import CoachesSection from "@/components/CoachesSection";
import { getPage, getTeam } from "@/lib/data";

export const dynamic = "force-dynamic";

const SLUG = "about";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page) return { title: "About Us — ATHLETIX" };
  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default async function AboutPage() {
  const [page, team] = await Promise.all([getPage(SLUG), getTeam()]);
  if (!page) notFound();

  return (
    <>
      {(page.cssFiles ?? []).map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {page.blocks.map((block) => {
        if (block.type === "coaches") {
          return (
            <CoachesSection key={block.id} block={block} coaches={team} />
          );
        }
        return <BlockRenderer key={block.id} blocks={[block]} />;
      })}
    </>
  );
}
