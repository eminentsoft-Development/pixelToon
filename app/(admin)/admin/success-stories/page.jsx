"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, Award, Trash2, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import Image from "next/image";

// Shadcn UI Imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function SuccessStoriesManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUpload, setTempUpload] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch Posters from DB
  const fetchPosters = async () => {
    try {
      const res = await fetch("/api/success-stories");
      const json = await res.json();
      if (json.success) {
        setImages(
          json.data.map((item) => ({
            url: item.imageUrl,
            alt: item.altText || "",
            id: item._id,
          })),
        );
      }
    } catch (error) {
      toast.error("Failed to load posters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  // 2. Handle Bulk Save from Modal
  const handleFinalSave = async () => {
    if (tempUpload.length === 0) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/success-stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posters: tempUpload.map((img) => ({
            imageUrl: img.url,
            altText: img.alt,
          })),
        }),
      });

      if (res.ok) {
        toast.success("New posters added successfully!");
        setTempUpload([]);
        setIsModalOpen(false);
        fetchPosters();
      }
    } catch (error) {
      toast.error("Error saving posters");
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Handle Deletion (DB + UploadThing)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/success-stories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Poster removed permanently");
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        toast.error("Failed to delete from server");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
    }
  };

  if (loading)
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );

  return (
    <div className="py-6 mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="text-indigo-600" /> Success Gallery
          </h1>
          <p className="text-slate-500 text-sm">
            Manage placement posters displayed on the Wall of Fame.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} /> Add New Poster
        </button>
      </div>

      {/* Grid List View */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              {/* Hover Overlay with Alert Dialog */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="p-3 bg-white rounded-xl text-red-600 hover:bg-red-50 transition-all shadow-xl">
                      <Trash2 size={20} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Poster?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove the image from the gallery
                        and your storage. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(img.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete Permanently
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
          <ImageIcon size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">
            No posters found. Click &quot;Add New Poster&quot; to begin.
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            {/* Header - Fixed */}
            <div className="p-6 border-b flex justify-between items-center bg-slate-50/50 flex-shrink-0">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                Upload New Posters
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTempUpload([]);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="p-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <ImageUpload
                value={tempUpload}
                onChange={(val) => setTempUpload(val)}
                multiple={true}
                maxImages={10}
              />
            </div>

            {/* Footer - Fixed */}
            <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTempUpload([]);
                }}
                className="px-6 py-2 text-slate-500 font-bold hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalSave}
                disabled={tempUpload.length === 0 || isSaving}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 flex items-center gap-2 transition-all"
              >
                {isSaving && <Loader2 className="animate-spin" size={18} />}
                Publish{" "}
                {tempUpload.length > 0 ? `${tempUpload.length} Posters` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
