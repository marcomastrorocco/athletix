const SEO_KEY = 'athletixSeoSettingsV1';

const contentDefinitions = [
  { key: 'announceText', label: 'Announcement Bar', selector: '#announceBar span' },
  { key: 'heroPill', label: 'Hero Badge', selector: '#heroPill' },
  { key: 'heroLede', label: 'Hero Description', selector: '#heroLede' },
  { key: 'trustedTitle', label: 'Trusted By Title', selector: '#trusted .trusted-title' },
  { key: 'testimonialsHeading', label: 'Testimonials Heading', selector: '#testimonials .section-heading' },
  { key: 'testimonialsDescription', label: 'Testimonials Description', selector: '#testimonials .testimonials-sub' },
  { key: 'manifestoHeading', label: 'Manifesto Heading', selector: '.manifesto h2' },
  { key: 'manifestoDescription', label: 'Manifesto Description', selector: '.manifesto p' },
  { key: 'teamHeading', label: 'Coaches Heading', selector: '#team .elite-coaches-title' },
  { key: 'teamDescription', label: 'Coaches Description', selector: '#team .elite-coaches-sub' },
  { key: 'timetableHeading', label: 'Timetable Heading', selector: '#timetable .timetable-head h2' },
  { key: 'timetableDescription', label: 'Timetable Description', selector: '#timetable .section-sub' },
  { key: 'membershipHeading', label: 'Membership Heading', selector: '#membership .membership-head h2' },
  { key: 'membershipDescription', label: 'Membership Description', selector: '#membership .membership-head .section-sub' },
  { key: 'classesHeading', label: 'Classes Heading', selector: '#classes .section-head h2' },
  { key: 'programsHeading', label: 'Programs Heading', selector: '#programs .section-head h2' },
  { key: 'trialHeading', label: 'Trial CTA Heading', selector: '#trial .trial-inner h2' },
  { key: 'trialDescription', label: 'Trial CTA Description', selector: '#trial .trial-inner p' },
  { key: 'aboutHeading', label: 'About Heading', selector: '#about .section-head h2' },
  { key: 'galleryHeading', label: 'Gallery Heading', selector: '.gallery .section-head h2' },
  { key: 'contactHeading', label: 'Contact Heading', selector: '#contact .contact-copy h2' },
  { key: 'serviceAreas', label: 'Service Areas', selector: '#contact .areas p:last-child' },
  { key: 'footerDescription', label: 'Footer Description', selector: '.site-footer .footer-brand p' }
];

const altDefinitions = [
  { key: 'heroImageAlt', label: 'Hero Image ALT', selector: '#heroImage' },
  { key: 'manifestoImageAlt', label: 'Manifesto Image ALT', selector: '.manifesto-image img' },
  { key: 'membershipYouthAlt', label: 'Membership Youth Image ALT', selector: '#membership .plan-card:nth-of-type(1) img' },
  { key: 'membershipAdultAlt', label: 'Membership Adult Image ALT', selector: '#membership .plan-card:nth-of-type(2) img' },
  { key: 'membershipFamilyAlt', label: 'Membership Family Image ALT', selector: '#membership .plan-card:nth-of-type(3) img' },
  { key: 'membershipAthleteAlt', label: 'Membership Athlete Image ALT', selector: '#membership .plan-card:nth-of-type(4) img' },
  { key: 'classYouthAlt', label: 'Youth Class Image ALT', selector: '#classes .class-card:nth-of-type(1) img' },
  { key: 'classAdultAlt', label: 'Adult Class Image ALT', selector: '#classes .class-card:nth-of-type(2) img' },
  { key: 'classFamilyAlt', label: 'Family Class Image ALT', selector: '#classes .class-card:nth-of-type(3) img' },
  { key: 'classAthleteAlt', label: 'Athlete Class Image ALT', selector: '#classes .class-card:nth-of-type(4) img' }
];

