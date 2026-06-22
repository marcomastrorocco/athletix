import {
  readJson,
  writeJson,
  tryReadJson,
  listJsonKeys,
} from "./storage";

export type Btn = { label: string; href: string };
export type ImgRef = { src: string; alt: string };
export type NL = { n: string; l: string }; // number + label
export type KV = { val: string; lbl: string; img?: string; alt?: string }; // value + label (credentials); optional logo image

export type HomeHero = {
  kicker: string;
  h1Top: string;
  h1Em: string;
  sub: string;
  subBoldStart: string; // bold portion at start
  primaryBtn: Btn;
  secondaryBtn: Btn;
  bgImage: string;
  stats: NL[];
};

export type HomeTrust = {
  headingTop: string;
  headingEm: string;
  label: string;
  logos: ImgRef[];
};

export type HomeAudience = { icon: string; title: string; desc: string };
export type HomeCommunity = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  brandStatementTop: string;
  brandStatementEm: string;
  body: string;
  sloganLabel: string;
  sloganTop: string;
  sloganEm: string;
  audiences: HomeAudience[];
};

export type VsRow = { bad: string; good: string };
export type HomeVs = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  body: string;
  themHead: string;
  midHead: string;
  usHead: string;
  rows: VsRow[];
};

export type HomeClassItem = {
  img: string;
  alt: string;
  tag: string;
  name: string;
  desc: string;
  href: string;
};
export type HomeClasses = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  body: string;
  items: HomeClassItem[];
};

export type HomeDiscipline = {
  num: string;
  name: string;
  desc: string;
  hawkin?: boolean;
  note?: string;
};
export type HomeDisciplines = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  items: HomeDiscipline[];
};

export type HomeCoaches = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  body: string;
  credBar: KV[];
};

export type HubService = { icon: string; text: string };
export type HubPhysio = { name: string; role: string; exp: string; img: string };
export type HomeHub = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  body: string;
  stats: NL[];
  cardBadge: string;
  cardTitle: string;
  cardDesc: string;
  services: HubService[];
  physios: HubPhysio[];
  dietLabel: string;
  dietTitleTop: string;
  dietTitleEm: string;
  dietDesc: string;
  dietCreds: string[];
};

export type SpaceCell = {
  img: string;
  alt: string;
  labelTop: string;
  labelBottom: string;
  tall?: boolean;
  video?: string;
};
export type HomeSpace = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  body: string;
  cells: SpaceCell[];
};

export type TestiVideo = {
  src: string;
  quote: string;
  bold: string;
  tail: string;
  avatar: string;
  name: string;
  meta: string;
};
export type TestiStory = {
  icon: string;
  titleTop: string;
  titleEm: string;
  body: string;
  isQuote?: boolean;
};
export type HomeTestimonials = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  heroQuoteText: string;
  heroQuoteEm: string;
  heroQuoteAttr: string;
  videos: TestiVideo[];
  stories: TestiStory[];
};

export type HomePlan = {
  tier: string;
  name: string;
  price: string;
  img: string;
  alt: string;
  features: string[];
  featured?: boolean;
  href: string;
};
export type HomeMembership = {
  kicker: string;
  h2Top: string;
  h2Em: string;
  body: string;
  plans: HomePlan[];
};

export type HomeCta = {
  tag: string;
  hTop: string;
  hEm: string;
  sub: string;
  detail: string;
  primaryBtn: Btn;
  secondaryBtn: Btn;
};

export type SideHour = { weekday: number; short: string; hours: string };
export type SocialLink = { platform: string; href: string };
// A single card inside a nav dropdown (mega) panel.
export type NavMegaItem = { href: string; title: string; desc: string };
// A top-level nav entry. If `mega` has items it renders as a dropdown.
export type NavItem = { label: string; href: string; mega: NavMegaItem[] };
export type HeaderContent = {
  nav: NavItem[];
  sideAbout: string;
  hoursHeading: string;
  hours: SideHour[];
  socialsHeading: string;
  socials: SocialLink[];
};

export type FooterContact = { icon: string; text: string; href?: string };
export type HomeFooter = {
  brandImg: string;
  tagline: string;
  contacts: FooterContact[];
  formTitle: string;
  formSub: string;
  formButtonLabel: string;
  joinOptions: string[];
};

