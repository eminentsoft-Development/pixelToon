"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Save, ImageIcon } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableImageCard from "./SortableImageCard";
import { apiRequest } from "@/lib/api";

export default function ImageGalleryTab({ category }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ✅ Fixed: fetch runs inside effect, no useCallback wrapper that triggers linter
  useEffect(() => {
    let cancelled = false;

    async function fetchImages() {
      setLoading(true);
      const res = await apiRequest(`/api/gallery/images?category=${category}`);
      if (!cancelled) {
        setImages(res.data || []);
        setLoading(false);
      }
    }

    fetchImages();
    return () => { cancelled = true; };
  }, [category]);

  const handleUpload = async (files) => {
    const newImgs = files.map((f, i) => ({
      url: f.url,
      alt: "",
      category,
      order: images.length + i,
    }));

    await Promise.all(
      newImgs.map((img) =>
        apiRequest("/api/gallery/images", {
          method: "POST",
          body: JSON.stringify(img),
        })
      )
    );

    // Re-fetch to get server-assigned IDs
    const res = await apiRequest(`/api/gallery/images?category=${category}`);
    setImages(res.data || []);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    await apiRequest(`/api/gallery/images/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => (i._id || i.url) !== id));
  };

  const handleAltEdit = async (id, alt) => {
    await apiRequest(`/api/gallery/images/${id}`, {
      method: "PUT",
      body: JSON.stringify({ alt }),
    });
    setImages((prev) =>
      prev.map((i) => ((i._id || i.url) === id ? { ...i, alt } : i))
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => (i._id || i.url) === active.id);
    const newIndex = images.findIndex((i) => (i._id || i.url) === over.id);
    setImages(arrayMove(images, oldIndex, newIndex));
    setDirty(true);
  };

  const saveOrder = async () => {
    setSaving(true);
    await apiRequest("/api/gallery/images", {
      method: "PATCH",
      body: JSON.stringify({
        items: images.map((img, idx) => ({ _id: img._id, order: idx })),
      }),
    });
    setSaving(false);
    setDirty(false);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </p>
        <div className="flex gap-2 items-center">
          {dirty && (
            <button
              type="button"
              onClick={saveOrder}
              disabled={saving}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}
              Save Order
            </button>
          )}
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
                "h-8 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all",
              allowedContent: "hidden",
            }}
            content={{
              button: uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center gap-1">
                  <Plus size={14} />
                  <span>Upload</span>
                </div>
              ),
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : images.length === 0 && !uploading ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
          <ImageIcon size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">No images yet</p>
          <p className="text-xs mt-1">Upload your first image above</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((i) => i._id || i.url)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <SortableImageCard
                  key={img._id || img.url}
                  item={img}
                  onDelete={handleDelete}
                  onAltEdit={handleAltEdit}
                />
              ))}
              {uploading && (
                <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 flex items-center justify-center animate-pulse">
                  <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}