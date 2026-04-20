"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { GalleryShell, EmptyState } from "./GalleryShell";
import { apiRequest } from "@/lib/api";
import { MediaCard } from "./MediaCard";
import { UploadModal } from "./UploadModal";
import { SkeletonGrid } from "./SkeletonGrid";
import { EditModal } from "./EditModal";

export default function StudentsLifeEvents({ tabLabel, tabDescription }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(
        `/api/gallery/images?category=students-life`,
      );
      setItems(res.data || []);
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUploadSuccess = useCallback(() => {
    setUploadOpen(false);
    fetchImages();
  }, [fetchImages]);

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = useCallback(
    async (id) => {
      const item = items.find((i) => i._id === id);
      if (!item) return;

      // Optimistic update — remove from UI immediately
      setItems((prev) => prev.filter((i) => i._id !== id));

      try {
        // 1. Delete from MongoDB
        console.log("Attempting to delete image with ID:", id);

        await fetch(`/api/gallery/images/${id}`, { method: "DELETE" });

        // 2. Delete from UploadThing storage
        await fetch("/api/uploadthing/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: item.url }),
        });

        toast.success("Image deleted");
      } catch {
        // Rollback on failure
        setItems((prev) => [...prev, item]);
        toast.error("Failed to delete image");
      }
    },
    [items],
  );

  // ── Edit ─────────────────────────────────────────────────────────────────
  const handleEditSave = useCallback(async ({ id, alt, url, oldUrl }) => {
    try {
      // 1. Update MongoDB record
      const res = await fetch(`/api/gallery/images/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt, url }),
      });
      const { data: updated } = await res.json();

      // 2. If image was replaced, delete the old file from UploadThing
      if (oldUrl && oldUrl !== url) {
        await fetch("/api/uploadthing/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: oldUrl }),
        });
      }

      // 3. Update local state in-place — no refetch needed
      setItems((prev) => prev.map((i) => (i._id === id ? updated : i)));
      setEditItem(null);
      toast.success("Image updated");
    } catch {
      toast.error("Failed to update image");
    }
  }, []);

  return (
    <>
      <GalleryShell
        tabLabel={tabLabel}
        tabDescription={tabDescription}
        icon={Heart}
        totalCount={items.length}
        onUpload={() => setUploadOpen(true)}
      >
        {({ view }) => {
          if (loading) return <SkeletonGrid view={view} />;

          if (items.length === 0)
            return (
              <EmptyState
                icon={Heart}
                message="No student life events found"
                onUpload={() => setUploadOpen(true)}
              />
            );

          return (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                  : "flex flex-col gap-2"
              }
            >
              {items.map((item) => (
                <MediaCard
                 key={item._id}
                  item={item}
                  view={view}
                  onDelete={handleDelete}
                  onEdit={() => setEditItem(item)}
                />
              ))}
            </div>
          );
        }}
      </GalleryShell>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSuccess={handleUploadSuccess}
        accept="image/*"
        category="students-life"
        label="Students Life Events"
      />

      {/* Edit Modal */}
      <EditModal
        key={editItem?._id}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleEditSave}
      />
    </>
  );
}