const staticFieldIds = [
  'seoTitle',
  'seoDescription',
  'seoPrimaryKeyword',
  'seoKeywords',
  'seoH1',
  'ogTitle',
  'ogDescription',
  'ogImage',
  'ogUrl',
  'ogType',
  'twitterCard',
  'twitterSite',
  'seoCanonical',
  'seoRobots',
  'seoLocale',
  'seoSchemaOrg',
  'seoAuthor',
  'seoThemeColor',
  'businessName',
  'businessType',
  'businessPhone',
  'businessEmail',
  'businessStreet',
  'businessCity',
  'businessRegion',
  'businessPostcode',
  'businessCountry',
  'businessLat',
  'businessLng',
  'businessPriceRange',
  'businessHours',
  'businessSameAs',
  'faq1Question',
  'faq1Answer',
  'faq2Question',
  'faq2Answer',
  'faq3Question',
  'faq3Answer',
  'seoSitemapUrl',
  'googleVerification',
  'bingVerification',
  'yandexVerification',
  'baiduVerification',
  'crawlNotes'
];

const sourceFrame = document.getElementById('sourceFrame');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFileInput = document.getElementById('importFileInput');
const saveStatus = document.getElementById('saveStatus');
const contentFields = document.getElementById('contentFields');
const altFields = document.getElementById('altFields');
const auditList = document.getElementById('auditList');
const recommendationList = document.getElementById('recommendationList');
const titleLength = document.getElementById('titleLength');
const descriptionLength = document.getElementById('descriptionLength');
const seoScore = document.getElementById('seoScore');
const seoScoreNote = document.getElementById('seoScoreNote');
const checklistRatio = document.getElementById('checklistRatio');
const snippetTitle = document.getElementById('snippetTitle');
const snippetUrl = document.getElementById('snippetUrl');
const snippetDescription = document.getElementById('snippetDescription');
const socialPreviewImage = document.getElementById('socialPreviewImage');
const socialPreviewTitle = document.getElementById('socialPreviewTitle');
const socialPreviewDescription = document.getElementById('socialPreviewDescription');

const state = {
  defaults: null,
  settings: null,
  initialized: false
};

function getMetaContent(doc, name, attr = 'name') {
  const element = doc.querySelector(`meta[${attr}="${name}"]`);
  return element ? element.getAttribute('content') || '' : '';
}

function getText(doc, selector) {
  const node = doc.querySelector(selector);
  return node ? node.textContent.trim() : '';
}

