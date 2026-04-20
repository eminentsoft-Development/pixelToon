import { useEffect, useState } from "react";
import { AddVideoModal } from "./AddVideoModal";
import { EmptyState, GalleryShell } from "./GalleryShell";
import { VideoCard } from "./VideoCard";
import { Video } from "lucide-react";

export default function VideosGallery({ tabLabel, tabDescription }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  // 1. Get All Videos
  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/gallery/videos");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (error) {
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // 2. Add Video Logic
  const handleAddVideo = async (videoData) => {
    try {
      const res = await fetch("/api/gallery/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => [json.data, ...prev]); // Optimistic update
        toast.success("Video added successfully");
        setModalOpen(false);
      } else {
        toast.error(json.error);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // 3. Delete Video Logic
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/gallery/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
        toast.success("Video removed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <GalleryShell
        tabLabel={tabLabel}
        tabDescription={tabDescription}
        icon={Video}
        totalCount={items.length}
        onUpload={() => setModalOpen(true)}
        uploadLabel="Add Video"
        activeFilter={items}
        onFilterChange={setFilter}
      >
        {({ view, search }) => {
          

          if (items.length === 0)
            return (
              <EmptyState
                icon={Video}
                message="No videos added yet"
                onUpload={() => setModalOpen(true)}
              />
            );

          return (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-2"
              }
            >
              {items.map((item) => (
                <VideoCard
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

      <AddVideoModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddVideo}/>
    </>
  );
}