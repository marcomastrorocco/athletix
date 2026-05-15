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
  }
}
