"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, ExternalLink, Film, Loader2 } from "lucide-react";
import VideoModal from "./VideoModal";
import { apiRequest } from "@/lib/api";

export default function VideosTab() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | {} (new) | video object (edit)

  // ✅ Fixed: plain async function inside effect, no useCallback
  useEffect(() => {
    let cancelled = false;

    async function fetchVideos() {
      setLoading(true);
      const res = await apiRequest("/api/gallery/videos");
      if (!cancelled) {
        setVideos(res.data || []);
        setLoading(false);
      }
    }

    fetchVideos();
    return () => { cancelled = true; };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this video?")) return;
    await apiRequest(`/api/gallery/videos/${id}`, { method: "DELETE" });
    setVideos((prev) => prev.filter((v) => v._id !== id));
  };

  const handleSave = (video) => {
    setVideos((prev) => {
      const idx = prev.findIndex((v) => v._id === video._id);
      return idx >= 0
        ? prev.map((v, i) => (i === idx ? video : v))
        : [video, ...prev];
    });
    setModal(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          {videos.length} video{videos.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={() => setModal({})}
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
        >
          <Plus size={14} /> Add Video
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
          <Film size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">No videos yet</p>
          <p className="text-xs mt-1">Add your first YouTube video above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <div
              key={video._id}
              className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                {video.thumbnail && (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                )}
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-3 flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-700 line-clamp-2 flex-1">
                  {video.title}
                </p>
                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setModal(video)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(video._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <VideoModal
          video={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}