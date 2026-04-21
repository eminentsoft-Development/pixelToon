import { useUploadThing } from "@/lib/uploadthing";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function EditModal({ item, onClose, onSave }) {
  const [alt, setAlt] = useState(item?.alt || "");
  const [preview, setPreview] = useState(null); // new image preview URL
  const [newFile, setNewFile] = useState(null); // new File object
  const [isUploading, setUploading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setNewFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      const uploadedUrl = res[0].url;
      await onSave({
        id: item._id,
        alt,
        url: uploadedUrl,
        oldUrl: item.url, // 👈 so parent can delete old file from UploadThing
      });
      setUploading(false);
    },
    onUploadError: () => {
      toast.error("Image upload failed");
      setUploading(false);
    },
  });

  const handleSave = async () => {
    setUploading(true);
    if (newFile) {
      // New image selected — upload it first, then save in onClientUploadComplete
      await startUpload([newFile]);
    } else {
      // Only alt text changed — skip upload entirely
      await onSave({ id: item._id, alt, url: item.url, oldUrl: null });
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {item && (
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Edit Image
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Image preview + replace button */}
            <div className="relative group w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={preview || item.url}
                alt={alt}
                fill
                unoptimized={!!preview} // blob URLs need unoptimized
                className="object-cover"
              />
              {/* Hover overlay to replace */}
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1 text-white text-sm font-medium"
              >
                <Upload className="w-5 h-5" />
                Replace image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* New image badge */}
            {newFile && (
              <p className="text-xs text-[#5b4fcf] font-medium -mt-3">
                ✓ New image selected — will replace on save
              </p>
            )}

            {/* Alt text */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5 block">
                Alt Text (SEO)
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe this image..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/20 focus:border-[#5b4fcf]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1 border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUploading}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#5b4fcf] rounded-xl hover:bg-[#4a3fb5] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
