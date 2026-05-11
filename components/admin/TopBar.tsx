"use client";

import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  const openCmd = () => {
    const evt = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(evt);
  };

  return (
    <div className="admin-topbar">
      <button
        type="button"
        className="search-pill"
        onClick={openCmd}
        aria-label="Open command palette"
      >
        <Search />
        <span>Search posts, jump to section...</span>
        <kbd>⌘K</kbd>
      </button>
      <div className="gap" />
      <Link href="/" target="_blank" className="btn ghost sm">
        <Sparkles />
        Preview site
      </Link>
    </div>
  );
}
