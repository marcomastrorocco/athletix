import type { Block, BlockType } from "@/lib/data";

function id(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export const BLOCK_LABELS: Record<BlockType, string> = {
  pageBanner: "Page Banner (hero)",
  richText: "Rich Text",
  video: "Video Embed",
  numberedList: "Numbered List",
  featureGrid: "Feature Grid",
  stats: "Stats Row",
  imageBlock: "Image Block",
  gallery: "Gallery Strip",
  cta: "Call to Action",
  logoStrip: "Logo Strip",
  quote: "Pull Quote",
  html: "Raw HTML",
  podcast: "Podcast Feature",
  coaches: "Coaches Grid",
  classHero: "Class Hero",
  classInfo: "Class Info Cards",
  pillars: "Pillars Grid",
  classBooking: "Class Booking Form",
  classCoach: "Class Coach",
  faq: "FAQ Accordion",
};

export function blockDefaults(type: BlockType): Block {
  switch (type) {
    case "pageBanner":
      return {
        type: "pageBanner",
        id: id("banner"),
        title: "TITLE",
        titleAccent: "",
        lede: "Add a short description here.",
        crumbs: [{ label: "Home", href: "/" }],
      };
    case "richText":
      return {
        type: "richText",
        id: id("text"),
        heading: "",
        body: "Write your content here. **Markdown** is supported.",
      };
    case "video":
      return {
        type: "video",
        id: id("video"),
        heading: "",
        lede: "",
        embedUrl: "",
      };
    case "numberedList":
      return {
        type: "numberedList",
        id: id("steps"),
        items: [{ num: "01", title: "First", body: "Body" }],
      };
    case "featureGrid":
      return {
        type: "featureGrid",
        id: id("features"),
        items: [{ icon: "★", title: "Feature", desc: "Description" }],
      };
    case "stats":
      return {
        type: "stats",
        id: id("stats"),
        items: [{ value: "0", label: "Label" }],
      };
    case "imageBlock":
      return {
        type: "imageBlock",
        id: id("image"),
        image: "",
        imageAlt: "",
      };
    case "gallery":
      return {
        type: "gallery",
        id: id("gallery"),
        images: [],
      };
    case "cta":
      return {
        type: "cta",
        id: id("cta"),
        heading: "Call to action heading",
        body: "Body copy.",
        buttonLabel: "Learn more",
        buttonHref: "/",
      };
    case "logoStrip":
      return {
        type: "logoStrip",
        id: id("logos"),
        heading: "Trusted by",
        logos: [],
      };
    case "quote":
      return {
        type: "quote",
        id: id("quote"),
        text: "Quote text.",
      };
    case "html":
      return {
        type: "html",
        id: id("html"),
        html: "<!-- Raw HTML -->",
      };
    case "podcast":
      return {
        type: "podcast",
        id: id("podcast"),
        tag: "FEATURED",
        title: "Title",
        body: "Body",
        primaryLabel: "Listen",
        primaryHref: "#",
        logos: [],
      };
    case "coaches":
      return {
        type: "coaches",
        id: id("coaches"),
        eyebrow: "Our Team",
        headingTop: "Our Elite",
        headingBottom: "Coaches.",
        body: "",
      };
    case "classHero":
      return {
        type: "classHero",
        id: id("class-hero"),
        eyebrow: "Class · All levels",
        title: "Class title",
        lead: "Short description of this class.",
        primaryBtn: { label: "Book a trial", href: "#book-form" },
        secondaryBtn: { label: "View timetable", href: "/class-timetable" },
        image: "",
        imageAlt: "",
        badge: "",
      };
    case "classInfo":
      return {
        type: "classInfo",
        id: id("class-info"),
        cards: [
          {
            icon: "📍",
            title: "Location",
            body: "<a href=\"https://goo.gl/maps/Nb2DQqvUifWCHuPt7\" target=\"_blank\" rel=\"noopener\">42 Baxter Street<br/>Fortitude Valley, QLD 4006</a>",
          },
          {
            icon: "⏱",
            title: "Working hours",
            variant: "hours",
            body: "<ul class=\"yaf-hours\"><li><span class=\"yaf-day\">Mon</span><span>6:00 AM – 7:30 PM</span></li><li><span class=\"yaf-day\">Tue</span><span>6:00 AM – 7:30 PM</span></li><li><span class=\"yaf-day\">Wed</span><span>5:15 AM – 7:30 PM</span></li><li><span class=\"yaf-day\">Thu</span><span>6:00 AM – 7:30 PM</span></li><li><span class=\"yaf-day\">Fri</span><span>5:15 AM – 6:00 PM</span></li><li><span class=\"yaf-day\">Sat</span><span>6:00 AM – 11:00 AM</span></li></ul>",
          },
          {
            icon: "☎",
            title: "Contact",
            body: "<a href=\"tel:0499981286\">0499 981 286</a><br/><a href=\"mailto:info@athletix.com.au\">info@athletix.com.au</a>",
          },
        ],
      };
    case "pillars":
      return {
        type: "pillars",
        id: id("pillars"),
        eyebrow: "Why train here",
        heading: "Section heading",
        sub: "Optional sub-heading.",
        items: [
          { n: "01", title: "Pillar one", body: "Description." },
          { n: "02", title: "Pillar two", body: "Description." },
          { n: "03", title: "Pillar three", body: "Description." },
          { n: "04", title: "Pillar four", body: "Description." },
        ],
      };
    case "classBooking":
      return {
        type: "classBooking",
        id: id("booking"),
        sourceLabel: "Class page",
        defaultClass: "",
      };
    case "classCoach":
      return {
        type: "classCoach",
        id: id("class-coach"),
        heading: "Class coach",
        image: "",
        imageAlt: "",
        eyebrow: "Coach",
        name: "",
        bio: "",
        links: [
          { label: "Meet the team", href: "/our-team", style: "outline" },
        ],
      };
    case "faq":
      return {
        type: "faq",
        id: id("faq"),
        heading: "Frequently asked questions",
        sub: "",
        items: [{ q: "Question?", a: "Answer." }],
      };
  }
}
