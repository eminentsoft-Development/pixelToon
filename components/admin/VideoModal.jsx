"use client";

import { useState } from "react";
import { Loader2, Check, X } from "lucide-react";
import { apiRequest } from "@/lib/api";

function parseYoutubeId(input) {
  const m = input.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return m ? m[1] : input.trim();
}

export default function VideoModal({ video, onClose, onSave }) {
  const isEdit = Boolean(video?._id);
  const [title, setTitle] = useState(video?.title ?? "");
  const [youtubeId, setYoutubeId] = useState(video?.youtubeId ?? "");
  const [saving, setSaving] = useState(false);

  const previewId = youtubeId ? parseYoutubeId(youtubeId) : null;

  const handleSubmit = async () => {
    if (!title.trim() || !youtubeId.trim()) return;
    setSaving(true);

    const payload = { title: title.trim(), youtubeId: youtubeId.trim() };

    const res = isEdit
      ? await apiRequest(`/api/gallery/videos/${video._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await apiRequest("/api/gallery/videos", {
          method: "POST",
          body: JSON.stringify(payload),
        });

    setSaving(false);
    if (res.success) onSave(res.data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="font-bold text-slate-800">
            {isEdit ? "Edit Video" : "Add Video"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
              placeholder="Video title…"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              YouTube URL or ID
            </label>
            <input
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
              placeholder="https://youtube.com/watch?v=… or video ID"
            />
          </div>

          {previewId && (
            <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50">
              <img
                src={`https://i.ytimg.com/vi/${parseYoutubeId(previewId)}/maxresdefault.jpg`}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 p-5 border-t">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-slate-200 text-slate-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !title.trim() || !youtubeId.trim()}
            className="flex-1 bg-amber-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-amber-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Check size={15} />
            )}
            {isEdit ? "Update" : "Add Video"}
          </button>
        </div>
      </div>
    </div>
  );
}