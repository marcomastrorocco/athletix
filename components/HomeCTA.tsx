import { getSite } from "@/lib/data";

// The "$7 for 7 Days" call-to-action lifted from the home page so it can be
// reused on other pages (e.g. the timetable). The home styles live in
// home-v3.css scoped to `.ax-home`, so we re-create that wrapper + stylesheet
// link here. Bare in-page anchors (#form, #membership) are rewritten to point
// back at the home page where those sections actually exist.
export default async function HomeCTA() {
  const { cta } = await getSite();
  const fixHref = (href: string) =>
    href.startsWith("#") ? `/${href}` : href;

  return (
    <div className="ax-home">
      <link rel="stylesheet" href="/css/home-v3.css" />
      <div className="cta-section visible">
        <div className="cta-grid-bg"></div>
        <div className="cta-inner">
          <div className="cta-tag">{cta.tag}</div>
          <h2 className="cta-h">
            {cta.hTop}
            <br />
            <em>{cta.hEm}</em>
          </h2>
          <p className="cta-sub">{cta.sub}</p>
          <p className="cta-detail">{cta.detail}</p>
          <div className="cta-btns">
            <a href={fixHref(cta.primaryBtn.href)} className="btn-primary">
              {cta.primaryBtn.label}
            </a>
            <a href={fixHref(cta.secondaryBtn.href)} className="btn-ghost">
              {cta.secondaryBtn.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
