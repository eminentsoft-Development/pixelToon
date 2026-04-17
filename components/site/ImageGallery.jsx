"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className=" mx-auto">
      {images.length === 1 ? (
        <div className="relative w-full h-[300px] md:h-[550px] rounded-2xl overflow-hidden">
          <Image
            src={images[0].url}
            alt={images[0].alt || "Preview"}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {/* Main Image */}
          <div className="col-span-9">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={images[activeIndex].url}
                alt={images[activeIndex].alt || "Preview"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="col-span-3 h-[500px] flex flex-col gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300
              ${
                activeIndex === index
                  ? "border-green-500"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || "Thumbnail"}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
