'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import MenuBar from './MenuBar';
import { useEffect } from 'react';

export default function TiptapEditor({ content, onChange, placeholder = "Start typing..." }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ 
        openOnClick: false, 
        autolink: true,
        HTMLAttributes: {
          class: 'text-emerald-400 underline underline-offset-4 hover:text-emerald-300 transition-colors',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-neutral-500 before:float-left before:pointer-events-none',
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className: 'prose prose-invert prose-emerald max-w-none focus:outline-none min-h-[350px] p-6 text-neutral-200',
      },
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div className="w-full rounded-xl border border-neutral-800 bg-gradient-to-b from-[#0A0A0A] to-[#050505] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}