export type SiteContent = {
  // shared / legacy (still used by other components)
  announce: string;
  meta: { title: string; description: string };
  contact: { phone: string; email: string; address: string; areas: string };
  trial: { heading: string; body: string };
  header: HeaderContent;

  // homepage sections (HomeV2)
  hero: HomeHero;
  trust: HomeTrust;
  community: HomeCommunity;
  vs: HomeVs;
  classes: HomeClasses;
  disciplines: HomeDisciplines;
  coaches: HomeCoaches;
  hub: HomeHub;
  space: HomeSpace;
  testimonials: HomeTestimonials;
  membership: HomeMembership;
  cta: HomeCta;
  footer: HomeFooter;
};

export type Coach = {
  id: string;
  name: string;
  displayName: string;
  role: string;
  image: string;
  bio?: string;
  qualifications?: string[];
  specialties?: string[];
  sports?: string[];
  experience?: string;
  linkedin?: string;
  instagram?: string;
  spotify?: string;
};

export type MembershipPlan = {
  id: string;
  title: string;
  price: string;
  cycle: string;
  note: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  features: string[];
};

export type TimetableCell = { kind: string; title: string; sub: string } | null;
// A day can be marked closed (public holiday, gym shut). Index in `closures`
// aligns with the matching column in `days`; an optional reason is shown to
// visitors (e.g. "Public Holiday — ANZAC Day").
export type DayClosure = { closed: boolean; reason?: string };
export type TimetableData = {
  days: string[];
  rows: { time: string; cells: TimetableCell[] }[];
  closures?: DayClosure[];
};

export type MembershipCategoryPlan = {
  id: string;
  term: string;
  price: string;
  cycle: string;
  tagline: string;
  image: string;
  features: string[];
  enrollUrl?: string;
};
export type MembershipCategory = {
  id: string;
  title: string;
  blurb: string;
  plans: MembershipCategoryPlan[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  published: boolean;
  body: string;
  author?: string;
  tags?: string[];
};

// Fallback used when a stored site.json predates the editable header section.
export const DEFAULT_HEADER: HeaderContent = {
  nav: [
    { label: "TIMETABLE", href: "/class-timetable", mega: [] },
    {
      label: "CLASSES",
      href: "/classes",
      mega: [
        { href: "/youth-classes", title: "Youth Classes", desc: "Ages 7–17. Strength, speed and athletic development." },
        { href: "/adult-classes", title: "Adult Classes", desc: "16+. LIFT, MET-CON, mobility — every level welcome." },
        { href: "/family-classes", title: "Family Classes", desc: "Train together. Parent + child sessions on the floor." },
        { href: "/athletes-program", title: "Athlete Programs", desc: "Pro-standard S&C for serious competitors." },
      ],
    },
    { label: "MEMBERSHIP", href: "/memberships", mega: [] },
    {
      label: "ABOUT US",
      href: "/about-us",
      mega: [
        { href: "/our-gym", title: "Our Gym", desc: "A purpose-built sports performance hub in Fortitude Valley." },
        { href: "/our-team", title: "Our Team", desc: "Meet the coaches and clinicians on the floor." },
        { href: "/allied-health-staff", title: "Allied Health", desc: "Sports physio, rehab and dietetics under one roof." },
        { href: "/ndis-program", title: "NDIS Program", desc: "Tailored strength and conditioning for NDIS participants." },
        { href: "/careers", title: "Careers", desc: "Coach with us. Join the team building elite athletes." },
      ],
    },
    { label: "CONTACT US", href: "/contact-us", mega: [] },
    { label: "BLOG", href: "/blog", mega: [] },
  ],
  sideAbout:
    "Athletix is a Fitness and Athletic development centre with S&C coaches, sports physiotherapy and rehab & in-house cafe in the heart of Brisbane (Fortitude Valley) offering Group Classes for Youth, Adults and Athletes in Strength, Speed & Agility, Conditioning, Sprint Mechanics, Pilates, Mobility and more. Book a Trial Class Today!",
  hoursHeading: "Working Hours",
  hours: [
    { weekday: 1, short: "MON", hours: "5:15 AM – 7:30 PM" },
    { weekday: 2, short: "TUE", hours: "6:00 AM – 7:30 PM" },
    { weekday: 3, short: "WED", hours: "5:15 AM – 7:30 PM" },
    { weekday: 4, short: "THU", hours: "6:00 AM – 7:30 PM" },
    { weekday: 5, short: "FRI", hours: "5:15 AM – 6:00 PM" },
    { weekday: 6, short: "SAT", hours: "6:00 AM – 11:30 AM" },
  ],
  socialsHeading: "Our Socials",
  socials: [
    { platform: "youtube", href: "https://www.youtube.com/channel/UCy1b8l1wpqf0lqD7wC6Qd7w" },
    { platform: "instagram", href: "https://www.instagram.com/athletix_gym/" },
    { platform: "facebook", href: "https://www.facebook.com/ATHLETIX.BRISBANE/" },
    { platform: "linkedin", href: "https://www.linkedin.com/company/athletixgym/?originalSubdomain=au" },
    { platform: "x", href: "https://x.com/athletix_gym" },
  ],
};

export const getSite = async (): Promise<SiteContent> => {
  const site = await readJson<SiteContent>("site.json");
  // Older stored copies (e.g. production Blob) may lack the header section.
  if (!site.header) site.header = DEFAULT_HEADER;
  return site;
};
export const setSite = (s: SiteContent) => writeJson("site.json", s);

export const getTeam = () => readJson<Coach[]>("team.json");
export const setTeam = (t: Coach[]) => writeJson("team.json", t);

export const getMembership = () => readJson<MembershipPlan[]>("membership.json");
export const setMembership = (m: MembershipPlan[]) =>
  writeJson("membership.json", m);

export const getMembershipCategories = () =>
  readJson<MembershipCategory[]>("membership-categories.json");
export const setMembershipCategories = (m: MembershipCategory[]) =>
  writeJson("membership-categories.json", m);

export const getTimetable = () => readJson<TimetableData>("timetable.json");
export const setTimetable = (t: TimetableData) => writeJson("timetable.json", t);

export const getBlog = () => readJson<BlogPost[]>("blog.json");
export const setBlog = (b: BlogPost[]) => writeJson("blog.json", b);

// Lead/enquiry submissions from the website forms (stored privately, never git).
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  trainingAs?: string;
  source?: string;
  message?: string;
  createdAt: string; // ISO
};
export const getLeads = async (): Promise<Lead[]> =>
  (await tryReadJson<Lead[]>("leads.json")) ?? [];
