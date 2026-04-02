"use client";

import Image from "next/image";
import { X, Loader2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SortableImage({
  item,
  index,
  onRemove,
  onAltChange,
  deleting,
  multiple,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group space-y-2 border rounded-xl p-2 bg-white border-slate-200 transition-all shadow-sm",
        isDragging && "opacity-50 scale-105 shadow-2xl ring-2 ring-indigo-500",
        !multiple && "max-w-md mx-auto"
      )}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
        {/* Drag Handle - only visible/active if multiple */}
        {multiple && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 z-30 p-1.5 bg-white/90 backdrop-blur rounded-md shadow-sm cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <GripVertical className="h-4 w-4 text-slate-600" />
          </div>
        )}

        {multiple && index === 0 && (
          <div className="absolute top-2 right-12 z-20 bg-indigo-600 text-[10px] text-white px-2 py-0.5 rounded-full font-bold tracking-wider">
            PRIMARY
          </div>
        )}

        <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            type="button"
            disabled={deleting}
            onClick={() => onRemove(item.url)}
            variant="destructive"
            size="icon"
            className="h-7 w-7 rounded-full shadow-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {deleting && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        )}

        <Image
          fill
          src={item.url}
          alt={item.alt || "Uploaded image"}
          className="object-cover"
        />
      </div>

      <div className="space-y-1 px-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          SEO Alt Text
        </label>
        <Input
          placeholder="Describe this image..."
          value={item.alt}
          onChange={(e) => onAltChange(item.url, e.target.value)}
          className="h-8 text-xs bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
}