"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function EventUploadModal({
  open,
  onClose,
  onSuccess,
  eventId, // The specific event to update
  currentImages = [], // Existing images in the event
  accept = "image/*",
  endpoint = "imageUploader",
  label = "event photos",
}) {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // { file, preview, alt }
  const fileRef = useRef();

  useEffect(() => {
    return () => {
      selectedFiles.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [selectedFiles]);

  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: async (res) => {
      try {
        // 1. Prepare the new images from the upload response
        const newImages = res.map((file, index) => ({
          url: file.url,
          alt: selectedFiles[index].alt ?? "",
        }));

        // 2. Combine with existing images and update the Event
        const updatedImages = [...currentImages, ...newImages];

        const response = await fetch(`/api/gallery/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: updatedImages }),
        });

        const json = await response.json();

        if (json.success) {
          toast.success("Event photos updated!");
          setSelectedFiles([]);
          onClose();
          onSuccess?.(json.data.images); // Pass the new images array back to UI
        } else {
          throw new Error(json.error);
        }
      } catch (error) {
        toast.error("Failed to update event images.");
        console.error(error);
      }
    },
    onUploadError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const processFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: "",
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleAltChange = (index, value) => {
    const updated = [...selectedFiles];
    updated[index].alt = value;
    setSelectedFiles(updated);
  };

  const removeFile = (index) => {
    const updated = [...selectedFiles];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    const filesToUpload = selectedFiles.map((item) => item.file);
    await startUpload(filesToUpload);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                Add to {label}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-20 text-center cursor-pointer transition-all mb-4 ${
                  dragging
                    ? "border-[#5b4fcf] bg-[#5b4fcf]/5"
                    : "border-gray-200 hover:border-[#5b4fcf]/50 hover:bg-gray-50"
                }`}
              >
                <Upload
                  className={`w-8 h-8 mx-auto mb-3 ${
                    dragging ? "text-[#5b4fcf]" : "text-gray-300"
                  }`}
                />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Drag & drop event photos here
                </p>
                <p className="text-xs text-gray-400">or click to browse</p>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept={accept}
                  className="hidden"
                  onChange={(e) => processFiles(e.target.files)}
                />
              </div>

              <div className="space-y-4">
                {selectedFiles.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 relative group"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <Image
                        src={item.preview}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1 block">
                        Alt Text (SEO)
                      </label>
                      <input
                        type="text"
                        placeholder="Describe this photo..."
                        value={item.alt}
                        onChange={(e) => handleAltChange(index, e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/20 focus:border-[#5b4fcf]"
                      />
                    </div>

                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#5b4fcf] rounded-xl hover:bg-[#4a3fb5] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  `Upload ${
                    selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""
                  }`
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}