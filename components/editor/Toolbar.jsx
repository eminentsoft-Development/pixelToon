// Toolbar.jsx
import { useState, useRef } from 'react';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Code, Heading1, Heading2, Heading3, List, ListOrdered, 
  CheckSquare, Quote, Undo, Redo, Link as LinkIcon, Image as ImageIcon,
  Minus, Youtube
} from 'lucide-react';

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


// ── Toolbar Navigation Button ──────────────────────────────────────────────────
const NavButton = ({ onClick, isActive, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type="button"
    className={`p-2 rounded-md transition-all duration-200 ease-in-out flex items-center justify-center
      ${isActive 
        ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
      ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
    `}
  >
    {children}
  </button>
);

// ── Main Toolbar Component ─────────────────────────────────────────────────────
export const Toolbar = ({ editor }) => {
  // Modal states
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  if (!editor) return null;

  // --- Modal Handlers ---
  const addLink = (url) => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setLinkOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkOpen(false);
  };

  const insertImage = (src, alt) => {
    editor.chain().focus().setImage({ src, alt }).run();
    setImageOpen(false);
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-y-2 gap-x-1 p-2 bg-white/90 border-b border-gray-200 backdrop-blur-lg sticky top-0 z-10 rounded-t-xl">
        
        {/* Font Size Dropdown */}
        <div className="flex items-center pr-2 border-r border-gray-200">
          <select
            value={editor.getAttributes('textStyle').fontSize || ''}
            onChange={(e) => {
              const size = e.target.value;
              if (size) {
                editor.chain().focus().setFontSize(size).run();
              } else {
                editor.chain().focus().unsetFontSize().run();
              }
            }}
            className="p-1.5 text-sm bg-transparent border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 cursor-pointer"
          >
            <option value="">Default Size</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="30px">30px</option>
          </select>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <NavButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
            <Bold size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
            <Italic size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
            <UnderlineIcon size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
            <Strikethrough size={18} />
          </NavButton>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <NavButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
            <Heading1 size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
            <Heading2 size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
            <Heading3 size={18} />
          </NavButton>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <NavButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
            <List size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
            <ListOrdered size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')}>
            <CheckSquare size={18} />
          </NavButton>
        </div>

        {/* Media & Elements */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <NavButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}>
            <Code size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
            <Quote size={18} />
          </NavButton>
          
          {/* Replaced window.prompt with modal state toggles */}
          <NavButton onClick={() => setLinkOpen(true)} isActive={editor.isActive('link')}>
            <LinkIcon size={18} />
          </NavButton>
          <NavButton onClick={() => setImageOpen(true)}>
            <ImageIcon size={18} />
          </NavButton>

          <NavButton onClick={addYoutubeVideo}>
            <Youtube size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Minus size={18} />
          </NavButton> 
          <NavButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
            <Undo size={18} />
          </NavButton>
          <NavButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
            <Redo size={18} />
          </NavButton>
        </div>

      </div>

      {/* Render Dialogs Outside the flex container but inside the Toolbar wrapper */}
      <LinkDialog
        open={linkOpen}
        onClose={() => setLinkOpen(false)}
        onAdd={addLink}
        onRemove={removeLink}
        hasLink={editor.isActive('link')}
      />

      <ImageDialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        onInsert={insertImage}
      />
    </>
  );
};