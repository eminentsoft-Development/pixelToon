import React, { useState, useRef, useEffect, useCallback } from 'react';




const FONT_SIZES = [
  { label: 'Tiny', value: '1' },     // ~10px
  { label: 'Small', value: '2' },    // ~13px
  { label: 'Normal', value: '3' },   // ~16px (Browser Default)
  { label: 'Medium', value: '4' },   // ~18px
  { label: 'Large', value: '5' },    // ~24px
  { label: 'X-Large', value: '6' },  // ~32px
  { label: 'Huge', value: '7' },     // ~48px
];

const FontSizePicker = ({ onSelect }) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      defaultValue="3"
      style={{
        background: 'transparent',
        color: '#4b5563',
        border: '1px solid #374151',
        borderRadius: 6,
        fontSize: 12,
        padding: '2px 4px',
        cursor: 'pointer',
        outline: 'none',
        marginRight: 4
      }}
    >
      {FONT_SIZES.map(size => (
        <option key={size.value} value={size.value}>{size.label}</option>
      ))}
    </select>
  );
};

// ── Toolbar Button ────────────────────────────────────────────────────────────
const ToolbarButton = ({ onClick, isActive, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      padding: 0,
      border: 'none',
      borderRadius: 6,
      background: isActive ? '#e5e7eb' : 'transparent',
      color: isActive ? '#111827' : '#4b5563',
      cursor: 'pointer',
      transition: 'background 0.15s, color 0.15s',
      fontSize: 13,
      fontWeight: 600,
    }}
    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#374151'; e.currentTarget.style.color = '#fff'; }}
    onMouseLeave={e => { e.currentTarget.style.background = isActive ? '#e5e7eb' : 'transparent'; e.currentTarget.style.color = isActive ? '#111827' : '#4b5563'; }}
  >
    {children}
  </button>
);

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconBold       = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>;
const IconItalic     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>;
const IconStrike     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><path d="M16 6C16 6 14.5 4 12 4C9 4 7 6 7 8C7 10.5 9.5 11.5 12 12C14.5 12.5 17 13.5 17 16C17 18 15 20 12 20C9 20 7 18.5 7 18"/></svg>;
const IconH1         = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h8"/><path d="M4 4v16"/><path d="M12 4v16"/><path d="M21 4l-2 2 2 2"/><path d="M19 4v8"/></svg>;
const IconBulletList = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>;
const IconOrderedList= () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>;
const IconBlockquote = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>;
const IconHighlight  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11-6 6v3h3l6-6"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>;
const IconLink       = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const IconImage      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>;

// ── Color Picker Popover ──────────────────────────────────────────────────────
const COLORS = ['#000000','#374151','#6b7280','#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#f97316'];

