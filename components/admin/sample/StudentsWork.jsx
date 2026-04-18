"use client";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import {
  GalleryShell,
  MediaCard,
  UploadModal,
  EmptyState,
} from "./GalleryShell";
import { apiRequest } from "@/lib/api";

export default function StudentsWork({ tabLabel, tabDescription }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const res = await apiRequest(
        `/api/gallery/images?category=students-work`,
      );
      setItems(res.data || []);
      setLoading(false);
    }

    fetchImages();
  }, []);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
    toast.success("Image deleted");
  };

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
          if (loading) {
            return (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "flex flex-col gap-2"
                }
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gray-200 animate-pulse rounded-xl ${
                      view === "grid" ? "aspect-[4/3] w-full" : "h-20 w-full"
                    }`}
                  />
                ))}
              </div>
            );
          }

          if (items.length === 0)
            return (
              <EmptyState
                icon={GraduationCap}
                message="No student artwork found"
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
                />
              ))}
            </div>
          );
        }}
      </GalleryShell>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        accept="image/*"
        label="artwork images"
      />
    </>
  );
}
