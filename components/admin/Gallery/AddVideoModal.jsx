"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Video, X } from "lucide-react";


export function AddVideoModal({ open, onClose, onAdd }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate thumbnail preview
  const getYoutubeId = (link) => {
    const m = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^#&?]*)/);
    return m ? m[1] : null;
  };
  const previewId = getYoutubeId(url);

  const handleSubmit = async () => {
    if (!url) return toast.error("URL is required");
    setIsSubmitting(true);
    await onAdd({ title, url });
    setIsSubmitting(false);
    setUrl("");
    setTitle("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-hidden">
            <h3 className="text-lg font-bold mb-4">Add YouTube Video</h3>
            
            {/* Thumbnail Preview Area */}
            <div className="aspect-video w-full bg-gray-100 rounded-xl mb-4 overflow-hidden border border-gray-200 relative">
              {previewId ? (
                <img 
                  src={`https://i.ytimg.com/vi/${previewId}/mqdefault.jpg`} 
                  className="w-full h-full object-cover" 
                  alt="Preview"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Video className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-xs">Paste a link to see preview</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <input
                placeholder="Video Title (Optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#5b4fcf]/20 transition"
              />
              <input
                placeholder="YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#5b4fcf]/20 transition"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={onClose} className="flex-1 py-3 text-sm font-semibold text-gray-500">Cancel</button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !url}
                className="flex-1 py-3 bg-[#5b4fcf] text-white rounded-xl font-semibold hover:bg-[#4a3fb5] disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add to Gallery"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}