export const setLeads = (l: Lead[]) => writeJson("leads.json", l);

// ============================================================
// Block-based page content
// ============================================================

export type BlockCrumb = { label: string; href: string };

export type PageBannerBlock = {
  type: "pageBanner";
  id: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  lede: string;
  crumbs?: BlockCrumb[];
  variant?: "default" | "about";
  compact?: boolean;
};

export type RichTextBlock = {
  type: "richText";
  id: string;
  width?: "narrow" | "wide";
  eyebrow?: string;
  heading?: string;
  body: string;
};

export type VideoBlock = {
  type: "video";
  id: string;
  eyebrow?: string;
  heading?: string;
  lede?: string;
  embedUrl: string;
};

export type NumberedListItem = {
  num: string;
  title: string;
  body: string;
};
export type NumberedListBlock = {
  type: "numberedList";
  id: string;
  eyebrow?: string;
  heading?: string;
  items: NumberedListItem[];
};

export type FeatureItem = { icon: string; title: string; desc: string };
export type FeatureGridBlock = {
  type: "featureGrid";
  id: string;
  eyebrow?: string;
  heading?: string;
  lede?: string;
  items: FeatureItem[];
};

export type StatItem = { value: string; label: string };
export type StatsBlock = {
  type: "stats";
  id: string;
  items: StatItem[];
};

export type ImageBlock = {
  type: "imageBlock";
  id: string;
  eyebrow?: string;
  heading?: string;
  lede?: string;
  image: string;
  imageAlt: string;
};

export type GalleryImage = { src: string; alt: string; video?: string };
export type GalleryBlock = {
  type: "gallery";
  id: string;
  eyebrow?: string;
  heading?: string;
  images: GalleryImage[];
};

export type CtaBlock = {
  type: "cta";
  id: string;
  eyebrow?: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  bgImage?: string;
};

export type LogoStripBlock = {
  type: "logoStrip";
  id: string;
  heading?: string;
  tagline?: string;
  logos: { src: string; alt: string }[];
  quote?: string;
};

export type QuoteBlock = {
  type: "quote";
  id: string;
  text: string;
  cite?: string;
};

export type HtmlBlock = {
  type: "html";
  id: string;
  html: string;
};

