import Link from "next/link";
import { getSite } from "@/lib/data";

type Props = {
  eyebrow?: string;
  heading?: React.ReactNode;
  body?: string;
  cta?: string;
};

export default async function TrialCTA({
  eyebrow = "Limited Offer",
  heading,
  body,
  cta = "Claim the Trial",
}: Props) {
  const site = await getSite();
  const renderHeading = heading ?? <>{site.trial.heading}</>;
  const renderBody = body ?? site.trial.body;

  return (
    <section className="trial-cta">
      <div className="trial-media">
        <img
          src="/image/607446330_18072010325576243_3418190524375577855_n.heiclow.webp"
          alt="Athletix session"
        />
      </div>
      <div className="container trial-inner">
        <p className="eyebrow light">{eyebrow}</p>
        <h2>{renderHeading}</h2>
        <p>{renderBody}</p>
        <Link href="/contact" className="btn btn-primary btn-lg">
          {cta}
        </Link>
      </div>
    </section>
  );
}
