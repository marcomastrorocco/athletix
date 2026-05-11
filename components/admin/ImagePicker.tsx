"use client";

import { useRef, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { showToast } from "./Toast";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImagePicker({ value, onChange, label = "Image" }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        showToast(data.error || "Upload failed", "err");
        return;
      }
      onChange(data.url);
      showToast("Uploaded", "ok");
    } finally {
      setBusy(false);
    }
  };

  const onFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (f) upload(f);
  };

  return (
    <div className="img-picker">
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </label>
      <div
        className="preview-img"
        style={value ? { backgroundImage: `url(${value})`, borderStyle: "solid" } : undefined}
      >
        {!value && (
          <span>
            <ImageIcon size={20} />
            <br />
            No image
          </span>
        )}
      </div>
      <div
        className={`dropzone${over ? " over" : ""}`}
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
        <Upload />
        {busy ? "Uploading..." : "Drop image here or click to upload"}
        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>
      <div className="actions">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/foo.jpg or /image/..."
        />
        {value && (
          <button
            type="button"
            className="btn ghost sm"
            onClick={() => onChange("")}
            title="Clear"
          >
            <X />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
