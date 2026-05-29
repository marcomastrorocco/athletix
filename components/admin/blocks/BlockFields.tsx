"use client";

import { Plus, Trash2 } from "lucide-react";
import type {
  Block,
  PageBannerBlock,
  RichTextBlock,
  VideoBlock,
  NumberedListBlock,
  FeatureGridBlock,
  StatsBlock,
  ImageBlock,
  GalleryBlock,
  CtaBlock,
  LogoStripBlock,
  QuoteBlock,
  HtmlBlock,
  PodcastBlock,
  CoachesBlock,
  ClassHeroBlock,
  ClassInfoBlock,
  ClassInfoCard,
  PillarsBlock,
  ClassBookingBlock,
  ClassCoachBlock,
  ClassCoachLink,
  FaqBlock,
} from "@/lib/data";
import ImagePicker from "../ImagePicker";

type Setter<T> = (next: T) => void;

function TextField({
  label,
  value,
  onChange,
  multiline,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          rows={rows ?? 3}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function ListEditor<T>({
  items,
  onChange,
  newItem,
  render,
  label,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  newItem: () => T;
  render: (item: T, idx: number, update: (next: T) => void) => React.ReactNode;
  label: string;
}) {
  const update = (i: number, next: T) => {
    const arr = [...items];
    arr[i] = next;
    onChange(arr);
  };
  const remove = (i: number) => onChange(items.filter((_, n) => n !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const arr = [...items];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  };
  return (
    <div className="list-editor">
      {items.map((item, i) => (
        <div key={i} className="list-row">
          <div className="list-row-head">
            <span className="muted" style={{ fontSize: 11 }}>
              {label} #{i + 1}
            </span>
            <div className="row" style={{ gap: 6 }}>
              <button
                type="button"
                className="btn ghost sm"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                title="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                className="btn ghost sm"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                title="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                className="btn ghost sm danger"
                onClick={() => remove(i)}
                title="Remove"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="list-row-body">
            {render(item, i, (next) => update(i, next))}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn ghost sm"
        onClick={() => onChange([...items, newItem()])}
      >
        <Plus size={14} /> Add {label.toLowerCase()}
      </button>
    </div>
  );
}

function PageBannerFields({
  block,
  set,
}: {
  block: PageBannerBlock;
  set: Setter<PageBannerBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Title"
          value={block.title}
          onChange={(v) => set({ ...block, title: v })}
        />
        <TextField
          label="Title accent (yellow word)"
          value={block.titleAccent ?? ""}
          onChange={(v) => set({ ...block, titleAccent: v })}
        />
      </div>
      <TextField
        label="Lede"
        multiline
        value={block.lede}
        onChange={(v) => set({ ...block, lede: v })}
      />
      <div className="field">
        <label>Variant</label>
        <select
          value={block.variant ?? "default"}
          onChange={(e) =>
            set({ ...block, variant: e.target.value as "default" | "about" })
          }
        >
          <option value="default">Default</option>
          <option value="about">About (large hero)</option>
        </select>
      </div>
      <div className="field">
        <label>Breadcrumbs</label>
        <ListEditor
          items={block.crumbs ?? []}
          onChange={(crumbs) => set({ ...block, crumbs })}
          newItem={() => ({ label: "", href: "" })}
          label="Crumb"
          render={(c, _i, upd) => (
            <div className="field-row">
              <TextField
                label="Label"
                value={c.label}
                onChange={(v) => upd({ ...c, label: v })}
              />
              <TextField
                label="Href (leave empty for current page)"
                value={c.href}
                onChange={(v) => upd({ ...c, href: v })}
              />
            </div>
          )}
        />
      </div>
    </>
  );
}

function RichTextFields({
  block,
  set,
}: {
  block: RichTextBlock;
  set: Setter<RichTextBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Eyebrow (small label)"
          value={block.eyebrow ?? ""}
          onChange={(v) => set({ ...block, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
        />
      </div>
      <div className="field">
        <label>Width</label>
        <select
          value={block.width ?? "narrow"}
          onChange={(e) =>
            set({ ...block, width: e.target.value as "narrow" | "wide" })
          }
        >
          <option value="narrow">Narrow (about 720px)</option>
          <option value="wide">Wide (full container)</option>
        </select>
      </div>
      <TextField
        label="Body (Markdown supported)"
        multiline
        rows={10}
        value={block.body}
        onChange={(v) => set({ ...block, body: v })}
      />
    </>
  );
}

function VideoFields({
  block,
  set,
}: {
  block: VideoBlock;
  set: Setter<VideoBlock>;
}) {
  return (
    <>
      <TextField
        label="Eyebrow"
        value={block.eyebrow ?? ""}
        onChange={(v) => set({ ...block, eyebrow: v })}
      />
      <TextField
        label="Heading"
        value={block.heading ?? ""}
        onChange={(v) => set({ ...block, heading: v })}
      />
      <TextField
        label="Lede"
        multiline
        value={block.lede ?? ""}
        onChange={(v) => set({ ...block, lede: v })}
      />
      <TextField
        label="Embed URL (YouTube/Vimeo embed link)"
        value={block.embedUrl}
        onChange={(v) => set({ ...block, embedUrl: v })}
        placeholder="https://www.youtube.com/embed/..."
      />
    </>
  );
}

function NumberedListFields({
  block,
  set,
}: {
  block: NumberedListBlock;
  set: Setter<NumberedListBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Eyebrow"
          value={block.eyebrow ?? ""}
          onChange={(v) => set({ ...block, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
        />
      </div>
      <ListEditor
        items={block.items}
        onChange={(items) => set({ ...block, items })}
        newItem={() => ({ num: "", title: "", body: "" })}
        label="Item"
        render={(it, _i, upd) => (
          <>
            <div className="field-row">
              <TextField
                label="Number"
                value={it.num}
                onChange={(v) => upd({ ...it, num: v })}
                placeholder="01"
              />
              <TextField
                label="Title"
                value={it.title}
                onChange={(v) => upd({ ...it, title: v })}
              />
            </div>
            <TextField
              label="Body (Markdown)"
              multiline
              rows={6}
              value={it.body}
              onChange={(v) => upd({ ...it, body: v })}
            />
          </>
        )}
      />
    </>
  );
}

function FeatureGridFields({
  block,
  set,
}: {
  block: FeatureGridBlock;
  set: Setter<FeatureGridBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Eyebrow"
          value={block.eyebrow ?? ""}
          onChange={(v) => set({ ...block, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
        />
      </div>
      <TextField
        label="Lede"
        multiline
        value={block.lede ?? ""}
        onChange={(v) => set({ ...block, lede: v })}
      />
      <ListEditor
        items={block.items}
        onChange={(items) => set({ ...block, items })}
        newItem={() => ({ icon: "", title: "", desc: "" })}
        label="Feature"
        render={(it, _i, upd) => (
          <>
            <div className="field-row">
              <TextField
                label="Icon (emoji or character)"
                value={it.icon}
                onChange={(v) => upd({ ...it, icon: v })}
              />
              <TextField
                label="Title"
                value={it.title}
                onChange={(v) => upd({ ...it, title: v })}
              />
            </div>
            <TextField
              label="Description"
              multiline
              value={it.desc}
              onChange={(v) => upd({ ...it, desc: v })}
            />
          </>
        )}
      />
    </>
  );
}

function StatsFields({
  block,
  set,
}: {
  block: StatsBlock;
  set: Setter<StatsBlock>;
}) {
  return (
    <ListEditor
      items={block.items}
      onChange={(items) => set({ ...block, items })}
      newItem={() => ({ value: "", label: "" })}
      label="Stat"
      render={(it, _i, upd) => (
        <div className="field-row">
          <TextField
            label="Value"
            value={it.value}
            onChange={(v) => upd({ ...it, value: v })}
          />
          <TextField
            label="Label"
            value={it.label}
            onChange={(v) => upd({ ...it, label: v })}
          />
        </div>
      )}
    />
  );
}

function ImageBlockFields({
  block,
  set,
}: {
  block: ImageBlock;
  set: Setter<ImageBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Eyebrow"
          value={block.eyebrow ?? ""}
          onChange={(v) => set({ ...block, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
        />
      </div>
      <TextField
        label="Lede"
        multiline
        value={block.lede ?? ""}
        onChange={(v) => set({ ...block, lede: v })}
      />
      <ImagePicker
        label="Image"
        value={block.image}
        onChange={(image) => set({ ...block, image })}
      />
      <TextField
        label="Alt text"
        value={block.imageAlt}
        onChange={(v) => set({ ...block, imageAlt: v })}
      />
    </>
  );
}

function GalleryFields({
  block,
  set,
}: {
  block: GalleryBlock;
  set: Setter<GalleryBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Eyebrow"
          value={block.eyebrow ?? ""}
          onChange={(v) => set({ ...block, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
        />
      </div>
      <ListEditor
        items={block.images}
        onChange={(images) => set({ ...block, images })}
        newItem={() => ({ src: "", alt: "" })}
        label="Image"
        render={(im, _i, upd) => (
          <>
            <ImagePicker
              label="Image"
              value={im.src}
              onChange={(src) => upd({ ...im, src })}
            />
            <TextField
              label="Alt text"
              value={im.alt}
              onChange={(v) => upd({ ...im, alt: v })}
            />
          </>
        )}
      />
    </>
  );
}

function CtaFields({ block, set }: { block: CtaBlock; set: Setter<CtaBlock> }) {
  return (
    <>
      <TextField
        label="Eyebrow"
        value={block.eyebrow ?? ""}
        onChange={(v) => set({ ...block, eyebrow: v })}
      />
      <TextField
        label="Heading (HTML allowed, e.g. <br/> and <span class='accent'>)"
        multiline
        value={block.heading}
        onChange={(v) => set({ ...block, heading: v })}
      />
      <TextField
        label="Body"
        multiline
        value={block.body}
        onChange={(v) => set({ ...block, body: v })}
      />
      <div className="field-row">
        <TextField
          label="Button label"
          value={block.buttonLabel}
          onChange={(v) => set({ ...block, buttonLabel: v })}
        />
        <TextField
          label="Button href"
          value={block.buttonHref}
          onChange={(v) => set({ ...block, buttonHref: v })}
        />
      </div>
      <ImagePicker
        label="Background image (optional)"
        value={block.bgImage ?? ""}
        onChange={(bgImage) => set({ ...block, bgImage })}
      />
    </>
  );
}

function LogoStripFields({
  block,
  set,
}: {
  block: LogoStripBlock;
  set: Setter<LogoStripBlock>;
}) {
  return (
    <>
      <TextField
        label="Heading"
        value={block.heading ?? ""}
        onChange={(v) => set({ ...block, heading: v })}
      />
      <TextField
        label="Tagline (Markdown supported)"
        multiline
        value={block.tagline ?? ""}
        onChange={(v) => set({ ...block, tagline: v })}
      />
      <ListEditor
        items={block.logos}
        onChange={(logos) => set({ ...block, logos })}
        newItem={() => ({ src: "", alt: "" })}
        label="Logo"
        render={(l, _i, upd) => (
          <>
            <ImagePicker
              label="Logo image"
              value={l.src}
              onChange={(src) => upd({ ...l, src })}
            />
            <TextField
              label="Alt text"
              value={l.alt}
              onChange={(v) => upd({ ...l, alt: v })}
            />
          </>
        )}
      />
      <TextField
        label="Quote (below logos, optional, Markdown)"
        multiline
        value={block.quote ?? ""}
        onChange={(v) => set({ ...block, quote: v })}
      />
    </>
  );
}

function QuoteFields({
  block,
  set,
}: {
  block: QuoteBlock;
  set: Setter<QuoteBlock>;
}) {
  return (
    <>
      <TextField
        label="Quote text"
        multiline
        value={block.text}
        onChange={(v) => set({ ...block, text: v })}
      />
      <TextField
        label="Cite (optional)"
        value={block.cite ?? ""}
        onChange={(v) => set({ ...block, cite: v })}
      />
    </>
  );
}

function HtmlFields({ block, set }: { block: HtmlBlock; set: Setter<HtmlBlock> }) {
  return (
    <TextField
      label="Raw HTML (use sparingly)"
      multiline
      rows={10}
      value={block.html}
      onChange={(v) => set({ ...block, html: v })}
    />
  );
}

function PodcastFields({
  block,
  set,
}: {
  block: PodcastBlock;
  set: Setter<PodcastBlock>;
}) {
  return (
    <>
      <TextField
        label="Tag (small uppercase label)"
        value={block.tag}
        onChange={(v) => set({ ...block, tag: v })}
      />
      <TextField
        label="Title"
        value={block.title}
        onChange={(v) => set({ ...block, title: v })}
      />
      <TextField
        label="Body (Markdown)"
        multiline
        value={block.body}
        onChange={(v) => set({ ...block, body: v })}
      />
      <div className="field-row">
        <TextField
          label="Primary button label"
          value={block.primaryLabel}
          onChange={(v) => set({ ...block, primaryLabel: v })}
        />
        <TextField
          label="Primary button href"
          value={block.primaryHref}
          onChange={(v) => set({ ...block, primaryHref: v })}
        />
      </div>
      <div className="field-row">
        <TextField
          label="Secondary button label (optional)"
          value={block.secondaryLabel ?? ""}
          onChange={(v) => set({ ...block, secondaryLabel: v })}
        />
        <TextField
          label="Secondary button href"
          value={block.secondaryHref ?? ""}
          onChange={(v) => set({ ...block, secondaryHref: v })}
        />
      </div>
    </>
  );
}

function CoachesFields({
  block,
  set,
}: {
  block: CoachesBlock;
  set: Setter<CoachesBlock>;
}) {
  return (
    <>
      <p className="muted" style={{ fontSize: 12, marginTop: 0 }}>
        Coach cards are pulled from the Team / Coaches admin page. Edit them
        there. Below is just the section heading.
      </p>
      <TextField
        label="Eyebrow (kicker)"
        value={block.eyebrow ?? ""}
        onChange={(v) => set({ ...block, eyebrow: v })}
      />
      <div className="field-row">
        <TextField
          label="Heading line 1"
          value={block.headingTop}
          onChange={(v) => set({ ...block, headingTop: v })}
        />
        <TextField
          label="Heading line 2"
          value={block.headingBottom}
          onChange={(v) => set({ ...block, headingBottom: v })}
        />
      </div>
      <TextField
        label="Body"
        multiline
        value={block.body}
        onChange={(v) => set({ ...block, body: v })}
      />
    </>
  );
}

function ClassHeroFields({
  block,
  set,
}: {
  block: ClassHeroBlock;
  set: Setter<ClassHeroBlock>;
}) {
  return (
    <>
      <TextField
        label="Eyebrow (small label above title)"
        value={block.eyebrow}
        onChange={(v) => set({ ...block, eyebrow: v })}
        placeholder="Strength · All levels"
      />
      <TextField
        label="Title"
        value={block.title}
        onChange={(v) => set({ ...block, title: v })}
      />
      <TextField
        label="Lead (multi-paragraph, Markdown supported)"
        multiline
        rows={8}
        value={block.lead}
        onChange={(v) => set({ ...block, lead: v })}
      />
      <div className="field-row">
        <TextField
          label="Primary button label"
          value={block.primaryBtn?.label ?? ""}
          onChange={(v) =>
            set({
              ...block,
              primaryBtn: { label: v, href: block.primaryBtn?.href ?? "" },
            })
          }
        />
        <TextField
          label="Primary button href"
          value={block.primaryBtn?.href ?? ""}
          onChange={(v) =>
            set({
              ...block,
              primaryBtn: { label: block.primaryBtn?.label ?? "", href: v },
            })
          }
        />
      </div>
      <div className="field-row">
        <TextField
          label="Secondary button label (optional)"
          value={block.secondaryBtn?.label ?? ""}
          onChange={(v) =>
            set({
              ...block,
              secondaryBtn: {
                label: v,
                href: block.secondaryBtn?.href ?? "",
              },
            })
          }
        />
        <TextField
          label="Secondary button href"
          value={block.secondaryBtn?.href ?? ""}
          onChange={(v) =>
            set({
              ...block,
              secondaryBtn: {
                label: block.secondaryBtn?.label ?? "",
                href: v,
              },
            })
          }
        />
      </div>
      <ImagePicker
        label="Hero image"
        value={block.image}
        onChange={(image) => set({ ...block, image })}
      />
      <TextField
        label="Image alt text"
        value={block.imageAlt}
        onChange={(v) => set({ ...block, imageAlt: v })}
      />
      <div className="field-row">
        <TextField
          label="Badge (corner label, optional)"
          value={block.badge ?? ""}
          onChange={(v) => set({ ...block, badge: v })}
          placeholder="Strength · Power"
        />
        <TextField
          label="Image frame background (CSS color, optional)"
          value={block.imageBackground ?? ""}
          onChange={(v) => set({ ...block, imageBackground: v })}
          placeholder="#0b0d10"
        />
      </div>
      <div className="field">
        <label
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={!!block.imageContain}
            onChange={(e) =>
              set({ ...block, imageContain: e.target.checked })
            }
          />
          Fit image inside frame (object-fit: contain)
        </label>
      </div>
    </>
  );
}

function ClassInfoFields({
  block,
  set,
}: {
  block: ClassInfoBlock;
  set: Setter<ClassInfoBlock>;
}) {
  return (
    <ListEditor
      items={block.cards}
      onChange={(cards) => set({ ...block, cards })}
      newItem={(): ClassInfoCard => ({ icon: "📍", title: "", body: "" })}
      label="Card"
      render={(c, _i, upd) => (
        <>
          <div className="field-row">
            <TextField
              label="Icon (emoji)"
              value={c.icon}
              onChange={(v) => upd({ ...c, icon: v })}
            />
            <TextField
              label="Title"
              value={c.title}
              onChange={(v) => upd({ ...c, title: v })}
            />
          </div>
          <TextField
            label="Body (Markdown or HTML)"
            multiline
            rows={5}
            value={c.body}
            onChange={(v) => upd({ ...c, body: v })}
          />
          <div className="field">
            <label>Variant</label>
            <select
              value={c.variant ?? "default"}
              onChange={(e) =>
                upd({
                  ...c,
                  variant: e.target.value as "default" | "hours",
                })
              }
            >
              <option value="default">Default</option>
              <option value="hours">Hours (taller card)</option>
            </select>
          </div>
        </>
      )}
    />
  );
}

function PillarsFields({
  block,
  set,
}: {
  block: PillarsBlock;
  set: Setter<PillarsBlock>;
}) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Eyebrow"
          value={block.eyebrow ?? ""}
          onChange={(v) => set({ ...block, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
        />
      </div>
      <TextField
        label="Sub-heading"
        multiline
        value={block.sub ?? ""}
        onChange={(v) => set({ ...block, sub: v })}
      />
      <ListEditor
        items={block.items}
        onChange={(items) => set({ ...block, items })}
        newItem={() => ({ n: "01", title: "", body: "" })}
        label="Pillar"
        render={(it, _i, upd) => (
          <>
            <div className="field-row">
              <TextField
                label="Number"
                value={it.n}
                onChange={(v) => upd({ ...it, n: v })}
                placeholder="01"
              />
              <TextField
                label="Title"
                value={it.title}
                onChange={(v) => upd({ ...it, title: v })}
              />
            </div>
            <TextField
              label="Body"
              multiline
              rows={4}
              value={it.body}
              onChange={(v) => upd({ ...it, body: v })}
            />
          </>
        )}
      />
    </>
  );
}

function ClassBookingFields({
  block,
  set,
}: {
  block: ClassBookingBlock;
  set: Setter<ClassBookingBlock>;
}) {
  return (
    <>
      <p className="muted" style={{ fontSize: 12, marginTop: 0 }}>
        Renders the standard 7-day trial booking form. Choose which class is
        pre-selected and what source label appears in the form submission.
      </p>
      <TextField
        label="Source label (for form analytics)"
        value={block.sourceLabel}
        onChange={(v) => set({ ...block, sourceLabel: v })}
        placeholder="Lift page"
      />
      <TextField
        label="Default class (must match a class option exactly)"
        value={block.defaultClass}
        onChange={(v) => set({ ...block, defaultClass: v })}
        placeholder="Lift"
      />
    </>
  );
}

function ClassCoachFields({
  block,
  set,
}: {
  block: ClassCoachBlock;
  set: Setter<ClassCoachBlock>;
}) {
  return (
    <>
      <TextField
        label="Section heading"
        value={block.heading ?? ""}
        onChange={(v) => set({ ...block, heading: v })}
        placeholder="Class coach"
      />
      <ImagePicker
        label="Coach photo"
        value={block.image}
        onChange={(image) => set({ ...block, image })}
      />
      <TextField
        label="Photo alt text"
        value={block.imageAlt}
        onChange={(v) => set({ ...block, imageAlt: v })}
      />
      <div className="field-row">
        <TextField
          label="Role (eyebrow above name)"
          value={block.eyebrow}
          onChange={(v) => set({ ...block, eyebrow: v })}
          placeholder="Strength Coach"
        />
        <TextField
          label="Coach name"
          value={block.name}
          onChange={(v) => set({ ...block, name: v })}
        />
      </div>
      <TextField
        label="Bio (Markdown)"
        multiline
        rows={5}
        value={block.bio}
        onChange={(v) => set({ ...block, bio: v })}
      />
      <div className="field">
        <label>Coach links / buttons</label>
        <ListEditor
          items={block.links}
          onChange={(links) => set({ ...block, links })}
          newItem={(): ClassCoachLink => ({ label: "", href: "", style: "outline" })}
          label="Link"
          render={(l, _i, upd) => (
            <>
              <div className="field-row">
                <TextField
                  label="Label"
                  value={l.label}
                  onChange={(v) => upd({ ...l, label: v })}
                />
                <TextField
                  label="Href"
                  value={l.href}
                  onChange={(v) => upd({ ...l, href: v })}
                />
              </div>
              <div className="field">
                <label>Style</label>
                <select
                  value={l.style}
                  onChange={(e) =>
                    upd({
                      ...l,
                      style: e.target.value as "outline" | "ghost",
                    })
                  }
                >
                  <option value="outline">Outline (primary)</option>
                  <option value="ghost">Ghost (subtle)</option>
                </select>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
}

function FaqFields({ block, set }: { block: FaqBlock; set: Setter<FaqBlock> }) {
  return (
    <>
      <div className="field-row">
        <TextField
          label="Heading"
          value={block.heading ?? ""}
          onChange={(v) => set({ ...block, heading: v })}
          placeholder="Frequently asked questions"
        />
        <TextField
          label="Sub-heading"
          value={block.sub ?? ""}
          onChange={(v) => set({ ...block, sub: v })}
        />
      </div>
      <ListEditor
        items={block.items}
        onChange={(items) => set({ ...block, items })}
        newItem={() => ({ q: "", a: "" })}
        label="Question"
        render={(it, _i, upd) => (
          <>
            <TextField
              label="Question"
              value={it.q}
              onChange={(v) => upd({ ...it, q: v })}
            />
            <TextField
              label="Answer (Markdown supported)"
              multiline
              rows={6}
              value={it.a}
              onChange={(v) => upd({ ...it, a: v })}
            />
          </>
        )}
      />
    </>
  );
}

export default function BlockFields({
  block,
  set,
}: {
  block: Block;
  set: (next: Block) => void;
}) {
  switch (block.type) {
    case "pageBanner":
      return (
        <PageBannerFields block={block} set={set as Setter<PageBannerBlock>} />
      );
    case "richText":
      return <RichTextFields block={block} set={set as Setter<RichTextBlock>} />;
    case "video":
      return <VideoFields block={block} set={set as Setter<VideoBlock>} />;
    case "numberedList":
      return (
        <NumberedListFields
          block={block}
          set={set as Setter<NumberedListBlock>}
        />
      );
    case "featureGrid":
      return (
        <FeatureGridFields
          block={block}
          set={set as Setter<FeatureGridBlock>}
        />
      );
    case "stats":
      return <StatsFields block={block} set={set as Setter<StatsBlock>} />;
    case "imageBlock":
      return (
        <ImageBlockFields block={block} set={set as Setter<ImageBlock>} />
      );
    case "gallery":
      return <GalleryFields block={block} set={set as Setter<GalleryBlock>} />;
    case "cta":
      return <CtaFields block={block} set={set as Setter<CtaBlock>} />;
    case "logoStrip":
      return (
        <LogoStripFields block={block} set={set as Setter<LogoStripBlock>} />
      );
    case "quote":
      return <QuoteFields block={block} set={set as Setter<QuoteBlock>} />;
    case "html":
      return <HtmlFields block={block} set={set as Setter<HtmlBlock>} />;
    case "podcast":
      return <PodcastFields block={block} set={set as Setter<PodcastBlock>} />;
    case "coaches":
      return <CoachesFields block={block} set={set as Setter<CoachesBlock>} />;
    case "classHero":
      return (
        <ClassHeroFields block={block} set={set as Setter<ClassHeroBlock>} />
      );
    case "classInfo":
      return (
        <ClassInfoFields block={block} set={set as Setter<ClassInfoBlock>} />
      );
    case "pillars":
      return <PillarsFields block={block} set={set as Setter<PillarsBlock>} />;
    case "classBooking":
      return (
        <ClassBookingFields
          block={block}
          set={set as Setter<ClassBookingBlock>}
        />
      );
    case "classCoach":
      return (
        <ClassCoachFields
          block={block}
          set={set as Setter<ClassCoachBlock>}
        />
      );
    case "faq":
      return <FaqFields block={block} set={set as Setter<FaqBlock>} />;
    default:
      return null;
  }
}
