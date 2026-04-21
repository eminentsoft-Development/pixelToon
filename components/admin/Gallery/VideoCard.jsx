import { Clock, ExternalLink, Pencil, Play, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
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

export function VideoCard({ item, onDelete, onEdit, view }) {
  if (view === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-[#5b4fcf]/30 hover:shadow-sm transition group"
      >
        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {item.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
            <Clock className="w-3 h-3" /> {item.duration} · {item.views} views ·{" "}
            {item.date}
          </p>
        </div>

        <button
          onClick={() => onEdit(item)}
          className="bg-bgColor hover:bg-bgColor backdrop-blur-sm text-white p-1.5 rounded-lg transition"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <DeleteDialog onDelete={onDelete} item={item}>
          <button
            className="p-2 text-gray-400 hover:text-red-500 transition"
          >
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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#5b4fcf]/40 hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover object-center scale-110 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 text-[#5b4fcf] fill-[#5b4fcf] ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {item.duration}
        </div>

        {/* Hover actions */}
        <div className="absolute top-2 right-2 transition-opacity flex gap-1.5">
          <button
            onClick={() => onEdit(item)}
            className="bg-bgColor hover:bg-bgColor backdrop-blur-sm text-white p-1.5 rounded-lg transition"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <DeleteDialog onDelete={onDelete} item={item}>
            <button className="bg-red-500/70 hover:bg-red-500 backdrop-blur-sm text-white p-1.5 rounded-lg transition">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </DeleteDialog>
        </div>
      </div>

      <div className="px-3 py-3">
        <p className="text-sm font-medium text-gray-800 truncate mb-1">
          {item.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {item.views} views · {item.date}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="text-[#5b4fcf] hover:text-[#4a3fb5] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
