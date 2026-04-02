"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Loader2, Plus, LayoutGrid } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// DnD Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableImage } from "./SortableImage";

export default function ImageUpload({
  value = [], // Expected: Array of { url: string, alt: string }
  onChange,
  multiple = false,
  maxImages = 5,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => setMounted(true), []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    if (!multiple) return;
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.findIndex((item) => item.url === active.id);
      const newIndex = value.findIndex((item) => item.url === over.id);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  const handleRemove = async (url) => {
    setDeleting(url);
    try {
      // Optional: Add your API delete call here
      onChange(value.filter((item) => item.url !== url));
    } finally {
      setDeleting(null);
    }
  };

  const handleAltChange = (url, newAlt) => {
    const newValue = value.map((item) =>
      item.url === url ? { ...item, alt: newAlt } : item
    );
    onChange(newValue);
  };

  if (!mounted) {
    return <div className="h-64 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl animate-pulse" />;
  }

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50/50 py-3 px-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-indigo-600" />
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-widest">
            {multiple ? "Image Gallery" : "Featured Image"}
          </CardTitle>
        </div>

        {(multiple ? value.length < maxImages : value.length < 1) && (
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={(res) => {
              setIsUploading(false);
              const newItems = res.map((f) => ({ url: f.url, alt: "" }));
              onChange(multiple ? [...value, ...newItems].slice(0, maxImages) : [newItems[0]]);
            }}
            onUploadError={() => setIsUploading(false)}
            appearance={{
              button: "h-8 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md shadow-sm transition-all",
              allowedContent: "hidden",
            }}
            content={{
              button: isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center gap-1">
                  <Plus size={14} /> <span>Upload</span>
                </div>
              ),
            }}
          />
        )}
      </CardHeader>

      <CardContent className="p-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className={cn(
            "grid gap-4",
            multiple ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
          )}>
            <SortableContext 
              items={value.map(v => v.url)} 
              strategy={rectSortingStrategy}
            >
              {value.map((item, index) => (
                <SortableImage
                  key={item.url}
                  item={item}
                  index={index}
                  multiple={multiple}
                  onRemove={handleRemove}
                  onAltChange={handleAltChange}
                  deleting={deleting === item.url}
                />
              ))}
            </SortableContext>

            {isUploading && (
              <div className="aspect-video rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 flex items-center justify-center animate-pulse">
                <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
              </div>
            )}

            {value.length === 0 && !isUploading && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-slate-50 border-slate-200 text-slate-400">
                <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs font-medium">No images uploaded yet</p>
              </div>
            )}
          </div>
        </DndContext>
      </CardContent>

      {multiple && value.length > 1 && (
        <CardFooter className="bg-slate-50/50 border-t py-2 px-4">
          <p className="text-[10px] text-slate-500 font-medium italic">
            * Drag images to reorder. The first image is the primary display.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}