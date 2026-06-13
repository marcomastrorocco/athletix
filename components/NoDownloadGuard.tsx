"use client";

import { useEffect } from "react";

/**
 * Client-side deterrent against casual content downloading.
 * Scoped to the page where it is mounted: blocks the context menu,
 * image dragging, selection, and common save/view-source shortcuts.
 *
 * NOTE: this only stops casual users. Anything rendered in a browser
 * can still be retrieved via DevTools / Network tab / screenshots.
 */
export default function NoDownloadGuard() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    const blockDrag = (e: DragEvent) => e.preventDefault();

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // Ctrl/Cmd + S (save), U (view source), P (print)
      if ((e.ctrlKey || e.metaKey) && ["s", "u", "p"].includes(key)) {
        e.preventDefault();
      }
      // F12 / Ctrl+Shift+I/J/C (devtools) — light deterrent only
      if (
        key === "f12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(key))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockKeys);

    document.body.classList.add("no-download");

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockKeys);
      document.body.classList.remove("no-download");
    };
  }, []);

  return null;
}
