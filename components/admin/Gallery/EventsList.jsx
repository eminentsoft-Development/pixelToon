"use client";

import {
  CalendarDays,
  Trash2,
  Plus,
  Clock,
  Camera,
  Pencil,
} from "lucide-react";
import { motion } from "framer-motion";

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

const DeleteDialog = ({ children, onDelete, item }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
    <AlertDialogContent className="bg-bgColor text-white border-gray-600">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the image
          from the gallery and cloud storage.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onDelete?.(item._id)}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export function EventsList({ events, onSelect, onDelete, onAddEvent, onEdit }) {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5b4fcf]/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#5b4fcf]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Gallery Events
              </h2>
              <p className="text-sm text-gray-500">
                Click an event to view its photos
              </p>
            </div>
          </div>
          <button
            onClick={onAddEvent}
            className="flex items-center gap-1.5 text-xs font-medium text-[#5b4fcf] border border-[#5b4fcf]/30 px-3 py-2 rounded-xl hover:bg-[#5b4fcf]/5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Event
          </button>
        </div>

        <div className="space-y-3 p-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              layout
              onClick={() => onSelect(event)}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#5b4fcf]/30 hover:bg-[#5b4fcf]/5 transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#5b4fcf]/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-4 h-4 text-[#5b4fcf]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {event.title}
                </p>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
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

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400 hidden sm:inline">
                  {event.images.length} photo
                  {event.images.length !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event);
                }}
                className="text-red-500 transition"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                <DeleteDialog onDelete={onDelete} item={event}>
                  <button className="text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </DeleteDialog>
              </div>
            </motion.div>
          ))}

          {events.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              No events yet — add one above.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
