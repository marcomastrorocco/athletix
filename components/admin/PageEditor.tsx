"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  ExternalLink,
  GripVertical,
} from "lucide-react";
import type { Block, BlockType, PageContent } from "@/lib/data";
import { showToast } from "./Toast";
import BlockFields from "./blocks/BlockFields";
import { BLOCK_LABELS, blockDefaults } from "./blocks/blockDefaults";
import LivePreview from "./LivePreview";

const BLOCK_OPTIONS: BlockType[] = [
  "pageBanner",
  "classHero",
  "classInfo",
  "pillars",
  "classBooking",
  "classCoach",
  "faq",
  "richText",
  "video",
  "numberedList",
  "featureGrid",
  "stats",
  "imageBlock",
  "gallery",
  "cta",
  "logoStrip",
  "quote",
  "podcast",
  "coaches",
  "html",
];

export default function PageEditor({ initial }: { initial: PageContent }) {
  const [page, setPage] = useState<PageContent>(initial);
  const [saving, setSaving] = useState(false);
  const [refreshToken, setRefreshToken] = useState(Date.now());
  const [showAdd, setShowAdd] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    for (const b of initial.blocks) o[b.id] = true;
    return o;
  });
  // Drag-and-drop reordering state. `dragEnabled` is only flipped on while the
  // grip handle is pressed so the card's inputs stay normally selectable.
  const [dragEnabled, setDragEnabled] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const resetDrag = () => {
    setDragEnabled(false);
    setDragIndex(null);
    setOverIndex(null);
  };

  const moveBlockTo = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    const arr = [...page.blocks];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setPage({ ...page, blocks: arr });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (res.ok) {
        showToast("Saved", "ok");
        setRefreshToken(Date.now());
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error || `Save failed (HTTP ${res.status})`, "err");
      }
    } catch (err) {
      showToast(`Network error: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  };

  const updateBlock = (i: number, next: Block) => {
    const arr = [...page.blocks];
    arr[i] = next;
    setPage({ ...page, blocks: arr });
  };

  const removeBlock = (i: number) => {
    if (!confirm("Remove this section?")) return;
    setPage({ ...page, blocks: page.blocks.filter((_, n) => n !== i) });
  };

  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= page.blocks.length) return;
    const arr = [...page.blocks];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setPage({ ...page, blocks: arr });
  };

  const addBlock = (t: BlockType) => {
    const b = blockDefaults(t);
    setPage({ ...page, blocks: [...page.blocks, b] });
    setOpen({ ...open, [b.id]: true });
    setShowAdd(false);
  };

  return (
    <div className="page-editor">
      <form onSubmit={save} className="page-editor-form">
        {/* SEO card */}
        <div className="card">
          <div className="head">
            <div className="icon-bg">
              <Search size={16} />
            </div>
            <div>
              <h2>SEO &amp; Page Meta</h2>
              <p className="muted" style={{ margin: 0 }}>
                Browser tab title and search-engine description for this page.
              </p>
            </div>
          </div>
          <div className="field">
            <label>Admin label</label>
            <input
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
            />
          </div>
          <div className="field">
            <label>SEO title (browser tab)</label>
            <input
              value={page.seo.title}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo: { ...page.seo, title: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label>SEO description</label>
            <textarea
              value={page.seo.description}
              rows={3}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo: { ...page.seo, description: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Blocks */}
        {page.blocks.map((b, i) => {
          const isOpen = open[b.id] !== false;
          return (
            <div
              key={b.id}
              className={`card block-card${
                overIndex === i && dragIndex !== null && dragIndex !== i
                  ? " drag-over"
                  : ""
              }${dragIndex === i ? " dragging" : ""}`}
              draggable={dragEnabled}
              onDragStart={(e) => {
                setDragIndex(i);
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(e) => {
                if (dragIndex === null) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (overIndex !== i) setOverIndex(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null) moveBlockTo(dragIndex, i);
                resetDrag();
              }}
              onDragEnd={resetDrag}
            >
              <div className="head block-head">
                <button
                  type="button"
                  className="block-drag"
                  aria-label="Drag to reorder"
                  title="Drag to reorder"
                  onMouseDown={() => setDragEnabled(true)}
                  onMouseUp={() => setDragEnabled(false)}
                >
                  <GripVertical size={16} />
                </button>
                <button
                  type="button"
                  className="block-toggle"
                  onClick={() => setOpen({ ...open, [b.id]: !isOpen })}
                  title={isOpen ? "Collapse" : "Expand"}
                >
                  {isOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <div className="icon-bg">
                  <Sparkles size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <h2>{BLOCK_LABELS[b.type]}</h2>
                  <p className="muted" style={{ margin: 0, fontSize: 12 }}>
                    Section #{i + 1}
                  </p>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  <button
                    type="button"
                    className="btn ghost sm"
                    onClick={() => moveBlock(i, -1)}
                    disabled={i === 0}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn ghost sm"
                    onClick={() => moveBlock(i, 1)}
                    disabled={i === page.blocks.length - 1}
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn ghost sm danger"
                    onClick={() => removeBlock(i)}
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="block-body">
                  <BlockFields
                    block={b}
                    set={(next) => updateBlock(i, next)}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Add block */}
        <div className="card">
          {!showAdd ? (
            <button
              type="button"
              className="btn primary"
              onClick={() => setShowAdd(true)}
            >
              <Plus size={16} /> Add a section
            </button>
          ) : (
            <>
              <h3 style={{ marginTop: 0 }}>Choose a section type</h3>
              <div className="block-picker-grid">
                {BLOCK_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="block-picker-card"
                    onClick={() => addBlock(t)}
                  >
                    <strong>{BLOCK_LABELS[t]}</strong>
                    <span className="muted">{t}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn ghost sm"
                onClick={() => setShowAdd(false)}
                style={{ marginTop: 12 }}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Save bar */}
        <div className="card save-bar">
          <div className="row">
            <a
              href={page.path}
              target="_blank"
              rel="noopener"
              className="btn ghost"
            >
              <ExternalLink size={14} /> View page
            </a>
            <div className="gap" />
            <button
              type="submit"
              className="btn primary"
              disabled={saving}
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </form>

      <aside className="page-editor-preview">
        <LivePreview path={page.path} refreshToken={refreshToken} />
      </aside>
    </div>
  );
}