function getAttr(doc, selector, attr) {
  const node = doc.querySelector(selector);
  return node ? node.getAttribute(attr) || '' : '';
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function parseStored() {
  const raw = localStorage.getItem(SEO_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Invalid SEO settings JSON', error);
    return null;
  }
}

function buildDefaults(doc) {
  const defaults = {
    version: 3,
    seo: {
      seoTitle: doc.title || '',
      seoDescription: getMetaContent(doc, 'description'),
      seoPrimaryKeyword: '',
      seoKeywords: getMetaContent(doc, 'keywords'),
      seoH1: getText(doc, 'h1'),
      ogTitle: getMetaContent(doc, 'og:title', 'property'),
      ogDescription: getMetaContent(doc, 'og:description', 'property'),
      ogImage: getMetaContent(doc, 'og:image', 'property'),
      ogUrl: getMetaContent(doc, 'og:url', 'property') || 'https://athletix.com.au/',
      ogType: getMetaContent(doc, 'og:type', 'property') || 'website',
      twitterCard: getMetaContent(doc, 'twitter:card') || 'summary_large_image',
      twitterSite: getMetaContent(doc, 'twitter:site'),
      seoCanonical: getAttr(doc, 'link[rel="canonical"]', 'href') || 'https://athletix.com.au/',
      seoRobots: getMetaContent(doc, 'robots') || 'index,follow',
      seoLocale: getMetaContent(doc, 'og:locale', 'property') || 'en_AU',
      seoSchemaOrg: '',
      seoAuthor: getMetaContent(doc, 'author'),
      seoThemeColor: getMetaContent(doc, 'theme-color'),
      businessName: getText(doc, '.footer-brand img') ? 'Athletix Brisbane' : 'Athletix Brisbane',
      businessType: 'SportsActivityLocation',
      businessPhone: getText(doc, 'a[href^="tel:"]') || '+61499981286',
      businessEmail: getText(doc, 'a[href^="mailto:"]') || 'info@athletix.com.au',
      businessStreet: '42 Baxter Street',
      businessCity: 'Fortitude Valley',
      businessRegion: 'QLD',
      businessPostcode: '4006',
      businessCountry: 'AU',
      businessLat: '',
      businessLng: '',
      businessPriceRange: '$$',
      businessHours: '',
      businessSameAs: '',
      faq1Question: '',
      faq1Answer: '',
      faq2Question: '',
      faq2Answer: '',
      faq3Question: '',
      faq3Answer: '',
      seoSitemapUrl: 'https://athletix.com.au/sitemap.xml',
      googleVerification: getMetaContent(doc, 'google-site-verification'),
      bingVerification: getMetaContent(doc, 'msvalidate.01'),
      yandexVerification: getMetaContent(doc, 'yandex-verification'),
      baiduVerification: getMetaContent(doc, 'baidu-site-verification'),
      crawlNotes: ''
    },
    content: {},
    imageAlt: {}
  };

  contentDefinitions.forEach((item) => {
    defaults.content[item.key] = getText(doc, item.selector);
  });

  altDefinitions.forEach((item) => {
    defaults.imageAlt[item.key] = getAttr(doc, item.selector, 'alt');
  });

  return defaults;
}

function mergeSettings(defaults, saved) {
  if (!saved) return deepClone(defaults);
  return {
    version: 3,
    seo: { ...defaults.seo, ...(saved.seo || {}) },
    content: { ...defaults.content, ...(saved.content || {}) },
    imageAlt: { ...defaults.imageAlt, ...(saved.imageAlt || {}) }
  };
}

function field(id) {
  return document.getElementById(id);
}

function setField(id, value) {
  const node = field(id);
  if (node) node.value = value || '';
}

function readField(id) {
  const node = field(id);
  return node ? node.value.trim() : '';
}

function bindStaticFields() {
  staticFieldIds.forEach((id) => setField(id, state.settings.seo[id]));
}

function bindDynamicFields() {
  contentFields.innerHTML = '';
  altFields.innerHTML = '';

  contentDefinitions.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'dynamic-card';
    card.innerHTML = `<strong>${item.label}</strong>`;
    const input = document.createElement('textarea');
    input.dataset.group = 'content';
    input.dataset.key = item.key;
    input.value = state.settings.content[item.key] || '';
    card.appendChild(input);
    contentFields.appendChild(card);
  });

  altDefinitions.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'dynamic-card';
    card.innerHTML = `<strong>${item.label}</strong>`;
    const input = document.createElement('input');
    input.type = 'text';
    input.dataset.group = 'imageAlt';
    input.dataset.key = item.key;
    input.value = state.settings.imageAlt[item.key] || '';
    card.appendChild(input);
    altFields.appendChild(card);
  });
}

function readFormState() {
  const next = deepClone(state.settings);
  staticFieldIds.forEach((id) => {
    next.seo[id] = readField(id);
  });

  document.querySelectorAll('[data-group="content"]').forEach((node) => {
    next.content[node.dataset.key] = node.value.trim();
  });
  document.querySelectorAll('[data-group="imageAlt"]').forEach((node) => {
    next.imageAlt[node.dataset.key] = node.value.trim();
  });

  return next;
}

function splitLines(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);
}

function getFaqCount(seo) {
  const pairs = [
    [seo.faq1Question, seo.faq1Answer],
    [seo.faq2Question, seo.faq2Answer],
    [seo.faq3Question, seo.faq3Answer]
  ];
  return pairs.filter((pair) => pair[0] && pair[1]).length;
}

function getLocalCompleteness(seo) {
  const required = [
    seo.businessName,
    seo.businessType,
    seo.businessPhone,
    seo.businessEmail,
    seo.businessStreet,
    seo.businessCity,
    seo.businessRegion,
    seo.businessPostcode,
    seo.businessCountry
  ];
  return required.filter(Boolean).length;
}

function updatePreviews(data) {
  const seo = data.seo;
  const title = seo.seoTitle || 'ATHLETIX - Train Like an Athlete';
  const description = seo.seoDescription || 'Add meta description to preview your Google snippet.';
  const canonical = seo.seoCanonical || 'https://athletix.com.au/';
  const socialTitle = seo.ogTitle || title;
  const socialDescription = seo.ogDescription || description;

  snippetTitle.textContent = title;
  snippetUrl.textContent = canonical;
  snippetDescription.textContent = description;

  socialPreviewTitle.textContent = socialTitle;
  socialPreviewDescription.textContent = socialDescription;
  socialPreviewImage.src = seo.ogImage || 'image/athlethix-logo.png';
}

