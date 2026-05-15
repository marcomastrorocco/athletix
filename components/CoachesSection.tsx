import type { Coach, CoachesBlock } from "@/lib/data";

export default function CoachesSection({
  block,
  coaches,
}: {
  block: CoachesBlock;
  coaches: Coach[];
}) {
  return (
    <div className="home-v2">
      <section className="coaches-section" id="team">
        <div className="coaches-inner">
          <div className="coaches-top">
            <div>
              {block.eyebrow && <div className="kicker">{block.eyebrow}</div>}
              <h2 className="sec-title">
                {block.headingTop}
                <br />
                {block.headingBottom}
              </h2>
              <p className="sec-body">{block.body}</p>
            </div>
            <div className="cred-bar">
              <div className="cred-item">
                <span className="cred-val">ASCA</span>
                <span className="cred-lbl">Accredited</span>
              </div>
              <div className="cred-sep" />
              <div className="cred-item">
                <span className="cred-val">ESSA</span>
                <span className="cred-lbl">Certified</span>
              </div>
              <div className="cred-sep" />
              <div className="cred-item">
                <span className="cred-val">{coaches.length}</span>
                <span className="cred-lbl">Elite Coaches</span>
              </div>
              <div className="cred-sep" />
              <div className="cred-item">
                <span className="cred-val">Uni</span>
                <span className="cred-lbl">All Qualified</span>
              </div>
            </div>
          </div>
          <div className="coaches-grid">
            {coaches.map((c) => (
              <div key={c.id} className="coach-card">
                <div className="coach-photo">
                  <img src={c.image} alt={c.name} />
                  <div className="coach-grad" />
                </div>
                <div className="coach-info">
                  <div className="coach-name">{c.name}</div>
                  <span className="coach-role">{c.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
