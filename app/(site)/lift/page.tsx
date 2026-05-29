import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { getPage } from "@/lib/data";

export const dynamic = "force-dynamic";

const SLUG = "lift";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page)
    return {
      title: "Weight Lifting Gym Brisbane — LIFT Strength Class | ATHLETIX",
    };
  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default async function LiftPage() {
  const page = await getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      {(page.cssFiles ?? []).map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}
