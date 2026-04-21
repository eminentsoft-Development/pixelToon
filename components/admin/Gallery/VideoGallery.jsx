"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { VideoCard } from "./VideoCard";
import { GalleryShell } from "./GalleryShell";
import { VideoModal } from "./AddVideoModal";
import { Video } from "lucide-react";

export default function VideosGallery({ tabLabel, tabDescription }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/gallery/videos");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch {
      toast.error("Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openAddModal = () => {
    setEditingVideo(null);
    setModalOpen(true);
  };

  const openEditModal = (video) => {
    setEditingVideo(video);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    const isEditing = !!data.id;
    const endpoint = isEditing
      ? `/api/gallery/videos/${data.id}`
      : "/api/gallery/videos";

    try {
      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        if (isEditing) {
          setItems((prev) =>
            prev.map((i) => (i._id === data.id ? json.data : i)),
          );
          toast.success("Video updated");
        } else {
          setItems((prev) => [json.data, ...prev]);
          toast.success("Video added");
        }
      }
    } catch {
      toast.error("Action failed");
    }
  };

    const handleDelete = useCallback(
      async (id) => {
        const item = items.find((i) => i._id === id);
        if (!item) return;
  
        // Optimistic update — remove from UI immediately
        setItems((prev) => prev.filter((i) => i._id !== id));
  
        try {
          await fetch(`/api/gallery/videos/${id}`, { method: "DELETE" });
  
          // 2. Delete from UploadThing storage
          await fetch("/api/uploadthing/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: item.url }),
          });
  
          toast.success("Video deleted");
        } catch {
          // Rollback on failure
          setItems((prev) => [...prev, item]);
          toast.error("Failed to delete video");
        }
      },
      [items],
    );
  

  return (
    <>
      <GalleryShell
        onUpload={openAddModal}
        tabLabel={tabLabel}
        tabDescription={tabDescription}
        icon={Video}
        totalCount={items.length}
        uploadLabel="Add Video"
      >
        {({ view }) => (
          
          <div
            className={
              view === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-2"
            }
          >
            {items.map((item) => (
              <VideoCard
                key={item._id}
                item={item}
                onEdit={() => openEditModal(item)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </GalleryShell>

      <VideoModal
        key={editingVideo?._id || "new"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        video={editingVideo}
      />
    </>
  );
}
