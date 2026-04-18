"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Grid3X3,
  List,
  Search,
  Filter,
  ChevronDown,
  X,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

// ─── Reusable Gallery Shell ────────────────────────────────────────────────
export function GalleryShell({
  tabLabel,
  tabDescription,
  icon: Icon,
  totalCount,
  children,
  onUpload,
  uploadLabel = "Upload",
}) {
  const [view, setView] = useState("grid");

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5b4fcf]/10 flex items-center justify-center">
              {Icon && <Icon className="w-5 h-5 text-[#5b4fcf]" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {tabLabel}
              </h2>
              <p className="text-sm text-gray-500">{tabDescription}</p>
            </div>
          </div>
          <button
            onClick={onUpload}
            className="flex items-center gap-2 bg-[#5b4fcf] hover:bg-[#4a3fb5] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-[#5b4fcf]/30"
          >
            <Upload className="w-4 h-4" />
            {uploadLabel}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-end gap-3 flex-wrap">
        {/* Filter dropdown */}

        {/* Count badge */}
        <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
          {totalCount} items
        </span>

        {/* View toggle */}
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden p-0.5 gap-0.5">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition ${
              view === "grid"
                ? "bg-[#5b4fcf] text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition ${
              view === "list"
                ? "bg-[#5b4fcf] text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {children({ view })}
    </div>
  );
}

// ─── Media Card ──────────────────────────────────────────────────────────────
export function MediaCard({ item, onDelete, onEdit, view }) {

  if (view === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-[#5b4fcf]/30 hover:shadow-sm transition group"
      >
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {item.title || item.alt || "Untitled"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {item.size || "—"} · {item.date || "—"}
          </p>
        </div>

        <button
          onClick={() => onEdit?.(item.id)}
          className="text-gray-400 hover:text-red-500  backdrop-blur-sm p-1.5 rounded-lg transition"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#5b4fcf]/40 hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={item.url}
          alt={item.alt || "Artwork image"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false} // Set to true only if these are "above the fold"
        />
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3">
          <button
            onClick={() => onEdit?.(item.id)}
            className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-lg transition"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(item.id)}
            className="text-white bg-red-500/70 ml-2 hover:bg-red-500 backdrop-blur-sm p-1.5 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2.5">
        <p className="text-xs text-gray-400 hover:text-[#5b4fcf] transition truncate block w-full text-left">
          {item.alt || "No alt text…"}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Upload Dropzone Modal ────────────────────────────────────────────────────
export function UploadModal({
  open,
  onClose,
  accept = "image/*",
  label = "images",
}) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    toast.success(`${files.length} file(s) queued for upload`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                Upload {label}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                dragging
                  ? "border-[#5b4fcf] bg-[#5b4fcf]/5"
                  : "border-gray-200 hover:border-[#5b4fcf]/50 hover:bg-gray-50"
              }`}
            >
              <Upload
                className={`w-8 h-8 mx-auto mb-3 ${dragging ? "text-[#5b4fcf]" : "text-gray-300"}`}
              />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Drag & drop files here
              </p>
              <p className="text-xs text-gray-400">or click to browse</p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept={accept}
                className="hidden"
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success("Upload started!");
                  onClose();
                }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#5b4fcf] rounded-xl hover:bg-[#4a3fb5] transition"
              >
                Upload
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, message, onUpload }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-gray-300" />
      </div>
      <p className="text-gray-500 text-sm font-medium mb-4">{message}</p>
      <button
        onClick={onUpload}
        className="px-4 py-2 bg-[#5b4fcf] text-white text-sm font-medium rounded-xl hover:bg-[#4a3fb5] transition"
      >
        Upload Now
      </button>
    </div>
  );
}