const ColorPicker = ({ currentColor, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        title="Text Color"
        onClick={() => setOpen(o => !o)}
        style={{
          width: 32, height: 32, padding: 0, border: 'none', borderRadius: 6,
          background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div style={{
          width: 16, height: 16, borderRadius: 3,
          border: '2px solid #9ca3af',
          backgroundColor: currentColor || '#000000',
        }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '110%', left: 0, zIndex: 100,
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
          padding: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          display: 'grid', gridTemplateColumns: 'repeat(5, 24px)', gap: 4,
        }}>
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              title={c}
              onClick={() => { onSelect(c); setOpen(false); }}
              style={{
                width: 24, height: 24, borderRadius: 4,
                border: '1px solid #d1d5db',
                backgroundColor: c, cursor: 'pointer',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Link Dialog ───────────────────────────────────────────────────────────────
const LinkDialog = ({ open, onClose, onAdd, onRemove, hasLink }) => {
  const [url, setUrl] = useState('');
  if (!open) return null;

  const handleAdd = () => { if (url) { onAdd(url); setUrl(''); } };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div
        style={{
          background: '#fff', borderRadius: 12, padding: 24, minWidth: 320,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Add Link</h3>
        <input
          autoFocus
          placeholder="Enter URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8,
            fontSize: 14, outline: 'none', marginBottom: 16,
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = '#d1d5db'}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={handleAdd}
            style={{
              padding: '8px 16px', background: '#111827', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}
          >Add Link</button>
          {hasLink && (
            <button
              type="button"
              onClick={() => { onRemove(); }}
              style={{
                padding: '8px 16px', background: 'transparent', color: '#374151',
                border: '1px solid #d1d5db', borderRadius: 8, cursor: 'pointer', fontSize: 14,
              }}
            >Remove Link</button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Image Dialog ──────────────────────────────────────────────────────────────
const ImageDialog = ({ open, onClose, onInsert }) => {
  const [tab, setTab] = useState('url'); // 'url' | 'upload'
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const fileInputRef = useRef(null);

  if (!open) return null;

  const handleUrlInsert = () => {
    if (url) {
      onInsert(url, altText);
      setUrl('');
      setAltText('');
    }
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      onInsert(ev.target.result, altText || file.name);
      setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const tabStyle = active => ({
    padding: '6px 14px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    background: active ? '#111827' : 'transparent',
    color: active ? '#fff' : '#6b7280',
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div
        style={{
          background: '#fff', borderRadius: 12, padding: 24, minWidth: 340,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Insert Image</h3>

        {/* Tabs */}
        <div style={{ display: 'flex', width: 'fit-content', gap: 4, marginBottom: 16, background: '#f3f4f6', borderRadius: 8, padding: 4 }}>
          <button type="button" style={tabStyle(tab === 'url')}    onClick={() => setTab('url')}>URL</button>
          <button type="button" style={tabStyle(tab === 'upload')} onClick={() => setTab('upload')}>Upload</button>
        </div>

        {/* Alt text (shared) */}
        <input
          placeholder="Alt text (optional)"
          value={altText}
          onChange={e => setAltText(e.target.value)}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8,
            fontSize: 14, outline: 'none', marginBottom: 12,
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = '#d1d5db'}
        />

        {tab === 'url' && (
          <>
            <input
              autoFocus
              placeholder="https://example.com/image.png"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUrlInsert()}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8,
                fontSize: 14, outline: 'none', marginBottom: 16,
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
            <button
              type="button"
              onClick={handleUrlInsert}
              style={{
                padding: '8px 16px', background: '#111827', color: '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600,
              }}
            >Insert Image</button>
          </>
        )}

        {tab === 'upload' && (
          <>
            <div
              style={{
                border: '2px dashed #d1d5db', borderRadius: 8, padding: '20px 16px',
                textAlign: 'center', cursor: 'pointer', marginBottom: 16,
                color: '#6b7280', fontSize: 14,
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#eff6ff'; }}
              onDragLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = 'transparent'; }}
              onDrop={e => {
                e.preventDefault();
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.background = 'transparent';
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith('image/')) {
                  const reader = new FileReader();
                  reader.onload = ev => { onInsert(ev.target.result, altText || file.name); setAltText(''); };
                  reader.readAsDataURL(file);
                }
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>🖼️</div>
              <div>Click to browse or drag & drop</div>
              <div style={{ fontSize: 12, marginTop: 4, color: '#9ca3af' }}>PNG, JPG, GIF, WebP supported</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Sep = () => <div style={{ width: 1, height: 20, background: '#374151', margin: '0 4px' }} />;

// ── Main Editor ───────────────────────────────────────────────────────────────
const RichTextEditor = ({
  content = '',
  onChange,
  placeholder = 'Start writing...',
  style = {},
}) => {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null); // saves selection before dialog opens
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [activeColor, setActiveColor] = useState('#000000');
  const [activeStates, setActiveStates] = useState({
    bold: false, italic: false, strikeThrough: false,
    insertUnorderedList: false, insertOrderedList: false,
    h1: false, h2: false, h3: false,
    blockquote: false, link: false,
  });

  // ── Save & restore selection (needed when dialogs steal focus) ────────────
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  

  const restoreSelection = useCallback(() => {
    if (!savedRangeRef.current) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRangeRef.current);
  }, []);

  // ── Recompute active states ───────────────────────────────────────────────
  const refreshActiveStates = useCallback(() => {
    const sel = window.getSelection();

    const queryCmd = cmd => { try { return document.queryCommandState(cmd); } catch { return false; } };

    const hasAncestor = tag => {
      if (!sel || !sel.rangeCount) return false;
      let node = sel.getRangeAt(0).commonAncestorContainer;
      while (node && node !== editorRef.current) {
        if (node.nodeName === tag.toUpperCase()) return true;
        node = node.parentNode;
      }
      return false;
    };

    setActiveStates({
      bold: queryCmd('bold'),
      italic: queryCmd('italic'),
      strikeThrough: queryCmd('strikeThrough'),
      insertUnorderedList: queryCmd('insertUnorderedList'),
      insertOrderedList: queryCmd('insertOrderedList'),
      h1: hasAncestor('h1'),
      h2: hasAncestor('h2'),
      h3: hasAncestor('h3'),
      blockquote: hasAncestor('blockquote'),
      link: hasAncestor('a'),
    });
  }, []);

  // ── execCommand helpers ───────────────────────────────────────────────────
  const exec = useCallback((cmd, value = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
    refreshActiveStates();
  }, [refreshActiveStates]);

  const toggleHeading = level => {
    editorRef.current?.focus();
    if (activeStates[`h${level}`]) {
      document.execCommand('formatBlock', false, 'p');
    } else {
      document.execCommand('formatBlock', false, `h${level}`);
    }
    refreshActiveStates();
  };

  const toggleBlockquote = () => {
    editorRef.current?.focus();
    if (activeStates.blockquote) {
      document.execCommand('formatBlock', false, 'p');
    } else {
      document.execCommand('formatBlock', false, 'blockquote');
    }
    refreshActiveStates();
  };

  const applyColor = color => {
    setActiveColor(color);
    exec('foreColor', color);
  };

  const addLink = url => {
    exec('createLink', url);
    setLinkOpen(false);
  };

  const removeLink = () => {
    exec('unlink');
    setLinkOpen(false);
  };

  const handleHighlight = () => {
    const sel = window.getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return;
    editorRef.current?.focus();
    exec('backColor', '#fef08a');
  };

  const applyFontSize = (size) => {
  editorRef.current?.focus();
  // execCommand 'fontSize' takes values 1-7
  document.execCommand('fontSize', false, size);
  refreshActiveStates();
};

  // ── Image insertion ───────────────────────────────────────────────────────
  const openImageDialog = () => {
    saveSelection();
    setImageOpen(true);
  };

  const insertImage = (src, alt = '') => {
    setImageOpen(false);
    editorRef.current?.focus();
    restoreSelection();

    // Use execCommand insertHTML for inline insertion at cursor
    const img = `<img src="${src}" alt="${alt}" style="max-width:100%;height:auto;border-radius:6px;margin:4px 0;display:block;" />`;
    document.execCommand('insertHTML', false, img);

    onChange?.(editorRef.current?.innerHTML || '');
    refreshActiveStates();
  };

  const handleInput = () => {
    onChange?.(editorRef.current?.innerHTML || '');
    refreshActiveStates();
  };

  // Set initial content
  useEffect(() => {
    if (editorRef.current && content && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const editorStyle = {
    minHeight: 300,
    maxHeight: 400,
    overflowY: 'auto',
    padding: '12px 16px',
    outline: 'none',
    fontSize: 14,
    lineHeight: 1.7,
    color: '#1f2937',
    caretColor: '#3b82f6',
  };

  return (
    <>
      <style>{`
        .rte-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rte-content h1 { font-size: 1.6em; font-weight: 700; margin: 12px 0 6px; }
        .rte-content h2 { font-size: 1.3em; font-weight: 700; margin: 10px 0 4px; }
        .rte-content h3 { font-size: 1.1em; font-weight: 700; margin: 8px 0 4px; }
        .rte-content ul { list-style: disc; margin-left: 24px; }
        .rte-content ol { list-style: decimal; margin-left: 24px; }
        .rte-content blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 16px;
          margin: 8px 0;
          color: #6b7280;
          font-style: italic;
        }
        .rte-content a { color: #2563eb; text-decoration: underline; }
        .rte-content p { margin: 4px 0; }
        .rte-content img { max-width: 100%; height: auto; border-radius: 6px; margin: 4px 0; display: block; }
      `}</style>

      <div style={{
        borderRadius: 10,
        border: '1px solid #374151',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        ...style,
      }}>
        {/* Toolbar */}
        <div style={{
          borderBottom: '1px solid #374151',
          background: 'rgba(255,255,255,0.03)',
          padding: '6px 10px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
        }}>
          <ToolbarButton onClick={() => exec('bold')}   isActive={activeStates.bold}   title="Bold"><IconBold /></ToolbarButton>
          <ToolbarButton onClick={() => exec('italic')} isActive={activeStates.italic} title="Italic"><IconItalic /></ToolbarButton>
          <ToolbarButton onClick={() => exec('strikeThrough')} isActive={activeStates.strikeThrough} title="Strikethrough"><IconStrike /></ToolbarButton>

          <Sep />

          <ToolbarButton onClick={() => toggleHeading(1)} isActive={activeStates.h1} title="Heading 1"><IconH1 /></ToolbarButton>
          <ToolbarButton onClick={() => toggleHeading(2)} isActive={activeStates.h2} title="Heading 2"><span>H2</span></ToolbarButton>
          <ToolbarButton onClick={() => toggleHeading(3)} isActive={activeStates.h3} title="Heading 3"><span>H3</span></ToolbarButton>

          <Sep />

          <ToolbarButton onClick={() => exec('insertUnorderedList')} isActive={activeStates.insertUnorderedList} title="Bullet List"><IconBulletList /></ToolbarButton>
          <ToolbarButton onClick={() => exec('insertOrderedList')}   isActive={activeStates.insertOrderedList}   title="Numbered List"><IconOrderedList /></ToolbarButton>
          <ToolbarButton onClick={toggleBlockquote} isActive={activeStates.blockquote} title="Blockquote"><IconBlockquote /></ToolbarButton>

          <Sep />

          <ToolbarButton onClick={handleHighlight} title="Highlight"><IconHighlight /></ToolbarButton>

          <FontSizePicker onSelect={applyFontSize} />

          <ColorPicker currentColor={activeColor} onSelect={applyColor} />

          <ToolbarButton onClick={() => setLinkOpen(true)} isActive={activeStates.link} title="Add Link"><IconLink /></ToolbarButton>

          <Sep />

          {/* ── Image button (new) ── */}
          <ToolbarButton onClick={openImageDialog} title="Insert Image"><IconImage /></ToolbarButton>
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          className="rte-content"
          style={editorStyle}
          onInput={handleInput}
          onKeyUp={refreshActiveStates}
          onMouseUp={refreshActiveStates}
          onSelect={refreshActiveStates}
        />
      </div>

      <LinkDialog
        open={linkOpen}
        onClose={() => setLinkOpen(false)}
        onAdd={addLink}
        onRemove={removeLink}
        hasLink={activeStates.link}
      />

      {/* ── Image Dialog (new) ── */}
      <ImageDialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        onInsert={insertImage}
      />
    </>
  );
};

export default RichTextEditor;