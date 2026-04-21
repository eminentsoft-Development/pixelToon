"use client";

import { useEffect, useState, useCallback } from "react";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { GalleryShell, EmptyState } from "./GalleryShell";
import { apiRequest } from "@/lib/api";
import { EditModal } from "./EditModal";
import { MediaCard } from "./MediaCard";
import { UploadModal } from "./UploadModal";
import { SkeletonGrid } from "./SkeletonGrid";
import { PaginationControlled } from "@/components/Common/PaginationControlled";

export default function StudentsWork({ tabLabel, tabDescription }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchImages = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiRequest(
        `/api/gallery/images?category=students-work&page=${page}&limit=20`,
      );
      setItems(res.data || []);
      setPagination({
        current: res.pagination.currentPage,
        total: res.pagination.totalPages,
      });
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  const handlePageChange = (newPage) => {
    fetchImages(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Upload ────────────────────────────────────────────────────────────────
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
        icon={GraduationCap}
        totalCount={items.length}
        onUpload={() => setUploadOpen(true)}
      >
        {({ view }) => {
          if (loading) return <SkeletonGrid view={view} />;

          if (items.length === 0)
            return (
              <EmptyState
                icon={GraduationCap}
                message="No student works found"
                onUpload={() => setUploadOpen(true)}
              />
            );

          return (
            <>
              <div
                className={` 
                  ${view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "flex flex-col gap-2"}
                `}
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
              <PaginationControlled
                currentPage={pagination.current}
                totalPages={pagination.total}
                onPageChange={handlePageChange}
              />
            </>
          );
        }}
      </GalleryShell>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSuccess={handleUploadSuccess}
        accept="image/*"
        category="students-work"
        label="Students Works"
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