function buildChecks(data) {
  const seo = data.seo;
  const titleLen = (seo.seoTitle || '').length;
  const descriptionLen = (seo.seoDescription || '').length;
  const ogTitleLen = (seo.ogTitle || '').length;
  const ogDescriptionLen = (seo.ogDescription || '').length;
  const altsCount = Object.values(data.imageAlt || {}).filter(Boolean).length;
  const contentCount = Object.values(data.content || {}).filter(Boolean).length;
  const localCount = getLocalCompleteness(seo);
  const faqCount = getFaqCount(seo);
  const sameAsCount = splitLines(seo.businessSameAs).length;
  const hasKeywordInTitle = seo.seoPrimaryKeyword
    ? (seo.seoTitle || '').toLowerCase().includes(seo.seoPrimaryKeyword.toLowerCase())
    : false;
  const hasKeywordInDescription = seo.seoPrimaryKeyword
    ? (seo.seoDescription || '').toLowerCase().includes(seo.seoPrimaryKeyword.toLowerCase())
    : false;
  const hasVerification = Boolean(seo.googleVerification || seo.bingVerification || seo.yandexVerification || seo.baiduVerification);

  return [
    { label: 'Title length between 50-60 chars', pass: titleLen >= 50 && titleLen <= 60, tip: `Current: ${titleLen} chars` },
    { label: 'Meta description between 140-160 chars', pass: descriptionLen >= 140 && descriptionLen <= 160, tip: `Current: ${descriptionLen} chars` },
    { label: 'Primary keyword is set', pass: Boolean(seo.seoPrimaryKeyword), tip: seo.seoPrimaryKeyword || 'Add one target keyword' },
    { label: 'Keyword appears in title', pass: hasKeywordInTitle, tip: hasKeywordInTitle ? 'Good match' : 'Add keyword into title naturally' },
    { label: 'Keyword appears in description', pass: hasKeywordInDescription, tip: hasKeywordInDescription ? 'Good match' : 'Add keyword into description naturally' },
    { label: 'Canonical URL is set', pass: Boolean(seo.seoCanonical), tip: seo.seoCanonical || 'Missing canonical URL' },
    { label: 'Robots allows indexing', pass: /index/i.test(seo.seoRobots || ''), tip: seo.seoRobots || 'Missing robots meta' },
    { label: 'Open Graph title is set', pass: ogTitleLen >= 30, tip: `Current: ${ogTitleLen} chars` },
    { label: 'Open Graph description is set', pass: ogDescriptionLen >= 80, tip: `Current: ${ogDescriptionLen} chars` },
    { label: 'Open Graph image URL is set', pass: Boolean(seo.ogImage), tip: seo.ogImage || 'Missing og:image' },
    { label: 'Twitter card + site are set', pass: Boolean(seo.twitterCard && seo.twitterSite), tip: seo.twitterSite || 'Add twitter:site username' },
    { label: 'Author + theme color meta are set', pass: Boolean(seo.seoAuthor && seo.seoThemeColor), tip: `${seo.seoAuthor ? 'Author OK' : 'Author missing'} / ${seo.seoThemeColor ? 'Theme OK' : 'Theme missing'}` },
    { label: 'Local business profile completed (9/9)', pass: localCount === 9, tip: `Completed: ${localCount}/9` },
    { label: 'At least 2 social profile links', pass: sameAsCount >= 2, tip: `Current: ${sameAsCount}` },
    { label: 'FAQ schema has at least 2 Q&A', pass: faqCount >= 2, tip: `Current: ${faqCount}` },
    { label: 'Sitemap URL is set', pass: Boolean(seo.seoSitemapUrl), tip: seo.seoSitemapUrl || 'Missing sitemap URL' },
    { label: 'At least one webmaster verification is set', pass: hasVerification, tip: hasVerification ? 'Verification found' : 'Add Google or Bing verification' },
    { label: 'Content blocks mostly filled (18+)', pass: contentCount >= 18, tip: `Current: ${contentCount}/${contentDefinitions.length}` },
    { label: 'Image ALT coverage (8/10)', pass: altsCount >= 8, tip: `Current: ${altsCount}/10` }
  ];
}

