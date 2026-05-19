import Link from "next/link";

type Props = {
  sourceLabel: string;
  defaultClass: string;
};

const CLASS_OPTIONS = [
  "Family Fitness",
  "HIIT-Push and Drag",
  "Kettlebell",
  "Mat Pilates",
  "Met-Con",
  "Mobility",
  "Sprint",
  "Lift",
  "Youth Agility Development (12-16 yr)",
  "Youth Agility Foundations (7-11 yr)",
  "Youth Fitness Foundations (7-11 yr)",
  "Youth Strength Development (12-16 yr)",
  "Youth Speed Development (12-16 yr)",
  "Youth Speed Foundation (7-11 yr)",
];

const PERKS = [
  { icon: "⚡", text: "Real S&C coaches, not personal trainers" },
  { icon: "🎫", text: "$7 for 7 days — fully refundable on signup" },
  { icon: "📍", text: "Fortitude Valley, Brisbane CBD" },
  { icon: "👥", text: "Small group sizes, individual attention" },
];

export default function ClassBookSection({ sourceLabel, defaultClass }: Props) {
  return (
    <section className="yaf-book" id="book-form">
      <div className="yaf-book-bg" aria-hidden="true" />
      <div className="container yaf-book-shell">
        <header className="yaf-book-head">
          <span className="yaf-book-chip">
            <span className="yaf-book-chip-dot" />
            Free 7-day trial · $7 refundable
          </span>
          <h2 className="yaf-book-title">Book your class</h2>
          <p className="yaf-book-sub">
            Fill in your details and our coaching team will get back to you
            within 24 hours to set up your trial.
          </p>
        </header>

        <div className="yaf-book-grid">
          <aside className="yaf-book-perks">
            <h3 className="yaf-book-perks-title">Why athletes choose us</h3>
            <ul className="yaf-book-perks-list">
              {PERKS.map((p) => (
                <li key={p.text}>
                  <span className="yaf-perk-ico" aria-hidden="true">
                    {p.icon}
                  </span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <div className="yaf-book-contact">
              <p className="yaf-book-contact-lead">Prefer to talk?</p>
              <a href="tel:0499981286" className="yaf-book-phone">
                <span aria-hidden="true">☎</span>
                <span>0499 981 286</span>
              </a>
              <Link href="/contact-us" className="yaf-book-contact-link">
                Or visit the contact page →
              </Link>
            </div>
          </aside>

          <form className="yaf-book-form" method="post" action="/api/lead">
            <input type="hidden" name="source" value={sourceLabel} />

            <div className="yaf-book-row yaf-book-row--full">
              <div className="yaf-book-field">
                <input
                  type="text"
                  name="full_name"
                  id="yf-name"
                  placeholder=" "
                  required
                />
                <label htmlFor="yf-name">Full name</label>
              </div>
            </div>

            <div className="yaf-book-row">
              <div className="yaf-book-field">
                <input
                  type="tel"
                  name="phone"
                  id="yf-phone"
                  placeholder=" "
                  required
                />
                <label htmlFor="yf-phone">Phone</label>
              </div>
              <div className="yaf-book-field">
                <input
                  type="email"
                  name="email"
                  id="yf-email"
                  placeholder=" "
                  required
                />
                <label htmlFor="yf-email">Email</label>
              </div>
            </div>

            <div className="yaf-book-row yaf-book-row--full">
              <div className="yaf-book-field yaf-book-field--select">
                <select
                  name="class_name"
                  id="yf-class"
                  required
                  defaultValue={defaultClass}
                >
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <label htmlFor="yf-class">Class to book</label>
                <span className="yaf-book-select-arrow" aria-hidden="true">
                  ▾
                </span>
              </div>
            </div>

            <div className="yaf-book-actions">
              <div
                className="yaf-book-captcha"
                aria-label="reCAPTCHA placeholder"
              >
                <span className="yaf-book-captcha-tick" aria-hidden="true">
                  ✓
                </span>
                <span className="yaf-book-captcha-label">
                  I&rsquo;m not a robot
                </span>
                <span className="yaf-book-captcha-brand">reCAPTCHA</span>
              </div>
              <button type="submit" className="yaf-book-submit">
                Book now <span aria-hidden="true">→</span>
              </button>
            </div>

            <p className="yaf-book-disclaimer">
              By submitting, you agree to be contacted by ATHLETIX about your
              trial. We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
