"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { fetchGalleryItems } from "@/app/action/gallery";
import Breadcrumbs from "@/components/site/Breadcrumbs";

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const itemsCountRef = useRef(0);
  const sentinelRef = useRef(null);

  const loadImages = useCallback(
    async (isInitial = false) => {
      const skip = isInitial ? 0 : itemsCountRef.current;
      
      try {
        const newItems = await fetchGalleryItems({ category: "students-work", skip });
        
        if (isInitial) {
          setItems(newItems);
          itemsCountRef.current = newItems.length;
        } else {
          setItems((prev) => [...prev, ...newItems]);
          itemsCountRef.current += newItems.length;
        }

        setHasMore(newItems.length >= 12);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [] 
  );

  // ─── INITIAL LOAD ───────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    loadImages(true);
  }, [loadImages]);

  // ─── INFINITE SCROLL ──────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          loadImages(false);
        }
      },
      { rootMargin: "600px" } // Keeps the load feeling "ahead" of the scroll
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
    
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [loadImages, hasMore, loading]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Breadcrumbs />

      <main className="container mx-auto py-10">
        {/* MASONRY LAYOUT: Maintained as per your preference */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 px-6">
          {items.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="break-inside-avoid group relative rounded-xl overflow-hidden bg-neutral-200 shadow-sm"
            >
              <div 
                className="relative w-full"
                style={{ 
                  aspectRatio: index % 3 === 0 ? '3/4' : index % 2 === 0 ? '1/1' : '4/5' 
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title || "Gallery Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  priority={index < 4} // Improves LCP for the first few images
                />
              </div>
            </div>
          ))}
        </div>

        {/* LOADING INDICATOR / SENTINEL */}
        <div ref={sentinelRef} className="h-40 flex items-center justify-center">
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
          )}
          {!hasMore && items.length > 0 && (
            <p className="text-neutral-400 text-sm font-light italic">
              All work loaded
            </p>
          )}
        </div>
      </main>
    </div>
  );
}