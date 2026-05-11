import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export type SiteContent = {
  announce: string;
  meta: { title: string; description: string };
  hero: {
    pill: string;
    lede: string;
    rotatingWords: string[];
    stats: { value: number; label: string; plus: boolean }[];
  };
  manifesto: { eyebrow: string; heading: string; body: string };
  team: { heading: string; sub: string };
  trial: { heading: string; body: string };
  contact: { phone: string; email: string; address: string; areas: string };
};

export type Coach = {
  id: string;
  name: string;
  displayName: string;
  role: string;
  image: string;
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

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(dataDir, file), "utf8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  const target = path.join(dataDir, file);
  await fs.writeFile(target, JSON.stringify(data, null, 2) + "\n", "utf8");
}

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
