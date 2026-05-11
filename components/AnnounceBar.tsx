import { getSite } from "@/lib/data";

export default async function AnnounceBar() {
  const site = await getSite();
  return (
    <div className="announce" id="announceBar">
      <span>{site.announce}</span>
    </div>
  );
}
