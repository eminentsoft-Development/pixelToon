"use client";

import React, { useRef, useState, useEffect } from "react";
import { PlayCircle } from "lucide-react";

export default function LazyVideo({ src }) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Load once and stop observing
        }
      },
      { rootMargin: "200px" } // Triggers 200px before scrolling into view
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* Injecting pure CSS animation for the scale pulse */}
      <style>{`
        @keyframes customPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-custom-pulse {
          animation: customPulse 3s ease-in-out infinite;
        }
      `}</style>

      {isInView && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 will-change-transform [transform:scale(1.25)] ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={src}
        />
      )}

      {/* Placeholder / Background */}
      <div
        className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 ${
          videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-[#0a0a0a] md:via-transparent pointer-events-none" />

      {/* Play icon pulse - Powered entirely by native CSS */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-custom-pulse">
            <PlayCircle className="w-6 h-6 md:w-10 md:h-10 text-white opacity-80" />
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 pointer-events-none z-10">
        <span className="bg-yellow-400 text-black px-3 py-1 md:px-4 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">
          Showcase 2026
        </span>
      </div>
    </div>
  );
}