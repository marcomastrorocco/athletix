import type { Metadata } from "next";
import HomeV2 from "@/components/HomeV2";
import { getSite } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: site.meta.title, description: site.meta.description };
}

export default function HomePage() {
  return <HomeV2 />;
}
