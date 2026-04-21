"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import EventModal from "./EventModal";
import { EventDetail } from "./EventDetail";
import { EventsList } from "./EventsList";

export default function LatestEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/gallery/events");
      const json = await res.json();
      if (json.success) setEvents(json.data);
    } catch {
      toast.error("Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      const item = events.find((i) => i._id === id);
      if (!item) return;

      setEvents((prev) => prev.filter((i) => i._id !== id));

      try {
        await fetch(`/api/gallery/events/${id}`, { method: "DELETE" });
        toast.success("Event deleted");
      } catch {
        setEvents((prev) => [...prev, item]);
        toast.error("Failed to delete event");
      }
    },
    [events],
  );

  const handleImagesChange = (eventId, newImages) => {
    setEvents((prev) =>
      prev.map((e) =>
        (e._id || e.id) === eventId ? { ...e, images: newImages } : e,
      ),
    );
    setSelectedEvent((prev) =>
      prev && (prev._id || prev.id) === eventId
        ? { ...prev, images: newImages }
        : prev,
    );
  };

  const handleSave = async (data) => {
    const isEditing = !!data.id;
    const endpoint = isEditing
      ? `/api/gallery/events/${data.id}`
      : "/api/gallery/events";

    try {
      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        if (isEditing) {
          setEvents((prev) =>
            prev.map((i) => ((i._id || i.id) === data.id ? json.data : i)),
          );
        } else {
          setEvents((prev) => [json.data, ...prev]);
        }
        return true;
      }
    } catch (error) {
      console.error("Save error:", error);
      throw error;
    }
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setAddEventOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setAddEventOpen(true);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {selectedEvent ? (
          <EventDetail
            key="detail"
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
            onImagesChange={handleImagesChange}
          />
        ) : (
          <EventsList
            key="list"
            events={events}
            onSelect={setSelectedEvent}
            onDelete={handleDelete}
            onEdit={openEditModal} // Pass edit handler to list
            onAddEvent={openAddModal}
          />
        )}
      </AnimatePresence>

      <EventModal
        open={addEventOpen}
        onClose={() => {
          setAddEventOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        initialData={editingEvent}
      />
    </div>
  );
}
