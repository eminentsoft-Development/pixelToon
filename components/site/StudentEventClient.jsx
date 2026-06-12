"use client";

import { useState } from "react";
import Image from "next/image";

export default function SimpleGalleryClient({ images }) {
  // The only logic we need: keeping track of the currently clicked image URL
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => setSelectedImage(item.src)}
            className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={item.src}
              alt={item.title || "Gallery image"}
              width={600}
              height={800}
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 4}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)} // Click anywhere to close
        >
          <div className="relative w-full max-w-5xl h-full max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Enlarged view"
              fill
              unoptimized
              className="object-contain"
              quality={100}
            />
          </div>

          <button
            className="absolute top-6 right-6 text-white bg-black/50 rounded-full p-2 hover:bg-white hover:text-black transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
