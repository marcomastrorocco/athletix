import {
  readJson,
  writeJson,
  tryReadJson,
  listJsonKeys,
} from "./storage";

export type Btn = { label: string; href: string };
export type ImgRef = { src: string; alt: string };
export type NL = { n: string; l: string }; // number + label
export type KV = { val: string; lbl: string }; // value + label (credentials)

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
export type TimetableData = {
  days: string[];
  rows: { time: string; cells: TimetableCell[] }[];
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

export const getSite = () => readJson<SiteContent>("site.json");
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
};

export type CoachesBlock = {
  type: "coaches";
  id: string;
  eyebrow?: string;
  headingTop: string;
  headingBottom: string;
  body: string;
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
  | CoachesBlock;

export type BlockType = Block["type"];

export type PageContent = {
  slug: string;
  title: string;
  path: string;
  cssFiles?: string[];
  seo: { title: string; description: string };
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
