"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, Link2, Unlink, Eraser } from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
  placeholder?: string;
  ariaLabel?: string;
};

/**
 * Lightweight, dependency-free WYSIWYG editor.
 *
 * Stores HTML (paragraphs, <strong>/<em>, <a>, <ul>) so it stays compatible
 * with the existing `bioHtml`/`bodyHtml` fields that render via
 * dangerouslySetInnerHTML on the public site. Uses contentEditable +
 * document.execCommand — old but universally supported and good enough for an
 * internal admin where we control the output.
 */
export default function RichTextEditor({
  value,
  onChange,
  minHeight = 160,
  placeholder = "Write the description…",
  ariaLabel = "Rich text editor",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const focused = useRef(false);

  // Enter should create <p> blocks rather than <div>s.
  useEffect(() => {
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      /* not supported — harmless */
    }
  }, []);

  // Sync external value into the DOM only while not actively editing, so
  // typing (which bubbles up via onChange and re-renders the parent) never
  // resets the caret.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!focused.current && el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const emit = () => {
    const el = ref.current;
    if (el) onChange(el.innerHTML);
  };

  // Run an execCommand without losing the editor's selection (mousedown
  // preventDefault keeps focus inside the contentEditable).
  const cmd =
    (command: string, arg?: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      ref.current?.focus();
      document.execCommand(command, false, arg);
      emit();
    };

  const onLinkMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const sel = window.getSelection();
    const range =
      sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;

    const url = window.prompt("Link URL", "https://");
    ref.current?.focus();

    // Restore the selection the prompt dialog stole.
    if (range) {
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(range);
    }
    if (!url) return;

    if (range && range.collapsed) {
      // Nothing selected — drop in the URL itself as a link.
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      );
    } else {
      document.execCommand("createLink", false, url);
      // Tag the freshly created anchor as a safe external link.
      const s = window.getSelection();
      const node = s?.anchorNode;
      const el =
        node && node.nodeType === 3 ? node.parentElement : (node as Element | null);
      const anchor = el?.closest?.("a");
      if (anchor) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    }
    emit();
  };

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar" aria-label="Formatting">
        <button
          type="button"
          className="rte-tb-btn"
          title="Bold"
          aria-label="Bold"
          onMouseDown={cmd("bold")}
        >
          <Bold />
        </button>
        <button
          type="button"
          className="rte-tb-btn"
          title="Italic"
          aria-label="Italic"
          onMouseDown={cmd("italic")}
        >
          <Italic />
        </button>
        <button
          type="button"
          className="rte-tb-btn"
          title="Bulleted list"
          aria-label="Bulleted list"
          onMouseDown={cmd("insertUnorderedList")}
        >
          <List />
        </button>
        <button
          type="button"
          className="rte-tb-btn"
          title="Add link"
          aria-label="Add link"
          onMouseDown={onLinkMouseDown}
        >
          <Link2 />
        </button>
        <button
          type="button"
          className="rte-tb-btn"
          title="Remove link"
          aria-label="Remove link"
          onMouseDown={cmd("unlink")}
        >
          <Unlink />
        </button>
        <button
          type="button"
          className="rte-tb-btn"
          title="Clear formatting"
          aria-label="Clear formatting"
          onMouseDown={cmd("removeFormat")}
        >
          <Eraser />
        </button>
      </div>

      <div
        ref={ref}
        className="rte-area"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={ariaLabel}
        data-placeholder={placeholder}
        style={{ minHeight }}
        onInput={emit}
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
          emit();
        }}
      />
    </div>
  );
}
