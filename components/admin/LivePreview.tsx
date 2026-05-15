"use client";

import { useRef, useState } from "react";
import { Monitor, Smartphone, RefreshCw, ExternalLink } from "lucide-react";

type Device = "desktop" | "mobile";

export default function LivePreview({
  path,
  refreshToken,
}: {
  path: string;
  refreshToken: number;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reload = () => {
    const f = iframeRef.current;
    if (f) f.src = `${path}?_t=${Date.now()}`;
  };

  return (
    <div className="live-preview">
      <div className="live-preview-bar">
        <div className="row" style={{ gap: 6 }}>
          <button
            type="button"
            className={`btn ghost sm${device === "desktop" ? " active" : ""}`}
            onClick={() => setDevice("desktop")}
            title="Desktop"
          >
            <Monitor size={14} />
          </button>
          <button
            type="button"
            className={`btn ghost sm${device === "mobile" ? " active" : ""}`}
            onClick={() => setDevice("mobile")}
            title="Mobile"
          >
            <Smartphone size={14} />
          </button>
        </div>
        <code style={{ fontSize: 11 }}>{path}</code>
        <div className="row" style={{ gap: 6 }}>
          <button
            type="button"
            className="btn ghost sm"
            onClick={reload}
            title="Refresh"
          >
            <RefreshCw size={14} />
          </button>
          <a
            href={path}
            target="_blank"
            rel="noopener"
            className="btn ghost sm"
            title="Open in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <div className={`live-preview-frame device-${device}`}>
        <iframe
          ref={iframeRef}
          key={refreshToken}
          src={`${path}?_t=${refreshToken}`}
          title="Live preview"
        />
      </div>
    </div>
  );
}
