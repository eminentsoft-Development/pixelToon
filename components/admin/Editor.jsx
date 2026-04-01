"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const FONT_FAMILIES = [
  "Georgia", "Times New Roman", "Garamond",
  "Arial", "Helvetica", "Verdana",
  "Courier New", "Trebuchet MS", "Palatino",
];

const FONT_SIZES = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];

const HIGHLIGHT_COLORS = [
  "transparent", "#fef08a", "#bbf7d0", "#bfdbfe",
  "#fecaca", "#e9d5ff", "#fed7aa", "#fbcfe8",
];

const TEXT_COLORS = [
  "inherit", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899",
  "#64748b", "#1e293b",
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const icons = {
  bold: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  ),
  italic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  ),
  underline: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  ),
  alignLeft: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="15" y1="12" x2="3" y2="12" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  ),
  alignCenter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="17" y1="12" x2="7" y2="12" />
      <line x1="19" y1="18" x2="5" y2="18" />
    </svg>
  ),
  alignRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="12" x2="9" y2="12" />
      <line x1="21" y1="18" x2="7" y2="18" />
    </svg>
  ),
  alignJustify: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="12" x2="3" y2="12" />
      <line x1="21" y1="18" x2="3" y2="18" />
    </svg>
  ),
  orderedList: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v4" /><path d="M4 10H6" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  ),
  unorderedList: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  link: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  image: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  undo: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  ),
  redo: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7v6h-6" />
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
    </svg>
  ),
  chevronDown: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  highlight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 11-6 6v3h9l3-3" />
      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    </svg>
  ),
  textColor: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" /><path d="m6 16 6-12 6 12" /><path d="M8 12h8" />
    </svg>
  ),
  close: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  save: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
};

// ─── Toolbar Button ───────────────────────────────────────────────────────────
const ToolbarBtn = ({ title, onClick, active, children, disabled }) => (
  <button
    title={title}
    disabled={disabled}
    onMouseDown={(e) => { e.preventDefault(); if (!disabled) onClick(); }}
    style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 30, height: 28, borderRadius: 5, border: "none",
      cursor: disabled ? "not-allowed" : "pointer", flexShrink: 0,
      background: active ? "rgba(99,102,241,0.12)" : "transparent",
      color: disabled ? "#c4c9d4" : active ? "#6366f1" : "#4b5563",
      transition: "background 0.12s, color 0.12s",
      opacity: disabled ? 0.4 : 1,
    }}
    onMouseEnter={(e) => {
      if (!disabled)
        e.currentTarget.style.background = active ? "rgba(99,102,241,0.18)" : "#f1f3f5";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = active ? "rgba(99,102,241,0.12)" : "transparent";
    }}
  >
    {children}
  </button>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ width: 1, height: 18, background: "#e2e5ea", margin: "0 4px", flexShrink: 0 }} />
);

// ─── Dropdown ─────────────────────────────────────────────────────────────────
const Dropdown = ({ label, children, width, minWidth = 150 }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <button
        onMouseDown={(e) => { e.preventDefault(); setOpen((o) => !o); }}
        style={{
          height: 28, padding: "0 8px", borderRadius: 5,
          border: "1px solid #e2e5ea",
          background: open ? "#f1f3f5" : "#fff",
          color: "#374151", cursor: "pointer", fontSize: 12,
          display: "flex", alignItems: "center", gap: 4,
          whiteSpace: "nowrap", transition: "all 0.12s",
          maxWidth: 160, overflow: "hidden",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
        {icons.chevronDown}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 9999,
          background: "#fff", border: "1px solid #e2e5ea",
          borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          minWidth: width ?? minWidth, padding: 3,
          maxHeight: 220, overflowY: "auto",
        }}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ onClick, active, children }) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    style={{
      display: "block", width: "100%", textAlign: "left",
      padding: "5px 9px", border: "none", borderRadius: 5,
      background: active ? "rgba(99,102,241,0.1)" : "transparent",
      color: active ? "#6366f1" : "#374151",
      cursor: "pointer", fontSize: 13, transition: "background 0.1s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = active ? "rgba(99,102,241,0.15)" : "#f1f3f5";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = active ? "rgba(99,102,241,0.1)" : "transparent";
    }}
  >
    {children}
  </button>
);

