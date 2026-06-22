"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import {
  Save,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Tag as TagIcon,
  Search,
} from "lucide-react";
import { showToast } from "./Toast";
import ImagePicker from "./ImagePicker";
import SeoFields from "./seo/SeoFields";
import type { BlogPost, PageSeo } from "@/lib/data";

type Props = {
  initial?: BlogPost;
  mode: "create" | "edit";
  siteUrl: string;
};

const NO_SIGNALS = {
  hasH1: false,
  imagesTotal: 0,
  imagesWithAlt: 0,
  internalLinks: 0,
};

function defaultPost(): Partial<BlogPost> {
  return {
    title: "",
    excerpt: "",
    image: "",
    category: "General",
    readTime: "3 min read",
    date: new Date().toISOString().slice(0, 10),
    published: false,
    body: "",
    author: "",
    tags: [],
  };
}

export default function BlogEditor({ initial, mode, siteUrl }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<Partial<BlogPost>>(initial ?? defaultPost());
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) =>
    setPost((p) => ({ ...p, [key]: value }));

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    const payload: Partial<BlogPost> = {
      ...post,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const url =
      mode === "create"
        ? "/api/admin/blog"
        : `/api/admin/blog/${initial?.slug}`;
    const method = mode === "create" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      showToast("Save failed", "err");
      return;
    }
    const saved = (await res.json()) as BlogPost;
    showToast(mode === "create" ? "Post created" : "Post saved", "ok");
    if (mode === "create") {
      router.push(`/admin/blog/${saved.slug}`);
    } else {
      router.refresh();
    }
  };

  const remove = async () => {
    if (!initial) return;
    if (!confirm("Delete this post permanently?")) return;
    const res = await fetch(`/api/admin/blog/${initial.slug}`, {
      method: "DELETE",
    });
    if (!res.ok) return showToast("Delete failed", "err");
    showToast("Post deleted", "ok");
    router.push("/admin/blog");
    router.refresh();
  };

  // Cmd/Ctrl + S to save
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, tagsInput]);

  const previewHtml = useMemo(() => {
    try {
      return marked.parse(post.body || "_Nothing yet._", {
        breaks: true,
        async: false,
      }) as string;
    } catch {
      return "<p>Preview unavailable.</p>";
    }
  }, [post.body]);

  const wordCount = (post.body || "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <form onSubmit={submit}>
      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <TagIcon size={16} />
          </div>
          <div>
            <h2>Article basics</h2>
            <p className="muted" style={{ margin: 0 }}>
              Title, excerpt, taxonomy.
            </p>
          </div>
          <div className="gap" />
          <span className="badge">{wordCount} words</span>
          <span className={`badge ${post.published ? "live" : "draft"}`}>
            <span className="dot" />
            {post.published ? "Published" : "Draft"}
          </span>
        </div>

        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={post.title || ""}
            onChange={(e) => update("title", e.target.value)}
            required
            placeholder="Why barbells beat machines"
          />
        </div>

        <div className="field">
          <label>Excerpt</label>
          <textarea
            value={post.excerpt || ""}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={2}
            placeholder="Short description shown on the blog list"
          />
        </div>

        <div className="field-row-3">
          <div className="field">
            <label>Category</label>
            <input
              type="text"
              value={post.category || ""}
              onChange={(e) => update("category", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Read time</label>
            <input
              type="text"
              value={post.readTime || ""}
              onChange={(e) => update("readTime", e.target.value)}
              placeholder="5 min read"
            />
          </div>
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={post.date || ""}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Author</label>
            <input
              type="text"
              value={post.author || ""}
              onChange={(e) => update("author", e.target.value)}
              placeholder="e.g. Marco Mastrorocco"
            />
          </div>
          <div className="field">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="strength, programming, beginners"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <Eye size={16} />
          </div>
          <div>
            <h2>Cover image</h2>
            <p className="muted" style={{ margin: 0 }}>
              Drag, drop or pick a URL.
            </p>
          </div>
        </div>
        <ImagePicker
          value={post.image || ""}
          onChange={(v) => update("image", v)}
          label="Cover image"
        />
      </div>

      <div className="editor-split">
        <div className="card">
          <div className="head">
            <div className="icon-bg">
              <EyeOff size={16} />
            </div>
            <div>
              <h2>Markdown</h2>
              <p className="muted" style={{ margin: 0 }}>
                Use <code>##</code>, <code>**bold**</code>, <code>[link](url)</code>.
              </p>
            </div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <textarea
              value={post.body || ""}
              onChange={(e) => update("body", e.target.value)}
              rows={20}
              placeholder="## Introduction&#10;&#10;Write your post here..."
            />
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="head">
              <div className="icon-bg">
                <Eye size={16} />
              </div>
              <div>
                <h2>Live preview</h2>
                <p className="muted" style={{ margin: 0 }}>
                  Updates as you type.
                </p>
              </div>
            </div>
          </div>
          <div className="preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      </div>

      <div className="card">
        <div className="head">
          <div className="icon-bg">
            <Search size={16} />
          </div>
          <div>
            <h2>SEO</h2>
            <p className="muted" style={{ margin: 0 }}>
              Search title, description, social card &amp; schema. Blank fields
              fall back to the title, excerpt and cover image.
            </p>
          </div>
        </div>
        <SeoFields
          seo={post.seo ?? {}}
          onChange={(next) => update("seo", next as PageSeo)}
          path={`/blog/${initial?.slug ?? "post"}`}
          siteUrl={siteUrl}
          defaults={{
            title: post.title ? `${post.title} — ATHLETIX Blog` : undefined,
            description: post.excerpt || undefined,
            ogImage: post.image || undefined,
          }}
          signals={NO_SIGNALS}
          analyzeContent={false}
        />
      </div>

      <div className="card">
        <div className="row">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: 0,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <input
              type="checkbox"
              checked={!!post.published}
              onChange={(e) => update("published", e.target.checked)}
            />
            Published (visible on /blog)
          </label>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>
            Tip: ⌘/Ctrl + S to save
          </span>
          <div className="gap" />
          {mode === "edit" && (
            <button type="button" className="btn danger" onClick={remove}>
              <Trash2 />
              Delete
            </button>
          )}
          {mode === "edit" && initial && (
            <a
              href={`/blog/${initial.slug}`}
              target="_blank"
              rel="noopener"
              className="btn"
            >
              <ExternalLink />
              View live
            </a>
          )}
          <button type="submit" className="btn primary" disabled={saving}>
            <Save />
            {saving ? "Saving..." : mode === "create" ? "Create post" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
