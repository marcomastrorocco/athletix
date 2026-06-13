import type { HomeTrust } from "@/lib/data";

/**
 * The "Trusted By" logo strip used on the home page. Styles come from the
 * scoped `home-v3.css` (`@scope (.ax-home)`), so the block is wrapped in
 * `.ax-home` and loads that stylesheet, making it reusable on any page.
 */
export default function TrustSection({ data }: { data: HomeTrust }) {
  return (
    <>
      <link rel="stylesheet" href="/css/home-v3.css" />

      <div className="ax-home">
        <div className="trust-wrap">
          <div className="trust-inner">
            <h2 className="trust-h">
              {data.headingTop} <em>{data.headingEm}</em>
            </h2>
            <span className="trust-label">{data.label}</span>
            <div className="logo-row">
              {data.logos.map((l, i) => (
                <div key={i} className="logo-pill">
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
