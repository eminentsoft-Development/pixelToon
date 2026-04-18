"use client";

import { useState } from "react";
import { Loader2, Check, X, Plus, ImageIcon } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { apiRequest } from "@/lib/api";

export default function EventModal({ event, onClose, onSave }) {
  const isEdit = Boolean(event?._id);

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [date, setDate] = useState(
    event?.date
      ? new Date(event.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [published, setPublished] = useState(event?.published ?? false);
  const [images, setImages] = useState(event?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpload = (files) => {
    const newImgs = files.map((f, i) => ({
      url: f.url,
      alt: "",
      order: images.length + i,
    }));
    setImages((prev) => [...prev, ...newImgs]);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSaving(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      date,
      published,
      images,
      coverImage: images[0]?.url ?? "",
    };

    const res = isEdit
      ? await apiRequest(`/api/gallery/events/${event._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await apiRequest("/api/gallery/events", {
          method: "POST",
          body: JSON.stringify(payload),
        });

    setSaving(false);
    if (res.success) onSave(res.data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b shrink-0">
          <h3 className="font-bold text-slate-800">
            {isEdit ? "Edit Event" : "Create Event"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Event Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
              placeholder="Annual Science Fair 2025…"
            />
          </div>

          {/* Date + Published */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setPublished((p) => !p)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    published ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      published ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-slate-600">Published</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition resize-none"
              placeholder="Brief description of this event…"
            />
          </div>

          {/* Photos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Event Photos ({images.length})
              </label>
              <UploadButton
                endpoint="imageUploader"
                onUploadBegin={() => setUploading(true)}
                onClientUploadComplete={(res) => {
                  setUploading(false);
                  handleUpload(res);
                }}
                onUploadError={() => setUploading(false)}
                appearance={{
                  button:
                    "h-7 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg",
                  allowedContent: "hidden",
                }}
                content={{
                  button: uploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <Plus size={12} />
                      <span>Photos</span>
                    </div>
                  ),
                }}
              />
            </div>

            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, idx) => (
                  <div
                    key={`${img.url}-${idx}`}
                    className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {uploading && (
                  <div className="aspect-video rounded-xl bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center animate-pulse">
                    <Loader2 size={16} className="text-emerald-400 animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={24} className="mb-1.5 opacity-40" />
                <p className="text-xs">Upload event photos above</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-5 border-t shrink-0">
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
            disabled={saving || !title.trim()}
            className="flex-1 bg-emerald-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-emerald-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Check size={15} />
            )}
            {isEdit ? "Update Event" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}