"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { fetchGalleryItems } from "@/app/action/gallery";
import Breadcrumbs from "@/components/site/Breadcrumbs";

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const skipRef = useRef(0);
  const sentinelRef = useRef(null);

  const loadImages = useCallback(async (isInitial = false) => {
    if (loading && !isInitial) return; 

    const currentSkip = isInitial ? 0 : skipRef.current;
    
    try {
      const newItems = await fetchGalleryItems({ category: "students-life", skip: currentSkip });
      
      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => {
        if (isInitial) return newItems;
        const existingIds = new Set(prev.map(i => i.id));
        const filtered = newItems.filter(i => !existingIds.has(i.id));
        return [...prev, ...filtered];
      });

      skipRef.current = currentSkip + newItems.length;
      setHasMore(newItems.length >= 12);
    } catch (err) {
      console.error("Gallery Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial Load
  useEffect(() => {
    setLoading(true);
    loadImages(true);
  }, []);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          loadImages(false);
        }
      },
      { rootMargin: "400px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadImages, hasMore, loading]);

  // ─── LIGHTBOX HANDLERS ──────────────────────────────────────────
  const closeLightbox = () => setSelectedIndex(null);
  
  const navigate = (direction, e) => {
    e?.stopPropagation();
    if (direction === "next") {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else {
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  useEffect(() => {
    const handleKeys = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [selectedIndex, items.length]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Breadcrumbs />

      <main className="container mx-auto py-10 px-6">
        {/* MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedIndex(index)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-neutral-200 cursor-zoom-in border border-neutral-200"
            >
              <div 
                className="relative w-full transition-all duration-700"
                style={{ aspectRatio: index % 3 === 0 ? '4/5' : index % 2 === 0 ? '1/1' : '3/4' }}
              >
                <Image
                  src={item.src}
                  alt={item.title || "Gallery"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={85}
                  priority={index < 6}
                />
              </div>
            </div>
          ))}
        </div>

        {/* LOADING & SENTINEL */}
        <div ref={sentinelRef} className="h-40 flex flex-col items-center justify-center gap-4">
          {loading && (
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          )}
          {!hasMore && items.length > 0 && (
            <span className="text-neutral-400 text-xs tracking-widest uppercase">End of Collection</span>
          )}
        </div>
      </main>

      {/* ─── FULLSCREEN LIGHTBOX ─── */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Prev */}
          <button 
            onClick={(e) => navigate("prev", e)}
            className="absolute left-6 p-4 text-white/40 hover:text-white transition-colors"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Next */}
          <button 
            onClick={(e) => navigate("next", e)}
            className="absolute right-6 p-4 text-white/40 hover:text-white transition-colors"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[selectedIndex].src}
              alt="High resolution view"
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}