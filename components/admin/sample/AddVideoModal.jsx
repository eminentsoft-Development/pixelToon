"use client";

import { useState } from "react";
import { Video, Play, Clock, ExternalLink, Pencil, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { GalleryShell, EmptyState } from "./GalleryShell";

const INITIAL_VIDEOS = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&q=80",
    title: "Annual Day Highlights 2024",
    duration: "12:34",
    url: "https://youtube.com",
    published: true,
    date: "Apr 14",
    views: "1.2k",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
    title: "Campus Tour – New Block",
    duration: "5:20",
    url: "https://youtube.com",
    published: true,
    date: "Apr 10",
    views: "840",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1574717024453-354056aada85?w=400&q=80",
    title: "Workshop: 3D Modelling Basics",
    duration: "45:10",
    url: "https://youtube.com",
    published: false,
    date: "Apr 7",
    views: "—",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869ad10e2ab?w=400&q=80",
    title: "Student Testimonials 2024",
    duration: "8:55",
    url: "https://youtube.com",
    published: true,
    date: "Apr 2",
    views: "3.4k",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    title: "Farewell Ceremony Recap",
    duration: "20:00",
    url: "https://youtube.com",
    published: false,
    date: "Mar 30",
    views: "—",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80",
    title: "Entrepreneurship Summit",
    duration: "1:02:18",
    url: "https://youtube.com",
    published: true,
    date: "Mar 25",
    views: "5.1k",
  },
];

const FILTERS = ["All", "Published", "Draft"];

function AddVideoModal({ open, onClose }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">Add Video</h3>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Day Highlights"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30 focus:border-[#5b4fcf] transition"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">YouTube / Video URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30 focus:border-[#5b4fcf] transition"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={() => { toast.success("Video added!"); onClose(); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#5b4fcf] rounded-xl hover:bg-[#4a3fb5] transition"
              >
                Add Video
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoCard({ item, onDelete, onTogglePublish, view }) {
  if (view === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-[#5b4fcf]/30 hover:shadow-sm transition group"
      >
        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
            <Clock className="w-3 h-3" /> {item.duration} · {item.views} views · {item.date}
          </p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
          {item.published ? "Live" : "Draft"}
        </span>
        <button onClick={() => onTogglePublish(item.id)} className="p-2 text-gray-400 hover:text-[#5b4fcf] transition">
          {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition">
          <Trash2 className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#5b4fcf]/40 hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 text-[#5b4fcf] fill-[#5b4fcf] ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {item.duration}
        </div>
        <div className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${item.published ? "bg-green-500 text-white" : "bg-gray-700/70 text-white"}`}>
          {item.published ? "Live" : "Draft"}
        </div>
        {/* Hover actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
          <button onClick={() => onTogglePublish(item.id)} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 rounded-lg transition">
            {item.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => onDelete(item.id)} className="bg-red-500/70 hover:bg-red-500 backdrop-blur-sm text-white p-1.5 rounded-lg transition">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="px-3 py-3">
        <p className="text-sm font-medium text-gray-800 truncate mb-1">{item.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{item.views} views · {item.date}</span>
          <a href={item.url} target="_blank" rel="noreferrer" className="text-[#5b4fcf] hover:text-[#4a3fb5] transition">
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideosGallery({ tabLabel, tabDescription }) {
  const [items, setItems] = useState(INITIAL_VIDEOS);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Video removed");
  };

  const handleTogglePublish = (id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, published: !i.published } : i))
    );
    const item = items.find((i) => i.id === id);
    toast.success(item?.published ? "Moved to draft" : "Published!");
  };

  const filtered = items.filter((i) => {
    if (filter === "Published") return i.published;
    if (filter === "Draft") return !i.published;
    return true;
  });

  return (
    <>
      <GalleryShell
        tabLabel={tabLabel}
        tabDescription={tabDescription}
        icon={Video}
        totalCount={filtered.length}
        onUpload={() => setModalOpen(true)}
        uploadLabel="Add Video"
        filters={FILTERS}
        activeFilter={filter}
        onFilterChange={setFilter}
      >
        {({ view, search }) => {
          const displayed = filtered.filter(
            (i) => !search || i.title?.toLowerCase().includes(search.toLowerCase())
          );

          if (displayed.length === 0)
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
              {displayed.map((item) => (
                <VideoCard
                  key={item.id}
                  item={item}
                  view={view}
                  onDelete={handleDelete}
                  onTogglePublish={handleTogglePublish}
                />
              ))}
            </div>
          );
        }}
      </GalleryShell>

      <AddVideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}