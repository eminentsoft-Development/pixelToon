"use client";

import { useState } from "react";
import { Upload, Grid3X3, List } from "lucide-react";

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
