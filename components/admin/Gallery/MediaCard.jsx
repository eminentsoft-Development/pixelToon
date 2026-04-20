import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
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

// 1. DECLARE OUTSIDE THE RENDER FUNCTION
const DeleteDialog = ({ children, onDelete, item }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      {children}
    </AlertDialogTrigger>
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

export function MediaCard({ item, onDelete, onEdit, view }) {
  
  if (view === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-[#5b4fcf]/30 hover:shadow-sm transition group"
      >
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
          <Image
            src={item.url || item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {item.title || item.alt || "Untitled"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {item.size || "—"} · {item.date || "—"}
          </p>
        </div>

        <button
          onClick={() => onEdit?.(item)}
          className="text-gray-400 hover:text-[#5b4fcf] p-1.5 rounded-lg transition"
        >
          <Pencil className="w-4 h-4" />
        </button>

        {/* 3. Pass the props down here */}
        <DeleteDialog onDelete={onDelete} item={item}>
          <button className="p-2 text-gray-400 hover:text-red-500 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </DeleteDialog>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#5b4fcf]/40 hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={item.url}
          alt={item.alt || "Artwork image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3">
          <button
            onClick={() => onEdit?.(item)}
            className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-lg transition"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* 4. Use the component again here */}
          <DeleteDialog onDelete={onDelete} item={item}>
            <button className="text-white bg-red-500/70 ml-2 hover:bg-red-50 backdrop-blur-sm p-1.5 rounded-lg transition hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </DeleteDialog>
        </div>
      </div>

      <div className="px-3 py-2.5">
        <p className="text-xs text-gray-400 hover:text-[#5b4fcf] transition truncate block w-full text-left">
          {item.alt || "No alt text…"}
        </p>
      </div>
    </motion.div>
  );
}