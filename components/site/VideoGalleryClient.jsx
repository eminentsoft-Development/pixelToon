"use client";

import { useState } from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { Play, X } from "lucide-react"; 

export default function VideoGalleryClient({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <Breadcrumbs />

      <main className="px-4 md:px-6 lg:px-24 mx-auto py-12">
        {/* 1. SIMPLE VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos?.map((video, i) => (
            <div
              key={video.id || i}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer relative"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl transition-all duration-500 group-hover:ring-orange-500/50">
                <Image
                  src={video.src}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  quality={90}
                  priority={i < 6} // Prioritize the first two rows for fast LCP
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl transform group-hover:scale-125 group-hover:bg-orange-500 group-hover:border-orange-400 transition-all duration-300">
                    <Play className="fill-white text-white ml-1" size={24} />
                  </div>
                </div>

                {/* Duration/Type Label */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold tracking-widest uppercase border border-white/10">
                  Showreel
                </div>
              </div>

              {/* Text Meta */}
              <div className="mt-5 space-y-1 px-1">
                <h3 className="text-sm font-semibold text-textColor group-hover:text-orange-500 transition-colors line-clamp-1">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-orange-500/50" />
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                    PixelToonz Student Work
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 2. SIMPLE VIDEO LIGHTBOX */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in duration-300"
          onClick={() => setActiveVideo(null)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <X size={24} className="text-white" />
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video shadow-[0_0_100px_rgba(249,115,22,0.1)]"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the video from closing the modal
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              className="w-full h-full rounded-2xl shadow-2xl border border-white/10"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div className="mt-4 flex justify-between items-center px-2">
              <h2 className="text-lg font-medium text-white/90">
                {activeVideo.title}
              </h2>
              <span className="text-xs text-neutral-500 uppercase tracking-widest">
                © PixelToonz Academy
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}