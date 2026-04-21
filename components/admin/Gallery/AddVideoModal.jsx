"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, X, Loader2 } from "lucide-react";

export function VideoModal({ open, onClose, onSave, video = null }) {
  // Key pattern in parent ensures these reset automatically
  const [url, setUrl] = useState(video?.url || "");
  const [title, setTitle] = useState(video?.title || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getYoutubeId = (link) => {
    const m = link?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^#&?]*)/);
    return m ? m[1] : null;
  };
  const previewId = getYoutubeId(url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsSubmitting(true);
    await onSave({ 
      id: video?._id,
      title, 
      url,
      thumbnail: `https://i.ytimg.com/vi/${previewId}/maxresdefault.jpg`
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">{video ? "Edit Video" : "Add Video"}</h3>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5"/></button>
            </div>

            <div className="aspect-video w-full bg-gray-100 rounded-xl mb-6 overflow-hidden border border-gray-200 relative">
              {previewId ? (
                <img src={`https://i.ytimg.com/vi/${previewId}/mqdefault.jpg`} className="w-full h-full object-cover" alt="Preview"/>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-300">
                  <Video className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-xs">Paste YouTube link for preview</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#5b4fcf]/20 outline-none transition"
              />
              <input
                placeholder="YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#5b4fcf]/20 outline-none transition"
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 font-semibold text-gray-500">Cancel</button>
                <button 
                  type="submit"
                  disabled={isSubmitting || !url}
                  className="flex-1 py-3 bg-[#5b4fcf] text-white rounded-xl font-semibold hover:bg-[#4a3fb5] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {video ? "Update" : "Add Video"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}