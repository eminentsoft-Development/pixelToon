import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
});

function EventModal({ open, onClose, onSave, initialData = null }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      date: initialData ? initialData.date.split("T")[0] : "",
    },
  });

  React.useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || "",
        description: initialData?.description || "",
        date: initialData ? initialData.date.split("T")[0] : "",
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data) => {
    try {
      await onSave({
        ...data,
        id: initialData?._id,
      });
      toast.success(initialData ? "Event updated!" : "Event created!");
      onClose();
    } catch (error) {
      toast.error("Action failed");
    }
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                {initialData ? "Edit Event" : "Add Event"}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              {/* Event Title */}
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 block mb-1.5">
                  Event Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="e.g. Annual Day 2024"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                    errors.title 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-[#5b4fcf]/30 focus:border-[#5b4fcf]"
                  }`}
                />
                {errors.title && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Event Description */}
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 block mb-1.5">
                  Event Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="e.g. Celebrating our annual event"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                    errors.description 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-[#5b4fcf]/30 focus:border-[#5b4fcf]"
                  }`}
                />
                {errors.description && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Date */}
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 block mb-1.5">
                  Date
                </label>
                <input
                  {...register("date")}
                  type="date"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                    errors.date 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-[#5b4fcf]/30 focus:border-[#5b4fcf]"
                  }`}
                />
                {errors.date && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.date.message}</p>
                )}
              </div>

              <div className="flex gap-3 mt-5 col-span-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#5b4fcf] rounded-xl hover:bg-[#4a3fb5] transition flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {initialData ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EventModal;