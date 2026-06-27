// AUTO-GENERATED registry of every SEO-managed site route.
// `source` tells the resolver/admin where a page's live default comes from:
//   static    → defaultTitle/defaultDescription below (former hardcoded metadata)
//   home      → site.json meta (edited at /admin/site)
//   page-json → the block page's own seo field (data/pages/<slug>.json)
// Dashboard overrides (data/seo-overrides.json) win over all of these.

export type SeoPageSource = "static" | "home" | "page-json";

// Display groups for the SEO Manager list (collapsible sections). Order here is
// the order the groups render in.
export const SEO_GROUPS = [
  "Main Pages",
  "Classes & Programs",
  "Class Types",
  "Youth",
] as const;
export type SeoGroup = (typeof SEO_GROUPS)[number];

export type SeoPage = {
  slug: string;
  path: string;
  label: string;
  source: SeoPageSource;
  group: SeoGroup;
  defaultTitle?: string;
  defaultDescription?: string;
};

export const SEO_PAGES: SeoPage[] = [
  { slug: "about", path: "/about-us", label: "About Us", source: "page-json", group: "Main Pages" },
  { slug: "adult-classes", path: "/adult-classes", label: "Adult Classes", source: "static", group: "Classes & Programs", defaultTitle: "Strength & Conditioning Group Classes & Coaching Brisbane - ATHLETIX Gym",
    defaultDescription: "ATHLETIX offers small group fitness classes and training in Brisbane including Pilates · Circuit Training · HIIT · Weightlifting · Kettlebells · Boxing · Mobility · Strength & Conditioning for all ages including beginners, seniors, women and elderly. Get fit, lose weight with our group fitness training classes." },
  { slug: "allied-health", path: "/allied-health-staff", label: "Allied Health", source: "static", group: "Classes & Programs", defaultTitle: "Physiotherapist Brisbane, Dietitian & Nutritionist in Brisbane - ATHLETIX Gym",
    defaultDescription: "Athletix Allied Health Team including Sports Scientists to Physiotherapists and Nutritionists & Dieticians in Brisbane" },
  { slug: "athlete-programs", path: "/athletes-program", label: "Athlete Programs", source: "static", group: "Classes & Programs", defaultTitle: "Athlete Training Program Brisbane / Sports Performance Center - ATHLETIX Gym",
    defaultDescription: "High performance athletic hub and Athlete Training Programs in the heart of Brisbane." },
  { slug: "blog", path: "/blog", label: "Blog", source: "static", group: "Main Pages", defaultTitle: "Athletic Development Center S&C Coaches - ATHLETIX Blog",
    defaultDescription: "Read articles from our Strength and Conditioning coaches on topics such as Sports Rehab, Athlete training programs, functional fitness training and more..." },
  { slug: "careers", path: "/careers", label: "Careers", source: "static", group: "Main Pages", defaultTitle: "Careers - ATHLETIX",
    defaultDescription: "Coach, intern or grow with ATHLETIX. Roles for accredited S&C coaches, sports physiotherapists, exercise physiologists and university placement students in Brisbane." },
  { slug: "classes", path: "/classes", label: "Classes", source: "static", group: "Classes & Programs", defaultTitle: "Group Strength & Conditioning Classes Brisbane | ATHLETIX Gym",
    defaultDescription: "Group Strength & Conditioning fitness classes in Brisbane at ATHLETIX, Australia's premier strength & conditioning gym. Train like an Athlete!" },
  { slug: "contact", path: "/contact-us", label: "Contact", source: "static", group: "Main Pages", defaultTitle: "Contact Us - ATHLETIX",
    defaultDescription: "Book a trial, ask a question or visit Athletix at 42 Baxter Street, Fortitude Valley, Brisbane." },
  { slug: "family-classes", path: "/family-classes", label: "Family Classes", source: "static", group: "Classes & Programs", defaultTitle: "Adult & Youth Family Gym Membership Plans Brisbane - Save $ with ATHLETIX",
    defaultDescription: "Our family membership plans and passes allow families to train together or individually in group classes or by themselves and save money on their gym memberships. Up to 4 members can be included under one membership and prices start from $100 per week." },
  { slug: "hiit-push-and-drag", path: "/classes/hiit-push-and-drag", label: "HIIT Push & Drag", source: "static", group: "Class Types", defaultTitle: "Premier HIIT Class in Brisbane / Sled Push Workouts / Athletix Gym",
    defaultDescription: "Our HIIT Sled Push & Drag classes are designed for men and women who want to burn fat, push their limits, work every part of the body and get stronger. Fortitude Valley, Brisbane." },
  { slug: "home", path: "/", label: "Home", source: "home", group: "Main Pages" },
  { slug: "lift", path: "/classes/weightlifting", label: "LIFT", source: "page-json", group: "Class Types" },
  { slug: "mat-pilates", path: "/classes/mat-pilates", label: "Mat Pilates", source: "static", group: "Class Types", defaultTitle: "Top Mat Pilates Class Brisbane $7 Weekly Trial ATHLETIX Gym",
    defaultDescription: "Mat Pilates led by a certified Physiotherapist. Improve posture, core strength and muscle balance. A perfect low-impact option for desk workers or those recovering from high-intensity training." },
  { slug: "membership", path: "/memberships", label: "Membership", source: "static", group: "Main Pages", defaultTitle: "Gym Membership Prices / Cost Brisbane - ATHLETIX Gym",
    defaultDescription: "ATHLETIX is a high level Human Performance Center in the heart of Brisbane City. We combine high level coaching with Physiotherapy and Sports Rehab. Check out our gym membership options, costs and various plans from Adults, Youth to Athletes and Rehab/Recovery." },
  { slug: "met-con", path: "/classes/met-con", label: "Met-Con", source: "static", group: "Class Types", defaultTitle: "MET-CON Body Conditioning Class Brisbane | ATHLETIX Gym",
    defaultDescription: "A circuit body conditioning class meant to help you enhance metabolic rate and overall conditioning regardless of your starting fitness level." },
  { slug: "mobility", path: "/classes/mobility", label: "Mobility", source: "static", group: "Class Types", defaultTitle: "Mobility Class Brisbane - Flexibility & Movement Gym ATHLETIX",
    defaultDescription: "Mobility refers to exercises that improve range of motion and stabilise joints. Our science-based class builds flexibility and strength at the same time — for athletes and general populations." },
  { slug: "ndis-program", path: "/ndis-program", label: "NDIS Program", source: "static", group: "Classes & Programs", defaultTitle: "NDIS & DVA Training Program - ATHLETIX Gym Brisbane",
    defaultDescription: "Are you seeking an individualised and supportive approach to help you manage your condition and achieve your goals within your NDIS or DVA packages? Athletix is here to help." },
  { slug: "our-gym", path: "/our-gym", label: "Our Gym", source: "page-json", group: "Main Pages" },
  { slug: "our-team", path: "/our-team", label: "Our Team", source: "static", group: "Main Pages", defaultTitle: "Elite Strength & Conditioning Coaches Brisbane Personal Trainers - ATHLETIX Gym",
    defaultDescription: "ATHLETIX offers one-on-one personal training in Brisbane and strength and conditioning coaches who are experts in their field including Exercise and Sports Scientists to Physioterapists and Nutritionists. We have practical experience with elite athletes, general population, and clinical patients. We take the importance of personal fitness training in every stage of life (youth, young adults and mature adults) very seriously. Appropriate evidence-based protocols allow our Fitness Coaches to support the whole community to aspire and achieve a better physical development." },
  { slug: "strength-con", path: "/strength-con", label: "Strength & Conditioning", source: "static", group: "Class Types", defaultTitle: "Strength & Conditioning Class Brisbane | ATHLETIX Gym",
    defaultDescription: "A coach-led Strength & Conditioning class that builds real strength, power and resilience with structured programming — every level welcome." },
  { slug: "timetable", path: "/class-timetable", label: "Timetable", source: "static", group: "Main Pages", defaultTitle: "Class Timetable - ATHLETIX",
    defaultDescription: "Plan your week at Athletix Brisbane. Adult, youth, recovery and performance sessions seven days a week." },
  { slug: "youth-agility-development", path: "/classes/youth-agility-development", label: "Youth Agility Development", source: "static", group: "Youth", defaultTitle: "Youth Speed & Agility Training Classes - ATHLETIX Gym",
    defaultDescription: "With our speed and agility development classes, kids learn to move faster with confidence! Plyometrics, Change of Directions, Injury prevention drills for any team sports including cricket, rugby, netball, basketball, soccer and more..." },
  { slug: "youth-agility-foundations", path: "/classes/youth-agility-foundations", label: "Youth Agility Foundations", source: "static", group: "Youth", defaultTitle: "Youth Agility Foundations — ATHLETIX Brisbane",
    defaultDescription: "A class that merges physical fitness, injury prevention and linear/lateral speed for kids aged 7–11. Brisbane CBD location." },
  { slug: "youth-classes", path: "/youth-classes-2", label: "Youth Classes", source: "static", group: "Youth", defaultTitle: "Youth / Kids Gym - S&C Programs & Classes for Kids, Teenagers & Children Brisbane",
    defaultDescription: "Kids Gym Brisbane. Youth strength and conditioning and speed training programs and classes for kids, children and teenagers in Brisbane." },
  { slug: "youth-fitness-development", path: "/classes/youth-fitness-development", label: "Youth Fitness Development", source: "static", group: "Youth", defaultTitle: "Youth Strength Training Class Brisbane - ATHLETIX Gym",
    defaultDescription: "Youth Strength Development (12–16 yrs). Teens learn the foundations of strength and resistance training through a criteria-based, sequential program at ATHLETIX Brisbane." },
  { slug: "youth-fitness-foundations", path: "/classes/youth-fitness-foundations", label: "Youth Fitness Foundations", source: "static", group: "Youth", defaultTitle: "Youth Fitness Foundations — ATHLETIX Brisbane",
    defaultDescription: "Starter strength & conditioning program for Primary School aged kids (7–11). Build foundation skills, movement patterns and confidence for any sport. Fortitude Valley, Brisbane." },
  { slug: "youth-open-workout", path: "/youth-open-workout", label: "Youth Open Workout", source: "static", group: "Youth", defaultTitle: "Youth Open Workout Brisbane | ATHLETIX Gym",
    defaultDescription: "An invite-only training session for our youth athletes — supervised open training to refine skills, build strength and progress under the eye of an S&C coach." },
  { slug: "youth-speed-development", path: "/classes/youth-speed-development", label: "Youth Speed Development", source: "static", group: "Youth", defaultTitle: "Youth Speed / Sprint Development Classes | ATHLETIX Gym",
    defaultDescription: "Youth Speed Development (12–16 yrs). Learn the foundations of sprinting and acceleration with technical drills, physiological adaptations and injury-prevention work for court and field sports." },
  { slug: "youth-speed-foundation", path: "/classes/youth-speed-foundation", label: "Youth Speed Foundation", source: "static", group: "Youth", defaultTitle: "Youth Speed Foundation — ATHLETIX Brisbane",
    defaultDescription: "Learn the foundations of sprinting and acceleration for Primary School aged kids (7–11). Perfect the mechanics and improve speed — the pathway to our Speed Development class." },
];

export const seoPageByPath = (path: string): SeoPage | undefined =>
  SEO_PAGES.find((p) => p.path === path);

export const seoPageBySlug = (slug: string): SeoPage | undefined =>
  SEO_PAGES.find((p) => p.slug === slug);