// ─── Color Picker ─────────────────────────────────────────────────────────────
const ColorPicker = ({ icon, title, colors, current, onSelect, indicatorColor }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        title={title}
        onMouseDown={(e) => { e.preventDefault(); setOpen((o) => !o); }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", width: 30, height: 28, borderRadius: 5,
          border: "none", cursor: "pointer",
          background: open ? "#f1f3f5" : "transparent",
          color: "#4b5563", gap: 1, transition: "all 0.12s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f3f5")}
        onMouseLeave={(e) => (e.currentTarget.style.background = open ? "#f1f3f5" : "transparent")}
      >
        {icon}
        <div style={{
          width: 16, height: 2.5, borderRadius: 2,
          background:
            indicatorColor === "transparent" || indicatorColor === "inherit"
              ? "linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f)"
              : indicatorColor ?? "#4b5563",
          border: "0.5px solid rgba(0,0,0,0.1)",
        }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: "50%",
          transform: "translateX(-50%)", zIndex: 9999,
          background: "#fff", border: "1px solid #e2e5ea",
          borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: 10,
        }}>
          <p style={{ margin: "0 0 7px", fontSize: 11, color: "#9ca3af", textAlign: "center", whiteSpace: "nowrap" }}>
            {title}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(colors.length, 5)}, 1fr)`, gap: 5 }}>
            {colors.map((c) => (
              <button
                key={c}
                title={c === "transparent" || c === "inherit" ? "Default" : c}
                onMouseDown={(e) => { e.preventDefault(); onSelect(c); setOpen(false); }}
                style={{
                  width: 24, height: 24, borderRadius: 5, cursor: "pointer",
                  border: c === current ? "2px solid #6366f1" : "1.5px solid rgba(0,0,0,0.1)",
                  background:
                    c === "transparent" || c === "inherit"
                      ? "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0/10px 10px"
                      : c,
                  transition: "transform 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Link Modal ───────────────────────────────────────────────────────────────
const LinkModal = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");

  return (
    <div style={{
      position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)",
      zIndex: 9998, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 12,
    }}>
      <div style={{
        background: "#fff", border: "1px solid #e2e5ea",
        borderRadius: 12, padding: "24px 28px", width: 340,
        boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h3 style={{ margin: 0, color: "#111827", fontSize: 16, fontWeight: 600, fontFamily: "Georgia, serif" }}>
            Insert Link
          </h3>
          <button
            onMouseDown={(e) => { e.preventDefault(); onClose(); }}
            style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: 4 }}
          >
            {icons.close}
          </button>
        </div>

        {[
          ["Display Text", text, setText, "Link text (optional)"],
          ["URL *", url, setUrl, "https://"],
        ].map(([label, val, setter, ph]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{
              display: "block", color: "#6b7280", fontSize: 11,
              marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              {label}
            </label>
            <input
              value={val}
              onChange={(e) => setter(e.target.value)}
              placeholder={ph}
              style={{
                width: "100%", padding: "8px 11px", borderRadius: 7,
                border: "1px solid #e2e5ea", background: "#f9fafb",
                color: "#111827", fontSize: 13, outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e5ea")}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onMouseDown={(e) => { e.preventDefault(); onClose(); }}
            style={{
              padding: "7px 16px", borderRadius: 7,
              border: "1px solid #e2e5ea", background: "#fff",
              color: "#6b7280", cursor: "pointer", fontSize: 13,
            }}
          >
            Cancel
          </button>
          <button
            onMouseDown={(e) => { e.preventDefault(); if (url && url !== "https://") onInsert(url, text); }}
            style={{
              padding: "7px 16px", borderRadius: 7, border: "none",
              background: "#6366f1", color: "#fff", cursor: "pointer",
              fontSize: 13, fontWeight: 500,
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getStats = (html) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return { words: text ? text.split(/\s+/).length : 0, chars: text.length };
};

const safeExec = (cmd, value) => {
  try { document.execCommand(cmd, false, value); } catch (_) {}
};

// ═══════════════════════════════════════════════════════════════════════════════
//  RichTextEditor
// ═══════════════════════════════════════════════════════════════════════════════
const RichTextEditor = ({
  value = "",
  onChange,
  onSave,
  placeholder = "Start writing…",
  minHeight = 420,
  maxHeight,
  readOnly = false,
  showWordCount = true,
  autoFocus = false,
  className = "",
  style: styleProp = {},
}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedRangeRef = useRef(null);
  const initialized = useRef(false);

  const [activeFormats, setActiveFormats] = useState({});
  const [highlightColor, setHighlightColor] = useState("transparent");
  const [textColor, setTextColor] = useState("inherit");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);
  const [fontFamily, setFontFamily] = useState("Georgia");
  const [fontSize, setFontSize] = useState("16");
  const [savedAt, setSavedAt] = useState(null);

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (editorRef.current && !initialized.current) {
      editorRef.current.innerHTML = value;
      initialized.current = true;
      if (autoFocus) editorRef.current.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (editorRef.current && initialized.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // ── Format state ──────────────────────────────────────────────────────────
  const updateActiveFormats = useCallback(() => {
    const fmts = {};
    [
      "bold", "italic", "underline",
      "insertOrderedList", "insertUnorderedList",
      "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
    ].forEach((cmd) => {
      try { fmts[cmd] = document.queryCommandState(cmd); } catch (_) {}
    });
    setActiveFormats(fmts);
  }, []);

  const emitChange = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setHtmlContent(html);
    onChange?.(html);
  }, [onChange]);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  }, []);

  const restoreSelection = useCallback(() => {
    const r = savedRangeRef.current;
    if (!r) return;
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel) { sel.removeAllRanges(); sel.addRange(r); }
  }, []);

  const exec = useCallback((cmd, value) => {
    editorRef.current?.focus();
    safeExec(cmd, value);
    updateActiveFormats();
    emitChange();
  }, [updateActiveFormats, emitChange]);

  // ── Font size ─────────────────────────────────────────────────────────────
  const applyFontSize = useCallback((size) => {
    setFontSize(size);
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    if (!sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = `${size}px`;
      try {
        range.surroundContents(span);
      } catch {
        safeExec("insertHTML", `<span style="font-size:${size}px">${range.toString()}</span>`);
      }
    } else {
      safeExec("insertHTML", `<span style="font-size:${size}px">&#8203;</span>`);
    }

    updateActiveFormats();
    emitChange();
  }, [updateActiveFormats, emitChange]);

  const applyFontFamily = useCallback((family) => {
    setFontFamily(family);
    exec("fontName", family);
  }, [exec]);

  const applyHighlight = useCallback((color) => {
    setHighlightColor(color);
    exec("hiliteColor", color === "transparent" ? "transparent" : color);
  }, [exec]);

  const applyTextColor = useCallback((color) => {
    setTextColor(color);
    exec("foreColor", color === "inherit" ? "#1f2937" : color);
  }, [exec]);

  // ── Link ──────────────────────────────────────────────────────────────────
  const insertLink = useCallback((url, text) => {
    restoreSelection();
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) {
      safeExec("createLink", url);
      editorRef.current?.querySelectorAll("a").forEach((a) => {
        if (a.href === url) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      });
    } else {
      safeExec("insertHTML", `<a href="${url}" target="_blank" rel="noopener noreferrer">${text || url}</a>`);
    }
    updateActiveFormats();
    emitChange();
    setShowLinkModal(false);
  }, [restoreSelection, updateActiveFormats, emitChange]);

  // ── Image ─────────────────────────────────────────────────────────────────
  const insertImageFile = useCallback((file) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      exec("insertHTML", `<img src="${e.target?.result}" alt="${file.name}" style="max-width:100%;border-radius:6px;display:block;margin:8px 0;" />`);
    };
    reader.readAsDataURL(file);
  }, [exec]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    const mod = e.ctrlKey || e.metaKey;

    if (mod && e.key === "s") {
      e.preventDefault();
      if (onSave) { onSave(htmlContent); setSavedAt(new Date().toLocaleTimeString()); }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (activeFormats.insertOrderedList || activeFormats.insertUnorderedList) {
        exec(e.shiftKey ? "outdent" : "indent");
      } else {
        safeExec("insertText", "\u00a0\u00a0\u00a0\u00a0");
      }
    }
  }, [htmlContent, onSave, exec, activeFormats]);

  // ── Paste ─────────────────────────────────────────────────────────────────
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const plain = e.clipboardData.getData("text/plain");
    if (html) {
      const clean = html.replace(/<(?!\/?(?:b|i|u|em|strong|a|br|p|ul|ol|li|h[1-6]|span|img)\b)[^>]+>/gi, "");
      safeExec("insertHTML", clean);
    } else {
      safeExec("insertText", plain);
    }
    emitChange();
  }, [emitChange]);

  // ── Selection tracking ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => {
      const sel = window.getSelection();
      if (sel && editorRef.current?.contains(sel.anchorNode)) updateActiveFormats();
    };
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, [updateActiveFormats]);

  const stats = getStats(htmlContent);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .rte-body {
          outline: none;
          caret-color: #6366f1;
        }

        /* Placeholder */
        .rte-body:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
          font-style: italic;
        }

        /* ── FIX: strip browser-injected left indent from block elements ── */
        .rte-body p,
        .rte-body div,
        .rte-body h1,
        .rte-body h2,
        .rte-body h3,
        .rte-body h4 {
          margin-left: 0 !important;
          padding-left: 0 !important;
        }

        /* Headings */
        .rte-body p  { margin: 5px 0; }
        .rte-body h1 { font-size: 2em;    color: #111827; margin: 18px 0 10px; }
        .rte-body h2 { font-size: 1.5em;  color: #111827; margin: 14px 0 8px; }
        .rte-body h3 { font-size: 1.25em; color: #111827; margin: 12px 0 6px; }
        .rte-body h4 { font-size: 1.1em;  color: #111827; margin: 10px 0 5px; }

        /* ── FIX: lists need explicit padding for bullets to show ── */
        .rte-body ul,
        .rte-body ol {
          padding-left: 28px;
          margin: 6px 0;
          color: #374151;
        }

        .rte-body li {
          margin: 3px 0;
          color: #374151;
          display: list-item;
        }

        /* ── FIX: explicitly color the bullet/number marker ── */
        .rte-body ul li::marker { color: #374151; }
        .rte-body ol li::marker { color: #374151; }

        /* Links */
        .rte-body a       { color: #6366f1; text-decoration: underline; }
        .rte-body a:hover { color: #4f46e5; }

        /* Images */
        .rte-body img { max-width: 100%; border-radius: 6px; }

        /* Blockquote */
        .rte-body blockquote {
          border-left: 3px solid #6366f1;
          margin: 8px 0;
          padding: 4px 14px;
          color: #6b7280;
          font-style: italic;
          background: #f5f5ff;
          border-radius: 0 6px 6px 0;
        }

        /* Scrollbar */
        .rte-body::-webkit-scrollbar       { width: 4px; }
        .rte-body::-webkit-scrollbar-track { background: transparent; }
        .rte-body::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>

      <div
        className={className}
        style={{
          display: "flex", flexDirection: "column",
          background: "#fff",
          border: "1px solid #e2e5ea",
          borderRadius: 12, overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          position: "relative",
          ...styleProp,
        }}
      >
        {/* ── TOOLBAR ─────────────────────────────────────────────────── */}
        {!readOnly && (
          <div style={{
            background: "#f9fafb",
            borderBottom: "1px solid #e2e5ea",
            padding: "4px 8px",
            display: "flex", flexWrap: "wrap",
            gap: 2, alignItems: "center", rowGap: 4,
          }}>
            <ToolbarBtn title="Undo (Ctrl+Z)" onClick={() => exec("undo")}>{icons.undo}</ToolbarBtn>
            <ToolbarBtn title="Redo (Ctrl+Y)" onClick={() => exec("redo")}>{icons.redo}</ToolbarBtn>
            <Divider />

            <Dropdown label="Paragraph" width={160}>
              {(close) => (
                <>
                  {[
                    ["Paragraph",  "p",          13, 400, "normal", "#374151"],
                    ["Heading 1",  "h1",         20, 700, "normal", "#111827"],
                    ["Heading 2",  "h2",         17, 700, "normal", "#111827"],
                    ["Heading 3",  "h3",         15, 600, "normal", "#111827"],
                    ["Heading 4",  "h4",         13, 600, "normal", "#111827"],
                    ["Blockquote", "blockquote", 13, 400, "italic", "#6b7280"],
                  ].map(([label, tag, size, weight, style, color]) => (
                    <DropdownItem key={tag} onClick={() => { exec("formatBlock", tag); close(); }}>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: size, fontWeight: weight, fontStyle: style, color }}>
                        {label}
                      </span>
                    </DropdownItem>
                  ))}
                </>
              )}
            </Dropdown>

            <Dropdown label={fontFamily} minWidth={175}>
              {(close) => FONT_FAMILIES.map((f) => (
                <DropdownItem key={f} active={fontFamily === f} onClick={() => { applyFontFamily(f); close(); }}>
                  <span style={{ fontFamily: f, fontSize: 13 }}>{f}</span>
                </DropdownItem>
              ))}
            </Dropdown>

            <Dropdown label={`${fontSize}px`} width={90}>
              {(close) => FONT_SIZES.map((s) => (
                <DropdownItem key={s} active={fontSize === s} onClick={() => { applyFontSize(s); close(); }}>
                  <span style={{ fontSize: Math.min(Number(s), 19) }}>{s}px</span>
                </DropdownItem>
              ))}
            </Dropdown>

            <Divider />

            <ToolbarBtn title="Bold (Ctrl+B)"      active={activeFormats.bold}      onClick={() => exec("bold")}     >{icons.bold}</ToolbarBtn>
            <ToolbarBtn title="Italic (Ctrl+I)"    active={activeFormats.italic}    onClick={() => exec("italic")}   >{icons.italic}</ToolbarBtn>
            <ToolbarBtn title="Underline (Ctrl+U)" active={activeFormats.underline} onClick={() => exec("underline")}>{icons.underline}</ToolbarBtn>

            <Divider />

            <ColorPicker
              icon={icons.textColor} title="Text color"
              colors={TEXT_COLORS} current={textColor}
              onSelect={applyTextColor}
              indicatorColor={textColor === "inherit" ? "#1f2937" : textColor}
            />
            <ColorPicker
              icon={icons.highlight} title="Highlight"
              colors={HIGHLIGHT_COLORS} current={highlightColor}
              onSelect={applyHighlight}
              indicatorColor={highlightColor}
            />

            <Divider />

            <ToolbarBtn title="Align left"   active={activeFormats.justifyLeft}   onClick={() => exec("justifyLeft")}  >{icons.alignLeft}</ToolbarBtn>
            <ToolbarBtn title="Align center" active={activeFormats.justifyCenter} onClick={() => exec("justifyCenter")}>{icons.alignCenter}</ToolbarBtn>
            <ToolbarBtn title="Align right"  active={activeFormats.justifyRight}  onClick={() => exec("justifyRight")} >{icons.alignRight}</ToolbarBtn>
            <ToolbarBtn title="Justify"      active={activeFormats.justifyFull}   onClick={() => exec("justifyFull")}  >{icons.alignJustify}</ToolbarBtn>

            <Divider />

            <ToolbarBtn title="Ordered list"   active={activeFormats.insertOrderedList}   onClick={() => exec("insertOrderedList")}  >{icons.orderedList}</ToolbarBtn>
            <ToolbarBtn title="Unordered list" active={activeFormats.insertUnorderedList} onClick={() => exec("insertUnorderedList")}>{icons.unorderedList}</ToolbarBtn>

            <Divider />

            <ToolbarBtn title="Insert link"  onClick={() => { saveSelection(); setShowLinkModal(true); }}>{icons.link}</ToolbarBtn>
            <ToolbarBtn title="Insert image" onClick={() => fileInputRef.current?.click()}>{icons.image}</ToolbarBtn>
            <input
              ref={fileInputRef} type="file" accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) insertImageFile(f); e.target.value = ""; }}
            />

            {onSave && (
              <>
                <Divider />
                <ToolbarBtn title="Save (Ctrl+S)" onClick={() => { onSave(htmlContent); setSavedAt(new Date().toLocaleTimeString()); }}>
                  {icons.save}
                </ToolbarBtn>
              </>
            )}
          </div>
        )}

        {/* ── EDITOR BODY ───────────────────────────────────────────── */}
        <div
          ref={editorRef}
          className="rte-body"
          contentEditable={!readOnly}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={() => { emitChange(); updateActiveFormats(); }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onMouseUp={updateActiveFormats}
          onFocus={updateActiveFormats}
          style={{
            flex: 1,
            padding: "28px 36px",
            color: "#1f2937",
            fontSize: 16,
            lineHeight: 1.85,
            fontFamily,
            minHeight,
            maxHeight,
            overflowY: "auto",
            wordBreak: "break-word",
            background: "#fff",
          }}
        />

        {/* ── STATUS BAR ────────────────────────────────────────────── */}
        {(showWordCount || savedAt || onSave) && (
          <div style={{
            borderTop: "1px solid #f0f1f3", background: "#f9fafb",
            padding: "4px 16px", display: "flex",
            alignItems: "center", justifyContent: "space-between",
            fontSize: 11, color: "#9ca3af", userSelect: "none",
          }}>
            {showWordCount ? (
              <span>{stats.words} word{stats.words !== 1 ? "s" : ""} · {stats.chars} chars</span>
            ) : <span />}

            {savedAt ? (
              <span style={{ color: "#6366f1" }}>Saved at {savedAt}</span>
            ) : onSave ? (
              <span>Ctrl+S to save</span>
            ) : null}
          </div>
        )}

        {/* ── LINK MODAL ────────────────────────────────────────────── */}
        {showLinkModal && (
          <LinkModal onInsert={insertLink} onClose={() => setShowLinkModal(false)} />
        )}
      </div>
    </>
  );
};

export default RichTextEditor;