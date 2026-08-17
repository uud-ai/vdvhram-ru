"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  initialHtml: string;
  onChange: (html: string) => void;
};

function isSelectionInside(container: HTMLElement, sel: Selection | null) {
  if (!sel || sel.rangeCount === 0) return false;
  return container.contains(sel.getRangeAt(0).commonAncestorContainer);
}

export default function RichTextEditor({ initialHtml, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [active, setActive] = useState({ bold: false, italic: false, link: false });

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = initialHtml || "";
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      // ignore unsupported command
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateActive() {
    const el = editorRef.current;
    const sel = window.getSelection();
    if (!el || !isSelectionInside(el, sel)) return;
    const node = sel!.anchorNode;
    const anchorEl = node ? (node.nodeType === 1 ? (node as Element) : node.parentElement) : null;
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      link: !!anchorEl?.closest("a"),
    });
  }

  useEffect(() => {
    document.addEventListener("selectionchange", updateActive);
    return () => document.removeEventListener("selectionchange", updateActive);
  }, []);

  function emitChange() {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }

  function toggleBold(e: React.MouseEvent) {
    e.preventDefault();
    document.execCommand("bold");
    emitChange();
    updateActive();
  }

  function toggleItalic(e: React.MouseEvent) {
    e.preventDefault();
    document.execCommand("italic");
    emitChange();
    updateActive();
  }

  function handleLinkButton(e: React.MouseEvent) {
    e.preventDefault();
    const el = editorRef.current;
    const sel = window.getSelection();
    if (!el || !isSelectionInside(el, sel) || sel!.rangeCount === 0) return;

    const range = sel!.getRangeAt(0);
    const node = range.commonAncestorContainer;
    const anchorEl = node.nodeType === 1 ? (node as Element) : node.parentElement;
    const existingLink = anchorEl?.closest("a");

    if (existingLink) {
      document.execCommand("unlink");
      emitChange();
      updateActive();
      return;
    }

    savedRangeRef.current = range.cloneRange();
    setLinkValue("");
    setLinkPopoverOpen(true);
  }

  function confirmLink() {
    let url = linkValue.trim();
    if (!url) {
      setLinkPopoverOpen(false);
      return;
    }
    if (!/^([a-z][a-z0-9+.-]*:|\/)/i.test(url)) {
      url = `https://${url}`;
    }

    const el = editorRef.current;
    const range = savedRangeRef.current;
    const sel = window.getSelection();
    if (!el || !range || !sel) {
      setLinkPopoverOpen(false);
      return;
    }

    el.focus();
    sel.removeAllRanges();
    sel.addRange(range);

    if (range.collapsed) {
      const a = document.createElement("a");
      a.href = url;
      a.textContent = url;
      range.insertNode(a);
      range.setStartAfter(a);
      range.setEndAfter(a);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      document.execCommand("createLink", false, url);
    }

    setLinkPopoverOpen(false);
    setLinkValue("");
    emitChange();
    updateActive();
  }

  function cancelLink() {
    setLinkPopoverOpen(false);
    setLinkValue("");
  }

  return (
    <div>
      <div className="flex items-center gap-1 rounded-t-lg border border-b-0 border-border bg-background/60 px-2 py-1.5">
        <button
          type="button"
          onMouseDown={toggleBold}
          title="Жирный"
          className={`rounded px-2.5 py-1 text-sm font-bold transition-colors hover:bg-primary/10 ${
            active.bold ? "bg-primary/15 text-primary" : "text-charcoal"
          }`}
        >
          Ж
        </button>
        <button
          type="button"
          onMouseDown={toggleItalic}
          title="Курсив"
          className={`rounded px-2.5 py-1 text-sm italic transition-colors hover:bg-primary/10 ${
            active.italic ? "bg-primary/15 text-primary" : "text-charcoal"
          }`}
        >
          К
        </button>
        <button
          type="button"
          onMouseDown={handleLinkButton}
          title="Ссылка (если курсор внутри ссылки — уберёт её)"
          className={`rounded px-2.5 py-1 text-sm transition-colors hover:bg-primary/10 ${
            active.link ? "bg-primary/15 text-primary" : "text-charcoal"
          }`}
        >
          Ссылка
        </button>
      </div>

      {linkPopoverOpen && (
        <div className="flex items-center gap-2 border border-b-0 border-border bg-white px-2 py-2">
          <input
            type="url"
            autoFocus
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                confirmLink();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                cancelLink();
              }
            }}
            placeholder="https://example.com"
            className="flex-1 rounded border border-border px-2 py-1 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={confirmLink}
            className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
          >
            Вставить
          </button>
          <button
            type="button"
            onClick={cancelLink}
            className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium text-charcoal"
          >
            Отмена
          </button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        className="min-h-[180px] w-full rounded-b-lg border border-border px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-primary [&_a]:text-primary [&_a]:underline [&_p]:mb-2 [&_p:last-child]:mb-0"
      />
    </div>
  );
}
