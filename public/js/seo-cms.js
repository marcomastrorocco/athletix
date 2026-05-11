const ATHLETIX_SEO_KEY = 'athletixSeoSettingsV1';

const contentDefinitions = [
  { key: 'announceText', selector: '#announceBar span' },
  { key: 'heroPill', selector: '#heroPill' },
  { key: 'heroLede', selector: '#heroLede' },
  { key: 'trustedTitle', selector: '#trusted .trusted-title' },
  { key: 'testimonialsHeading', selector: '#testimonials .section-heading' },
  { key: 'testimonialsDescription', selector: '#testimonials .testimonials-sub' },
  { key: 'manifestoHeading', selector: '.manifesto h2' },
  { key: 'manifestoDescription', selector: '.manifesto p' },
  { key: 'teamHeading', selector: '#team .elite-coaches-title' },
  { key: 'teamDescription', selector: '#team .elite-coaches-sub' },
  { key: 'timetableHeading', selector: '#timetable .timetable-head h2' },
  { key: 'timetableDescription', selector: '#timetable .section-sub' },
  { key: 'membershipHeading', selector: '#membership .membership-head h2' },
  { key: 'membershipDescription', selector: '#membership .membership-head .section-sub' },
  { key: 'classesHeading', selector: '#classes .section-head h2' },
  { key: 'programsHeading', selector: '#programs .section-head h2' },
  { key: 'trialHeading', selector: '#trial .trial-inner h2' },
  { key: 'trialDescription', selector: '#trial .trial-inner p' },
  { key: 'aboutHeading', selector: '#about .section-head h2' },
  { key: 'galleryHeading', selector: '.gallery .section-head h2' },
  { key: 'contactHeading', selector: '#contact .contact-copy h2' },
  { key: 'serviceAreas', selector: '#contact .areas p:last-child' },
  { key: 'footerDescription', selector: '.site-footer .footer-brand p' }
];

const altDefinitions = [
  { key: 'heroImageAlt', selector: '#heroImage' },
  { key: 'manifestoImageAlt', selector: '.manifesto-image img' },
  { key: 'membershipYouthAlt', selector: '#membership .plan-card:nth-of-type(1) img' },
  { key: 'membershipAdultAlt', selector: '#membership .plan-card:nth-of-type(2) img' },
  { key: 'membershipFamilyAlt', selector: '#membership .plan-card:nth-of-type(3) img' },
  { key: 'membershipAthleteAlt', selector: '#membership .plan-card:nth-of-type(4) img' },
  { key: 'classYouthAlt', selector: '#classes .class-card:nth-of-type(1) img' },
  { key: 'classAdultAlt', selector: '#classes .class-card:nth-of-type(2) img' },
  { key: 'classFamilyAlt', selector: '#classes .class-card:nth-of-type(3) img' },
  { key: 'classAthleteAlt', selector: '#classes .class-card:nth-of-type(4) img' }
];

function parseStoredSEO() {
  const raw = localStorage.getItem(ATHLETIX_SEO_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Invalid stored SEO settings', error);
    return null;
  }
}

