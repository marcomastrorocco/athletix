import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Athletix SEO Control Center",
};

export default function SeoDashboardPage() {
  return (
    <>
      <main className="dashboard-shell">
        <header className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">Athletix SEO Control Center</p>
            <h1>Beautiful + Detailed SEO Dashboard</h1>
            <p>
              This workspace is made for non-coders. Fill each section like a
              form and your website SEO updates automatically.
            </p>
          </div>
          <div className="hero-actions">
            <a className="ghost-btn" href="/" target="_blank" rel="noopener">
              Open Website
            </a>
            <button id="saveBtn" className="primary-btn" type="button">
              Save All SEO Changes
            </button>
          </div>
        </header>

        <section className="metrics-grid">
          <article className="metric">
            <span>SEO Score</span>
            <strong id="seoScore">0/100</strong>
            <small id="seoScoreNote">
              Complete all key fields for best SEO.
            </small>
          </article>
          <article className="metric">
            <span>Title Length</span>
            <strong id="titleLength">0 chars</strong>
            <small>Recommended: 50-60</small>
          </article>
          <article className="metric">
            <span>Description Length</span>
            <strong id="descriptionLength">0 chars</strong>
            <small>Recommended: 140-160</small>
          </article>
          <article className="metric">
            <span>Checklist Passed</span>
            <strong id="checklistRatio">0/0</strong>
            <small>Track detailed technical coverage.</small>
          </article>
        </section>

        <section className="workspace">
          <div className="main-column">
            <nav className="tab-bar" aria-label="SEO sections">
              <button className="tab-btn active" data-tab="onpage" type="button">
                On-Page SEO
              </button>
              <button className="tab-btn" data-tab="social" type="button">
                Social SEO
              </button>
              <button className="tab-btn" data-tab="technical" type="button">
                Technical SEO
              </button>
              <button className="tab-btn" data-tab="local" type="button">
                Local SEO &amp; Schema
              </button>
              <button className="tab-btn" data-tab="indexing" type="button">
                Indexing &amp; Verification
              </button>
              <button className="tab-btn" data-tab="content" type="button">
                Content Blocks
              </button>
              <button className="tab-btn" data-tab="images" type="button">
                Image ALT
              </button>
            </nav>

            <section className="panel tab-panel active" data-panel="onpage">
              <div className="panel-head">
                <h2>Google Search Appearance</h2>
                <p>Control how your page appears in Google results.</p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Page Title</span>
                  <input id="seoTitle" type="text" />
                </label>
                <label className="field field-wide">
                  <span>Meta Description</span>
                  <textarea id="seoDescription" rows={3}></textarea>
                </label>
                <label className="field">
                  <span>Primary Keyword</span>
                  <input
                    id="seoPrimaryKeyword"
                    type="text"
                    placeholder="brisbane strength and conditioning"
                  />
                </label>
                <label className="field">
                  <span>SEO Keywords (comma separated)</span>
                  <input
                    id="seoKeywords"
                    type="text"
                    placeholder="fortitude valley gym, youth athlete training"
                  />
                </label>
                <label className="field field-wide">
                  <span>Main H1 Text</span>
                  <input
                    id="seoH1"
                    type="text"
                    placeholder="Train Like an Athlete."
                  />
                </label>
              </div>

              <article className="preview-card">
                <p className="preview-label">Google Search Preview</p>
                <strong id="snippetTitle" className="preview-title"></strong>
                <span id="snippetUrl" className="preview-url"></span>
                <p
                  id="snippetDescription"
                  className="preview-description"
                ></p>
              </article>
            </section>

            <section className="panel tab-panel" data-panel="social">
              <div className="panel-head">
                <h2>Open Graph + Twitter Cards</h2>
                <p>
                  Control link previews for Facebook, WhatsApp, X and other
                  social platforms.
                </p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Social Title (og:title)</span>
                  <input id="ogTitle" type="text" />
                </label>
                <label className="field field-wide">
                  <span>Social Description (og:description)</span>
                  <textarea id="ogDescription" rows={3}></textarea>
                </label>
                <label className="field field-wide">
                  <span>Social Image URL (og:image)</span>
                  <input
                    id="ogImage"
                    type="url"
                    placeholder="https://athletix.com.au/image/social-cover.jpg"
                  />
                </label>
                <label className="field">
                  <span>Open Graph URL (og:url)</span>
                  <input
                    id="ogUrl"
                    type="url"
                    placeholder="https://athletix.com.au/"
                  />
                </label>
                <label className="field">
                  <span>Open Graph Type (og:type)</span>
                  <input id="ogType" type="text" placeholder="website" />
                </label>
                <label className="field">
                  <span>Twitter Card Type</span>
                  <input
                    id="twitterCard"
                    type="text"
                    placeholder="summary_large_image"
                  />
                </label>
                <label className="field">
                  <span>Twitter Username (twitter:site)</span>
                  <input
                    id="twitterSite"
                    type="text"
                    placeholder="@athletix"
                  />
                </label>
              </div>

              <article className="preview-card social-preview">
                <p className="preview-label">Social Preview</p>
                <img
                  id="socialPreviewImage"
                  src=""
                  alt="Social preview image"
                />
                <strong
                  id="socialPreviewTitle"
                  className="preview-title"
                ></strong>
                <p
                  id="socialPreviewDescription"
                  className="preview-description"
                ></p>
              </article>
            </section>

            <section className="panel tab-panel" data-panel="technical">
              <div className="panel-head">
                <h2>Technical SEO</h2>
                <p>Critical technical tags that search engines use.</p>
              </div>
              <div className="form-grid">
                <label className="field field-wide">
                  <span>Canonical URL</span>
                  <input
                    id="seoCanonical"
                    type="url"
                    placeholder="https://athletix.com.au/"
                  />
                </label>
                <label className="field">
                  <span>Robots Meta</span>
                  <input
                    id="seoRobots"
                    type="text"
                    placeholder="index,follow"
                  />
                </label>
                <label className="field">
                  <span>Locale (og:locale)</span>
                  <input id="seoLocale" type="text" placeholder="en_AU" />
                </label>
                <label className="field">
                  <span>Schema Business Name</span>
                  <input
                    id="seoSchemaOrg"
                    type="text"
                    placeholder="Athletix Brisbane"
                  />
                </label>
                <label className="field">
                  <span>Author Meta</span>
                  <input
                    id="seoAuthor"
                    type="text"
                    placeholder="Athletix Team"
                  />
                </label>
                <label className="field">
                  <span>Theme Color</span>
                  <input
                    id="seoThemeColor"
                    type="text"
                    placeholder="#111827"
                  />
                </label>
              </div>
            </section>

            <section className="panel tab-panel" data-panel="local">
              <div className="panel-head">
                <h2>Local SEO + Structured Data</h2>
                <p>
                  Fill business profile for LocalBusiness and FAQ schema
                  generation.
                </p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Business Name</span>
                  <input
                    id="businessName"
                    type="text"
                    placeholder="Athletix Brisbane"
                  />
                </label>
                <label className="field">
                  <span>Business Type (Schema)</span>
                  <input
                    id="businessType"
                    type="text"
                    placeholder="SportsActivityLocation"
                  />
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input
                    id="businessPhone"
                    type="text"
                    placeholder="+61499981286"
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    id="businessEmail"
                    type="email"
                    placeholder="info@athletix.com.au"
                  />
                </label>
                <label className="field">
                  <span>Street Address</span>
                  <input
                    id="businessStreet"
                    type="text"
                    placeholder="42 Baxter Street"
                  />
                </label>
                <label className="field">
                  <span>City</span>
                  <input
                    id="businessCity"
                    type="text"
                    placeholder="Fortitude Valley"
                  />
                </label>
                <label className="field">
                  <span>Region / State</span>
                  <input
                    id="businessRegion"
                    type="text"
                    placeholder="QLD"
                  />
                </label>
                <label className="field">
                  <span>Postcode</span>
                  <input
                    id="businessPostcode"
                    type="text"
                    placeholder="4006"
                  />
                </label>
                <label className="field">
                  <span>Country Code</span>
                  <input
                    id="businessCountry"
                    type="text"
                    placeholder="AU"
                  />
                </label>
                <label className="field">
                  <span>Latitude</span>
                  <input
                    id="businessLat"
                    type="text"
                    placeholder="-27.4565"
                  />
                </label>
                <label className="field">
                  <span>Longitude</span>
                  <input
                    id="businessLng"
                    type="text"
                    placeholder="153.0341"
                  />
                </label>
                <label className="field">
                  <span>Price Range</span>
                  <input
                    id="businessPriceRange"
                    type="text"
                    placeholder="$$"
                  />
                </label>
                <label className="field field-wide">
                  <span>
                    Opening Hours (one per line, format: Mo-Fr 05:15-19:30)
                  </span>
                  <textarea id="businessHours" rows={3}></textarea>
                </label>
                <label className="field field-wide">
                  <span>Social Profile URLs (one per line)</span>
                  <textarea
                    id="businessSameAs"
                    rows={3}
                    placeholder="https://instagram.com/...&#10;https://facebook.com/..."
                  ></textarea>
                </label>
              </div>

              <div className="panel-head" style={{ marginTop: "12px" }}>
                <h2>FAQ Schema Builder</h2>
                <p>
                  Add common questions so search engines can show rich FAQ
                  results.
                </p>
              </div>
              <div className="form-grid">
                <label className="field field-wide">
                  <span>FAQ 1 - Question</span>
                  <input id="faq1Question" type="text" />
                </label>
                <label className="field field-wide">
                  <span>FAQ 1 - Answer</span>
                  <textarea id="faq1Answer" rows={3}></textarea>
                </label>
                <label className="field field-wide">
                  <span>FAQ 2 - Question</span>
                  <input id="faq2Question" type="text" />
                </label>
                <label className="field field-wide">
                  <span>FAQ 2 - Answer</span>
                  <textarea id="faq2Answer" rows={3}></textarea>
                </label>
                <label className="field field-wide">
                  <span>FAQ 3 - Question</span>
                  <input id="faq3Question" type="text" />
                </label>
                <label className="field field-wide">
                  <span>FAQ 3 - Answer</span>
                  <textarea id="faq3Answer" rows={3}></textarea>
                </label>
              </div>
            </section>

            <section className="panel tab-panel" data-panel="indexing">
              <div className="panel-head">
                <h2>Indexing + Search Console Verification</h2>
                <p>
                  Connect indexing signals and verification tags for search
                  engines.
                </p>
              </div>
              <div className="form-grid">
                <label className="field field-wide">
                  <span>Sitemap URL</span>
                  <input
                    id="seoSitemapUrl"
                    type="url"
                    placeholder="https://athletix.com.au/sitemap.xml"
                  />
                </label>
                <label className="field">
                  <span>Google Site Verification</span>
                  <input id="googleVerification" type="text" />
                </label>
                <label className="field">
                  <span>Bing Verification</span>
                  <input id="bingVerification" type="text" />
                </label>
                <label className="field">
                  <span>Yandex Verification</span>
                  <input id="yandexVerification" type="text" />
                </label>
                <label className="field">
                  <span>Baidu Verification</span>
                  <input id="baiduVerification" type="text" />
                </label>
                <label className="field field-wide">
                  <span>Crawl Notes (internal SEO notes)</span>
                  <textarea
                    id="crawlNotes"
                    rows={3}
                    placeholder="Example: Keep important pages indexable."
                  ></textarea>
                </label>
              </div>
            </section>

            <section className="panel tab-panel" data-panel="content">
              <div className="panel-head">
                <h2>Homepage Content Blocks</h2>
                <p>
                  Edit high-impact page content for better relevance and
                  ranking.
                </p>
              </div>
              <div id="contentFields" className="dynamic-grid"></div>
            </section>

            <section className="panel tab-panel" data-panel="images">
              <div className="panel-head">
                <h2>Image ALT Text Audit</h2>
                <p>
                  Clear image ALT text improves accessibility and image SEO.
                </p>
              </div>
              <div id="altFields" className="dynamic-grid"></div>
            </section>

            <footer className="panel action-panel">
              <div className="action-row">
                <button id="resetBtn" className="ghost-btn danger" type="button">
                  Reset to Default
                </button>
                <button id="exportBtn" className="ghost-btn" type="button">
                  Export Backup
                </button>
                <button id="importBtn" className="ghost-btn" type="button">
                  Import Backup
                </button>
                <input
                  id="importFileInput"
                  type="file"
                  accept="application/json"
                  hidden
                />
              </div>
              <p
                id="saveStatus"
                className="status"
                role="status"
                aria-live="polite"
              ></p>
            </footer>
          </div>

          <aside className="side-column">
            <section className="panel">
              <h3>SEO Audit Checklist</h3>
              <p className="muted">
                Detailed pass/fail checks with recommendations.
              </p>
              <div id="auditList" className="audit-list"></div>
            </section>

            <section className="panel">
              <h3>Recommended Next Actions</h3>
              <ul id="recommendationList" className="recommend-list"></ul>
            </section>

            <section className="panel">
              <h3>How to Use</h3>
              <ol className="howto-list">
                <li>Fill On-Page SEO fields first (title + description).</li>
                <li>Complete Social SEO so shared links look professional.</li>
                <li>Set canonical + robots correctly in Technical SEO.</li>
                <li>Update content blocks and image ALT text.</li>
                <li>Click Save All SEO Changes.</li>
              </ol>
            </section>
          </aside>
        </section>
      </main>

      <iframe
        id="sourceFrame"
        src="/?seoPreview=1"
        title="Website source"
        hidden
      ></iframe>
      <Script src="/js/seo-dashboard.js" strategy="afterInteractive" />
    </>
  );
}
