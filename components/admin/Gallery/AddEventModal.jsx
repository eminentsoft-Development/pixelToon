"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Users, Trash2, Eye, EyeOff, Plus, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { EmptyState, GalleryShell } from "./GalleryShell";
import { MediaCard } from "./MediaCard";
import { UploadModal } from "./UploadModal";

const EVENT_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80", alt: "Tech Summit", title: "Tech Summit 2024", published: true, date: "Apr 18", size: "2.1 MB" },
  { id: 2, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80", alt: "Cultural Night", title: "Cultural Night", published: true, date: "Apr 15", size: "3.4 MB" },
  { id: 3, src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&q=80", alt: "Workshop", title: "Design Workshop", published: false, date: "Apr 10", size: "1.8 MB" },
  { id: 4, src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80", alt: "Seminar", title: "AI Seminar Series", published: true, date: "Apr 8", size: "2.9 MB" },
];

const UPCOMING_EVENTS = [
  { id: 1, title: "Inter-College Hackathon", date: "Apr 25, 2024", location: "Auditorium Hall A", attendees: 120, status: "upcoming" },
  { id: 2, title: "Photography Exhibition", date: "May 2, 2024", location: "Art Gallery", attendees: 80, status: "upcoming" },
  { id: 3, title: "Alumni Meet 2024", date: "May 10, 2024", location: "Main Campus", attendees: 350, status: "upcoming" },
];

const FILTERS = ["All", "Published", "Draft"];

function AddEventModal({ open, onClose }) {
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">Add Event</h3>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Event Title", placeholder: "e.g. Annual Day 2024", col: "col-span-2" },
                { label: "Date", placeholder: "dd / mm / yyyy", type: "date", col: "" },
                { label: "Time", placeholder: "HH:MM", type: "time", col: "" },
                { label: "Location", placeholder: "e.g. Auditorium", col: "col-span-2" },
                { label: "Expected Attendees", placeholder: "e.g. 200", type: "number", col: "" },
              ].map((field) => (
                <div key={field.label} className={field.col}>
                  <label className="text-xs font-medium text-gray-600 block mb-1.5">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30 focus:border-[#5b4fcf] transition"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => { toast.success("Event created!"); onClose(); }} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#5b4fcf] rounded-xl hover:bg-[#4a3fb5] transition">
                Create Event
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LatestEvents({ tabLabel, tabDescription }) {
  const [images, setImages] = useState(EVENT_IMAGES);
  const [events, setEvents] = useState(UPCOMING_EVENTS);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
    toast.success("Image removed");
  };

  const handleTogglePublish = (id) => {
    setImages((prev) =>
      prev.map((i) => (i.id === id ? { ...i, published: !i.published } : i))
    );
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event removed");
  };

  const filtered = images.filter((i) => {
    if (filter === "Published") return i.published;
    if (filter === "Draft") return !i.published;
    return true;
  });

  return (
    <>
      <div className="space-y-6">
        {/* Upcoming Events Cards */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Upcoming Events</h3>
              <p className="text-xs text-gray-400 mt-0.5">Scheduled events appearing on the site</p>
            </div>
            <button
              onClick={() => setAddEventOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#5b4fcf] border border-[#5b4fcf]/30 px-3 py-2 rounded-xl hover:bg-[#5b4fcf]/5 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Event
            </button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <motion.div
                key={event.id}
                layout
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#5b4fcf]/20 hover:bg-[#5b4fcf]/5 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#5b4fcf]/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-[#5b4fcf]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{event.title}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" /> {event.attendees} attendees
                    </span>
                  </div>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-medium shrink-0">
                  Upcoming
                </span>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-1.5 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No upcoming events</p>
            )}
          </div>
        </div>

        {/* Event Photos */}
        <GalleryShell
          tabLabel="Event Photos"
          tabDescription="Photos from recent and past events"
          icon={CalendarDays}
          totalCount={filtered.length}
          onUpload={() => setUploadOpen(true)}
          filters={FILTERS}
          activeFilter={filter}
          onFilterChange={setFilter}
        >
          {({ view, search }) => {
            const displayed = filtered.filter(
              (i) =>
                !search ||
                i.title?.toLowerCase().includes(search.toLowerCase()) ||
                i.alt?.toLowerCase().includes(search.toLowerCase())
            );

            if (displayed.length === 0)
              return (
                <EmptyState
                  icon={CalendarDays}
                  message="No event photos yet"
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
                {displayed.map((item) => (
                  <MediaCard
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
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        accept="image/*"
        label="event photos"
      />
      <AddEventModal open={addEventOpen} onClose={() => setAddEventOpen(false)} />
    </>
  );
}