function upsertMeta(tag, value, attr = 'name') {
  if (!value) return;
  let node = document.querySelector(`meta[${attr}="${tag}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, tag);
    document.head.appendChild(node);
  }
  node.setAttribute('content', value);
}

function removeMeta(tag, attr = 'name') {
  const node = document.querySelector(`meta[${attr}="${tag}"]`);
  if (node) node.remove();
}

function upsertCanonical(href) {
  if (!href) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(id, payload) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement('script');
    node.type = 'application/ld+json';
    node.id = id;
    document.head.appendChild(node);
  }
  node.textContent = JSON.stringify(payload);
}

function splitLines(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);
}

function buildLocalBusinessSchema(seo) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': seo.businessType || 'SportsActivityLocation',
    name: seo.businessName || 'Athletix Brisbane',
    url: seo.seoCanonical || window.location.origin,
    telephone: seo.businessPhone || undefined,
    email: seo.businessEmail || undefined,
    priceRange: seo.businessPriceRange || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: seo.businessStreet || undefined,
      addressLocality: seo.businessCity || undefined,
      addressRegion: seo.businessRegion || undefined,
      postalCode: seo.businessPostcode || undefined,
      addressCountry: seo.businessCountry || undefined
    }
  };

  const latitude = Number(seo.businessLat);
  const longitude = Number(seo.businessLng);
  if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude,
      longitude
    };
  }

  const openingHours = splitLines(seo.businessHours);
  if (openingHours.length) schema.openingHours = openingHours;

  const sameAs = splitLines(seo.businessSameAs).filter((url) => /^https?:\/\//i.test(url));
  if (sameAs.length) schema.sameAs = sameAs;

  return schema;
}

function buildFaqSchema(seo) {
  const pairs = [
    [seo.faq1Question, seo.faq1Answer],
    [seo.faq2Question, seo.faq2Answer],
    [seo.faq3Question, seo.faq3Answer]
  ].filter((pair) => pair[0] && pair[1]);

  if (!pairs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((pair) => ({
      '@type': 'Question',
      name: pair[0],
      acceptedAnswer: {
        '@type': 'Answer',
        text: pair[1]
      }
    }))
  };
}

function applySEOSettings() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('seoPreview') === '1') return;

  const settings = parseStoredSEO();
  if (!settings || !settings.seo) return;

  const seo = settings.seo;
  const pageTitle = seo.seoTitle || seo.title;
  const pageDescription = seo.seoDescription || seo.description;

  if (pageTitle) document.title = pageTitle;

  upsertMeta('description', pageDescription, 'name');
  upsertMeta('keywords', seo.seoKeywords || seo.keywords, 'name');
  upsertMeta('robots', seo.seoRobots || seo.robots, 'name');
  upsertMeta('author', seo.seoAuthor, 'name');
  upsertMeta('theme-color', seo.seoThemeColor, 'name');
  upsertCanonical(seo.seoCanonical || seo.canonical);

  const socialTitle = seo.ogTitle || pageTitle || '';
  const socialDescription = seo.ogDescription || pageDescription || '';
  const socialImage = seo.ogImage || '';

  upsertMeta('og:title', socialTitle, 'property');
  upsertMeta('og:description', socialDescription, 'property');
  upsertMeta('og:image', socialImage, 'property');
  upsertMeta('og:url', seo.ogUrl, 'property');
  upsertMeta('og:type', seo.ogType || 'website', 'property');
  upsertMeta('og:locale', seo.seoLocale || seo.locale || 'en_AU', 'property');

  upsertMeta('twitter:card', seo.twitterCard || 'summary_large_image', 'name');
  upsertMeta('twitter:title', socialTitle, 'name');
  upsertMeta('twitter:description', socialDescription, 'name');
  upsertMeta('twitter:image', socialImage, 'name');
  upsertMeta('twitter:site', seo.twitterSite, 'name');

  upsertMeta('google-site-verification', seo.googleVerification, 'name');
  upsertMeta('msvalidate.01', seo.bingVerification, 'name');
  upsertMeta('yandex-verification', seo.yandexVerification, 'name');
  upsertMeta('baidu-site-verification', seo.baiduVerification, 'name');

  if (seo.seoLocale) {
    document.documentElement.setAttribute('lang', seo.seoLocale.replace('_', '-'));
  }

  upsertJsonLd('athletixLocalBusinessSchema', buildLocalBusinessSchema(seo));
  const faqSchema = buildFaqSchema(seo);
  if (faqSchema) {
    upsertJsonLd('athletixFaqSchema', faqSchema);
  } else {
    const existingFaq = document.getElementById('athletixFaqSchema');
    if (existingFaq) existingFaq.remove();
  }

  const content = settings.content || {};
  contentDefinitions.forEach((item) => {
    const value = content[item.key];
    if (!value) return;
    const node = document.querySelector(item.selector);
    if (node) node.textContent = value;
  });

  if (seo.seoH1) {
    const h1 = document.querySelector('h1');
    if (h1) h1.textContent = seo.seoH1;
  }

  const imageAlt = settings.imageAlt || {};
  altDefinitions.forEach((item) => {
    const value = imageAlt[item.key];
    if (!value) return;
    const node = document.querySelector(item.selector);
    if (node) node.setAttribute('alt', value);
  });

  if (!seo.twitterSite) removeMeta('twitter:site', 'name');
}

applySEOSettings();
