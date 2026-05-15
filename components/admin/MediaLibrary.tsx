"use client";

import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  Copy,
  Search,
  Edit3,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { showToast } from "./Toast";

type MediaItem = {
  name: string;
  url: string;
  size: number;
  mtime: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/media");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        showToast("Uploaded", "ok");
        await load();
      } else {
        const data = await res.json();
        showToast(data.error || "Upload failed", "err");
      }
    } finally {
      setBusy(false);
    }
  };

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    for (const f of Array.from(files)) {
      await upload(f);
    }
  };

  const isUpload = (item: MediaItem) => item.url.startsWith("/uploads/");

  const remove = async (item: MediaItem) => {
    if (!isUpload(item)) {
      showToast("Only /uploads files can be deleted", "err");
      return;
    }
    if (!confirm(`Delete ${item.name}?`)) return;
    const res = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: item.name }),
    });
    if (res.ok) {
      showToast("Deleted", "ok");
      setSelected(null);
      await load();
    } else {
      const data = await res.json();
      showToast(data.error || "Delete failed", "err");
    }
  };

  const rename = async (item: MediaItem) => {
    if (!isUpload(item)) {
      showToast("Only /uploads files can be renamed", "err");
      return;
    }
    const to = prompt("New filename:", item.name);
    if (!to || to === item.name) return;
    const res = await fetch("/api/admin/media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: item.name, to }),
    });
    if (res.ok) {
      showToast("Renamed", "ok");
      setSelected(null);
      await load();
    } else {
      const data = await res.json();
      showToast(data.error || "Rename failed", "err");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("URL copied", "ok");
  };

  const filtered = items.filter((it) =>
    q ? it.name.toLowerCase().includes(q.toLowerCase()) : true
  );

  return (
    <>
      <div
        className={`media-dropzone${over ? " over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          onFiles(e.dataTransfer.files);
        }}
        onClick={() => input.current?.click()}
      >
        <Upload size={18} />
        {busy ? "Uploading..." : "Drop images here or click to upload"}
        <input
          ref={input}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      <div className="media-toolbar">
        <div className="media-search">
          <Search size={14} />
          <input
            placeholder="Search filenames..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="muted" style={{ fontSize: 12 }}>
          {filtered.length} of {items.length} images
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="muted">No images found.</p>
      ) : (
        <div className="media-grid">
          {filtered.map((it) => (
            <button
              type="button"
              key={it.url}
              className="media-tile"
              onClick={() => setSelected(it)}
            >
              <div
                className="media-thumb"
                style={{ backgroundImage: `url(${it.url})` }}
              />
              <div className="media-meta">
                <span className="media-name" title={it.name}>
                  {it.name}
                </span>
                <span className="muted" style={{ fontSize: 11 }}>
                  {formatSize(it.size)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="media-modal" onClick={() => setSelected(null)}>
          <div
            className="media-modal-body"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="media-modal-close"
              onClick={() => setSelected(null)}
              title="Close"
            >
              <X size={16} />
            </button>
            <div className="media-modal-preview">
              {selected.url ? (
                <img src={selected.url} alt={selected.name} />
              ) : (
                <ImageIcon />
              )}
            </div>
            <div className="media-modal-info">
              <h3>{selected.name}</h3>
              <p className="muted" style={{ fontSize: 12 }}>
                <code>{selected.url}</code>
              </p>
              <p className="muted" style={{ fontSize: 12 }}>
                {formatSize(selected.size)} ·{" "}
                {new Date(selected.mtime).toLocaleString()}
              </p>
              <div className="row" style={{ gap: 8, marginTop: 12 }}>
                <button
                  type="button"
                  className="btn ghost sm"
                  onClick={() => copyUrl(selected.url)}
                >
                  <Copy size={14} /> Copy URL
                </button>
                {isUpload(selected) && (
                  <>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => rename(selected)}
                    >
                      <Edit3 size={14} /> Rename
                    </button>
                    <button
                      type="button"
                      className="btn ghost sm danger"
                      onClick={() => remove(selected)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </>
                )}
              </div>
              {!isUpload(selected) && (
                <p className="muted" style={{ fontSize: 11, marginTop: 12 }}>
                  This image is bundled in <code>/public/image/</code>. Only
                  files in <code>/uploads/</code> can be renamed or deleted
                  from here.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
