"use client";

import { useState } from "react";
import { CalendarDays, Clock, ArrowLeft, Images } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { GalleryShell, EmptyState } from "./GalleryShell";
import { MediaCard } from "./MediaCard";
import { EventUploadModal } from "./EventUploadModal";
import { EditModal } from "./EditModal";

export function EventDetail({ event, onBack, onImagesChange }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null); // 👈 Track image being edited
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Delete Logic ---
  const handleDelete = async (imageId) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const updatedImages = event.images.filter((i) => i._id !== imageId);

      const res = await fetch(`/api/gallery/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: updatedImages }),
      });

      const json = await res.json();
      if (json.success) {
        onImagesChange(event._id, json.data.images);
        toast.success("Image removed from event");
      }
    } catch (error) {
      toast.error("Failed to remove image");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Edit Save Logic ---
  const handleEditSave = async ({ id, alt, url }) => {
    try {
      // Map through current images and update the specific one
      const updatedImages = event.images.map((img) =>
        img._id === id ? { ...img, alt, url } : img
      );

      const res = await fetch(`/api/gallery/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: updatedImages }),
      });

      const json = await res.json();

      if (json.success) {
        onImagesChange(event._id, json.data.images);
        toast.success("Image updated successfully");
        setEditingImage(null); // Close modal
      }
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-[#5b4fcf] hover:text-[#4a3fb5] mb-5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </button>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-xl bg-[#5b4fcf]/10 flex items-center justify-center shrink-0">
            <CalendarDays className="w-5 h-5 text-[#5b4fcf]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
            <div className="flex items-center gap-4 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />{" "}
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <GalleryShell
        tabLabel="Event Photos"
        tabDescription={`Photos from ${event.title}`}
        icon={Images}
        totalCount={event.images.length}
        onUpload={() => setUploadOpen(true)}
      >
        {({ view }) => {
          if (event.images.length === 0)
            return (
              <EmptyState
                icon={Images}
                message="No photos for this event yet"
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
              {[...event.images].reverse().map((item) => (
                <MediaCard
                  key={item._id}
                  item={item}
                  view={view}
                  onDelete={() => handleDelete(item._id)}
                  onEdit={() => setEditingImage(item)} // 👈 Open edit modal
                />
              ))}
            </div>
          );
        }}
      </GalleryShell>

      {/* --- Modals --- */}

      {/* 1. Upload Modal */}
      <EventUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        eventId={event._id}
        currentImages={event.images}
        onSuccess={(newImagesArray) => onImagesChange(event._id, newImagesArray)}
      />

      {/* 2. Edit Image Modal */}
      {editingImage && (
        <EditModal
          item={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={handleEditSave}
        />
      )}
    </motion.div>
  );
}