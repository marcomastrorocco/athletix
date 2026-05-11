"use client";

export default function TrialForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thanks! A coach will be in touch shortly.");
        e.currentTarget.reset();
      }}
    >
      <h3>Book your trial</h3>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jane Athlete"
        />
      </div>
      <div className="two-col">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0400 000 000"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="interest">I&apos;m interested in</label>
        <select id="interest" name="interest" defaultValue="Adult Classes">
          <option>Adult Classes</option>
          <option>Youth Classes</option>
          <option>Family Classes</option>
          <option>Athlete Programs</option>
          <option>Allied Health</option>
          <option>NDIS Program</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="msg">Message</label>
        <textarea
          id="msg"
          name="msg"
          rows={4}
          placeholder="Tell us about your goals..."
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-lg btn-block">
        Send &amp; Book Trial
      </button>
    </form>
  );
}