export type PodcastBlock = {
  type: "podcast";
  id: string;
  tag: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  logos?: { src: string; alt: string }[];
};

export type CoachesBlock = {
  type: "coaches";
  id: string;
  eyebrow?: string;
  headingTop: string;
  headingBottom: string;
  body: string;
};

// Class-detail page blocks (used by Lift, Mat Pilates, Met-Con, etc.)

export type ClassHeroBlock = {
  type: "classHero";
  id: string;
  eyebrow: string;
  title: string;
  lead: string; // markdown, supports multi-paragraph and inline formatting
  primaryBtn?: Btn;
  secondaryBtn?: Btn;
  image: string;
  imageAlt: string;
  badge?: string;
  imageBackground?: string; // optional CSS color for image frame bg
  imageContain?: boolean; // use object-fit: contain (for screenshots/illustrations)
};

export type ClassInfoCard = {
  icon: string;
  title: string;
  body: string; // markdown/HTML
  variant?: "default" | "hours";
};

export type ClassInfoBlock = {
  type: "classInfo";
  id: string;
  cards: ClassInfoCard[];
};

export type PillarsItem = {
  n: string;
  title: string;
  body: string;
};

export type PillarsBlock = {
  type: "pillars";
  id: string;
  eyebrow?: string;
  heading?: string;
  sub?: string;
  items: PillarsItem[];
};

export type ClassBookingBlock = {
  type: "classBooking";
  id: string;
  sourceLabel: string;
  defaultClass: string;
};

export type ClassCoachLinkStyle = "outline" | "ghost";

export type ClassCoachLink = {
  label: string;
  href: string;
  style: ClassCoachLinkStyle;
};

export type ClassCoachBlock = {
  type: "classCoach";
  id: string;
  heading?: string; // "Class coach"
  image: string;
  imageAlt: string;
  eyebrow: string; // role
  name: string;
  bio: string;
  links: ClassCoachLink[];
};

export type FaqItem = {
  q: string;
  a: string; // markdown
};

export type FaqBlock = {
  type: "faq";
  id: string;
  heading?: string;
  sub?: string;
  items: FaqItem[];
};

export type Block =
  | PageBannerBlock
  | RichTextBlock
  | VideoBlock
  | NumberedListBlock
  | FeatureGridBlock
  | StatsBlock
  | ImageBlock
  | GalleryBlock
  | CtaBlock
  | LogoStripBlock
  | QuoteBlock
  | HtmlBlock
  | PodcastBlock
  | CoachesBlock
  | ClassHeroBlock
  | ClassInfoBlock
  | PillarsBlock
  | ClassBookingBlock
  | ClassCoachBlock
  | FaqBlock;

export type BlockType = Block["type"];

// ---------------------------------------------------------------------------
// SEO model
// ---------------------------------------------------------------------------
// `PageSeo` is stored on each page's JSON (the `seo` field). Older stored copies
// only have { title, description }; every richer field is optional so existing
// pages keep validating and progressively gain data as the SEO editor saves.
export type RobotsIndex = "index" | "noindex";
export type RobotsFollow = "follow" | "nofollow";

export type SocialMeta = {
  title?: string;
  description?: string;
  image?: string; // absolute URL or site-relative path (e.g. /image/og.jpg)
};

export type SchemaType =
  | "none"
  | "Organization"
  | "LocalBusiness"
  | "Article"
  | "Product"
  | "FAQPage"
  | "Event";

// Free-form key/value bag for the schema builder. We keep it loose so the same
// editor can drive every schema type without a separate type per shape; the
// JSON-LD generator (lib/seo.ts) reads the keys it needs per `type`.
export type PageSchema = {
  type: SchemaType;
  data?: Record<string, string>;
  faq?: { question: string; answer: string }[];
};

export type PageSeo = {
  title?: string;
  description?: string;
  focusKeyword?: string;
  canonical?: string;
  robotsIndex?: RobotsIndex;
  robotsFollow?: RobotsFollow;
  og?: SocialMeta;
  twitter?: SocialMeta;
  schema?: PageSchema;
};

export type PageContent = {
  slug: string;
  title: string;
  path: string;
  cssFiles?: string[];
  seo: PageSeo;
  blocks: Block[];
};

export type PageSummary = {
  slug: string;
  title: string;
  path: string;
  blockCount: number;
};

export async function getPage(slug: string): Promise<PageContent | null> {
  return tryReadJson<PageContent>(`pages/${slug}.json`);
}

