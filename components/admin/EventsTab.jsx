"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import EventModal from "./EventModal";
import { apiRequest } from "@/lib/api";

export default function EventsTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | {} (new) | event object (edit)

  // ✅ Fixed: plain async function inside effect, no useCallback
  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setLoading(true);
      const res = await apiRequest("/api/gallery/events");
      if (!cancelled) {
        setEvents(res.data || []);
        setLoading(false);
      }
    }

    fetchEvents();
    return () => { cancelled = true; };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this event and all its photos?")) return;
    await apiRequest(`/api/gallery/events/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e._id !== id));
  };

  const togglePublish = async (event) => {
    const res = await apiRequest(`/api/gallery/events/${event._id}`, {
      method: "PATCH",
      body: JSON.stringify({ action: "togglePublish" }),
    });
    if (res.success) {
      setEvents((prev) =>
        prev.map((e) => (e._id === event._id ? res.data : e))
      );
    }
  };

  const handleSave = (saved) => {
    setEvents((prev) => {
      const idx = prev.findIndex((e) => e._id === saved._id);
      return idx >= 0
        ? prev.map((e, i) => (i === idx ? saved : e))
        : [saved, ...prev];
    });
    setModal(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          {events.length} event{events.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={() => setModal({})}
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
        >
          <Plus size={14} /> New Event
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
          <Calendar size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">No events yet</p>
          <p className="text-xs mt-1">Create your first event above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 p-4">
                {/* Cover thumbnail */}
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  {event.coverImage || event.images?.[0]?.url ? (
                    <img
                      src={event.coverImage || event.images[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={20} className="text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                          {event.title}
                        </h4>
                        {event.published ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                            Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 flex-wrap">
                        <Clock size={10} />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        <span className="mx-1">·</span>
                        <ImageIcon size={10} />
                        {event.images?.length || 0} photos
                      </p>
                      {event.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => togglePublish(event)}
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          event.published
                            ? "text-emerald-500 hover:bg-emerald-50"
                            : "text-slate-400 hover:bg-slate-50"
                        )}
                        title={event.published ? "Unpublish" : "Publish"}
                      >
                        {event.published ? (
                          <Eye size={14} />
                        ) : (
                          <EyeOff size={14} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setModal(event)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(event._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Image strip */}
                  {event.images?.length > 0 && (
                    <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-0.5">
                      {event.images.slice(0, 8).map((img, i) => (
                        <div
                          key={`${img.url}-${i}`}
                          className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-100"
                        >
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {event.images.length > 8 && (
                        <div className="w-9 h-9 rounded-lg bg-slate-100 shrink-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-slate-500">
                            +{event.images.length - 8}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <EventModal
          event={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}