function renderAudit(checks) {
  auditList.innerHTML = '';
  recommendationList.innerHTML = '';

  checks.forEach((check) => {
    const row = document.createElement('article');
    row.className = `audit-item ${check.pass ? 'pass' : 'warn'}`;
    row.innerHTML = `<strong>${check.label}</strong><span>${check.tip}</span>`;
    auditList.appendChild(row);

    if (!check.pass) {
      const item = document.createElement('li');
      item.textContent = check.label;
      recommendationList.appendChild(item);
    }
  });

  if (!recommendationList.children.length) {
    const done = document.createElement('li');
    done.textContent = 'Excellent. No major SEO gaps found.';
    recommendationList.appendChild(done);
  }
}

function updateMetrics() {
  const data = readFormState();
  const checks = buildChecks(data);
  const passed = checks.filter((check) => check.pass).length;
  const total = checks.length;
  const score = Math.round((passed / total) * 100);

  titleLength.textContent = `${(data.seo.seoTitle || '').length} chars`;
  descriptionLength.textContent = `${(data.seo.seoDescription || '').length} chars`;
  checklistRatio.textContent = `${passed}/${total}`;
  seoScore.textContent = `${score}/100`;

  if (score >= 88) seoScoreNote.textContent = 'Excellent SEO baseline. Keep monitoring monthly.';
  else if (score >= 70) seoScoreNote.textContent = 'Good progress. Finish remaining checklist items.';
  else seoScoreNote.textContent = 'Needs work. Fix warnings to improve ranking readiness.';

  updatePreviews(data);
  renderAudit(checks);
}

function renderAll() {
  bindStaticFields();
  bindDynamicFields();
  updateMetrics();
}

function showStatus(message) {
  saveStatus.textContent = message;
}

function saveSettings() {
  state.settings = readFormState();
  localStorage.setItem(SEO_KEY, JSON.stringify(state.settings));
  updateMetrics();
  showStatus('Saved successfully. Refresh the website tab to view updates.');
}

function resetSettings() {
  localStorage.removeItem(SEO_KEY);
  state.settings = deepClone(state.defaults);
  renderAll();
  showStatus('Reset complete. Default website SEO is restored.');
}

function exportSettings() {
  const payload = JSON.stringify(readFormState(), null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'athletix-seo-backup.json';
  anchor.click();
  URL.revokeObjectURL(url);
  showStatus('Backup exported.');
}

function importSettings(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || '{}'));
      state.settings = mergeSettings(state.defaults, parsed);
      localStorage.setItem(SEO_KEY, JSON.stringify(state.settings));
      renderAll();
      showStatus('Backup imported and applied.');
    } catch (error) {
      console.error(error);
      showStatus('Import failed. Please use a valid JSON backup.');
    }
  };
  reader.readAsText(file);
}

function switchTab(tabKey) {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabKey);
  });
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === tabKey);
  });
}

function bindEvents() {
  saveBtn.addEventListener('click', saveSettings);
  resetBtn.addEventListener('click', resetSettings);
  exportBtn.addEventListener('click', exportSettings);
  importBtn.addEventListener('click', () => importFileInput.click());

  importFileInput.addEventListener('change', (event) => {
    const [file] = event.target.files || [];
    importSettings(file);
    importFileInput.value = '';
  });

  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  document.body.addEventListener('input', (event) => {
    if (event.target.matches('input, textarea')) updateMetrics();
  });
}

function bootDashboard() {
  if (!sourceFrame) return;

  const attemptBoot = () => {
    if (state.initialized) return true;
    try {
      const doc = sourceFrame.contentDocument;
      if (!doc || !doc.body || !doc.body.children.length) return false;

      state.defaults = buildDefaults(doc);
      state.settings = mergeSettings(state.defaults, parseStored());
      renderAll();
      bindEvents();
      state.initialized = true;
      showStatus('Ready. Fill SEO sections and click Save All SEO Changes.');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  sourceFrame.addEventListener('load', attemptBoot, { once: true });

  const wait = () => {
    if (attemptBoot()) return;
    window.setTimeout(wait, 150);
  };
  wait();
}

bootDashboard();