export async function setPage(slug: string, page: PageContent): Promise<void> {
  await writeJson(`pages/${slug}.json`, page);
}

/** Update only the SEO block of a page, leaving title/blocks untouched. */
export async function setPageSeo(
  slug: string,
  seo: PageSeo
): Promise<PageContent | null> {
  const page = await getPage(slug);
  if (!page) return null;
  const next: PageContent = { ...page, seo };
  await setPage(slug, next);
  return next;
}

// ---------------------------------------------------------------------------
// Global SEO settings (site-wide defaults + analytics + organization schema)
// ---------------------------------------------------------------------------
export type SeoSettings = {
  siteUrl: string; // canonical origin, no trailing slash
  titleTemplate: string; // "%s" is replaced with the page title
  defaultTitle: string; // used when a page has no SEO title
  defaultDescription: string;
  defaultOgImage: string; // absolute or site-relative
  twitterHandle: string; // "@athletix"
  analytics: {
    gaId?: string; // G-XXXXXXX
    gtmId?: string; // GTM-XXXXXXX
    googleVerification?: string; // search console token
  };
  organization: {
    name: string;
    logo: string;
    sameAs: string[]; // social profile URLs
  };
};

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://athletix.com.au",
  titleTemplate: "%s | ATHLETIX",
  defaultTitle:
    "ATHLETIX — Train Like an Athlete | Brisbane Strength & Conditioning",
  defaultDescription:
    "Elite strength and conditioning in Fortitude Valley, Brisbane. Small group classes, athlete programs, allied health and NDIS support.",
  defaultOgImage: "/image/athlethix-logo.png",
  twitterHandle: "@athletix_gym",
  analytics: {},
  organization: {
    name: "ATHLETIX",
    logo: "/image/athlethix-logo.png",
    sameAs: [
      "https://www.instagram.com/athletix_gym/",
      "https://www.facebook.com/ATHLETIX.BRISBANE/",
    ],
  },
};

/** Read global SEO settings, merged over defaults so new fields never break. */
export async function getSeoSettings(): Promise<SeoSettings> {
  const stored = await tryReadJson<Partial<SeoSettings>>("seo-settings.json");
  if (!stored) return DEFAULT_SEO_SETTINGS;
  return {
    ...DEFAULT_SEO_SETTINGS,
    ...stored,
    analytics: { ...DEFAULT_SEO_SETTINGS.analytics, ...stored.analytics },
    organization: {
      ...DEFAULT_SEO_SETTINGS.organization,
      ...stored.organization,
    },
  };
}

export const setSeoSettings = (s: SeoSettings) =>
  writeJson("seo-settings.json", s);

// ---------------------------------------------------------------------------
// Path-keyed SEO overrides
// ---------------------------------------------------------------------------
// Every site route — including hardcoded React pages that aren't block-based —
// can have its SEO managed from the dashboard. Overrides are stored in one map
// keyed by route path ("/contact-us", "/our-gym", "/"). A page's own static
// metadata stays as the fallback until an override exists, so nothing is lost.
export type SeoOverrides = Record<string, PageSeo>;

export async function getSeoOverrides(): Promise<SeoOverrides> {
  return (await tryReadJson<SeoOverrides>("seo-overrides.json")) ?? {};
}

export async function getSeoOverride(path: string): Promise<PageSeo | null> {
  const all = await getSeoOverrides();
  return all[path] ?? null;
}

export async function setSeoOverride(
  path: string,
  seo: PageSeo
): Promise<void> {
  const all = await getSeoOverrides();
  all[path] = seo;
  await writeJson("seo-overrides.json", all);
}

export async function listPages(): Promise<PageSummary[]> {
  const keys = await listJsonKeys("pages");
  const seen = new Set<string>();
  const out: PageSummary[] = [];
  for (const key of keys) {
    const slug = key.replace(/^pages\//, "").replace(/\.json$/, "");
    if (seen.has(slug)) continue;
    seen.add(slug);
    const page = await tryReadJson<PageContent>(`pages/${slug}.json`);
    if (page) {
      out.push({
        slug: page.slug,
        title: page.title,
        path: page.path,
        blockCount: page.blocks.length,
      });
    }
  }
  return out.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPublishedBlog(): Promise<BlogPost[]> {
  const all = await getBlog();
  return all
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getBlog();
  return all.find((p) => p.slug === slug) ?? null;
}
