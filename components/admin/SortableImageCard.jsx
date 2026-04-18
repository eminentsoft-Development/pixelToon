"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Check, X } from "lucide-react";

export default function SortableImageCard({ item, onDelete, onAltEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id || item.url });

  const [editAlt, setEditAlt] = useState(false);
  const [altVal, setAltVal] = useState(item.alt || "");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  const handleSaveAlt = () => {
    onAltEdit(item._id || item.url, altVal);
    setEditAlt(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={item.url}
          alt={item.alt || ""}
          className="w-full h-full object-cover"
        />

        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 bg-black/40 text-white rounded-lg p-1.5 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical size={14} />
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onDelete(item._id || item.url)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="p-2">
        {editAlt ? (
          <div className="flex gap-1">
            <input
              value={altVal}
              onChange={(e) => setAltVal(e.target.value)}
              className="text-xs border border-slate-200 rounded px-2 py-1 flex-1 outline-none focus:border-indigo-400"
              placeholder="Alt text…"
            />
            <button
              type="button"
              onClick={handleSaveAlt}
              className="text-emerald-600 hover:text-emerald-700 p-1"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onClick={() => setEditAlt(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditAlt(true)}
            className="w-full text-left text-xs text-slate-400 hover:text-slate-600 truncate px-1 py-0.5 rounded hover:bg-slate-50"
          >
            {item.alt || <span className="italic">Add alt text…</span>}
          </button>
        )}
      </div>
    </div>
  );
}