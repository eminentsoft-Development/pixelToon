"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Breadcrumbs from "@/components/site/Breadcrumbs";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Graphic Design",
  "Photography",
  "Film Editing",
  "UI/UX",
  "3D & VFX",
  "Events",
];
const ASPECT_CYCLE = [
  "tall",
  "square",
  "wide",
  "square",
  "tall",
  "wide",
  "square",
  "tall",
];
const BATCH_SIZE = 18;
const MAX_ITEMS = 200;
const REVEAL_STEP = 12;

// ─── DATA GENERATOR ───────────────────────────────────────────────────────────
// Replace src/thumb with your real image URLs or Next.js Image paths.
function generateItems(start, count) {
  const categoryPool = CATEGORIES.slice(1);
  return Array.from({ length: count }, (_, i) => {
    const id = start + i;
    const category = categoryPool[id % categoryPool.length];
    const aspect = ASPECT_CYCLE[id % ASPECT_CYCLE.length];
    const w = aspect === "wide" ? 1000 : aspect === "tall" ? 500 : 900;
    const h = aspect === "wide" ? 600 : aspect === "tall" ? 900 : 700;
    return {
      id,
      src: `https://picsum.photos/seed/ptz${id}/${w}/${h}`,
      thumb: `https://picsum.photos/seed/ptz${id}/400/400`,
      category,
      title: `${category} Work ${id + 1}`,
      aspect,
    };
  });
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        onClick={onClose}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
          <p className="text-white font-semibold text-sm">{item.title}</p>
          <p className="text-white/60 text-xs mt-0.5">{item.category}</p>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY CARD ─────────────────────────────────────────────────────────────
function GalleryCard({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);

  const spanClass =
    item.aspect === "tall"
      ? "row-span-2"
      : item.aspect === "wide"
        ? "col-span-2"
        : "row-span-1";

  const minH = item.aspect === "tall" ? "320px" : "200px";

  return (
    <div
      className={`${spanClass} group relative overflow-hidden rounded-xl bg-neutral-200 cursor-pointer`}
      onClick={onClick}
    >
      {/* shimmer skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200" />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumb}
        alt={item.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ minHeight: minH }}
      />

      {/* hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <p className="text-white text-xs font-medium px-3 text-center leading-tight">
          {item.title}
        </p>
        <span className="text-white/70 text-[10px] font-medium tracking-wider uppercase">
          {item.category}
        </span>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  // All items fetched so far from the "server"
  const [allItems, setAllItems] = useState(() => generateItems(0, BATCH_SIZE));
  const [nextBatchStart, setNextBatchStart] = useState(BATCH_SIZE);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Active filter & how many of the filtered pool to show
  const [activeCategory, setActiveCategory] = useState("All");
  const [revealCount, setRevealCount] = useState(BATCH_SIZE);

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const sentinelRef = useRef(null);

  // ── Derived state (no effects needed) ─────────────────────────────────────
  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? allItems
        : allItems.filter((i) => i.category === activeCategory),
    [allItems, activeCategory],
  );

  const displayedItems = useMemo(
    () => filtered.slice(0, revealCount),
    [filtered, revealCount],
  );

  const canRevealMore = revealCount < filtered.length;
  const canFetchMore = nextBatchStart < MAX_ITEMS;
  const hasMore = canRevealMore || canFetchMore;

  // ── Reset reveal count when category changes ───────────────────────────────
  // This is the correct pattern: derive the *next* state in the event handler,
  // not in an effect. Here we do it on the tab click.
  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setRevealCount(BATCH_SIZE); // reset reveal window for new category
  }, []);

  // ── Fetch next batch from server ───────────────────────────────────────────
  const fetchNextBatch = useCallback(async () => {
    if (fetchLoading || !canFetchMore) return;
    setFetchLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate network latency
    const newItems = generateItems(nextBatchStart, BATCH_SIZE);
    setAllItems((prev) => {
      const ids = new Set(prev.map((i) => i.id));
      return [...prev, ...newItems.filter((i) => !ids.has(i.id))];
    });
    setNextBatchStart((prev) => prev + BATCH_SIZE);
    setFetchLoading(false);
  }, [fetchLoading, canFetchMore, nextBatchStart]);

  // ── Called by IntersectionObserver when sentinel is visible ───────────────
  const advance = useCallback(() => {
    if (canRevealMore) {
      // First: reveal more from already-fetched pool (instant, no network)
      setRevealCount((prev) => prev + REVEAL_STEP);
    } else if (canFetchMore && !fetchLoading) {
      // Pool exhausted: fetch next batch, then reveal will auto-advance
      // because allItems will grow and filtered/displayedItems recompute
      fetchNextBatch().then(() => {
        setRevealCount((prev) => prev + REVEAL_STEP);
      });
    }
  }, [canRevealMore, canFetchMore, fetchLoading, fetchNextBatch]);

  // ── IntersectionObserver on sentinel ──────────────────────────────────────
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) advance();
      },
      { rootMargin: "500px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [advance, hasMore]);

  // ── Lightbox helpers ───────────────────────────────────────────────────────
  const openLightbox = useCallback(
    (id) => setLightboxIndex(displayedItems.findIndex((i) => i.id === id)),
    [displayedItems],
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null
          ? (i - 1 + displayedItems.length) % displayedItems.length
          : null,
      ),
    [displayedItems.length],
  );
  const nextLightbox = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % displayedItems.length : null,
      ),
    [displayedItems.length],
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ── BREADCRUMBS ── */}
      <Breadcrumbs />

      {/* ── STICKY FILTER TABS ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto">
          <div
            className="flex items-center gap-1 overflow-x-auto py-3"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-[11px] text-neutral-400 font-medium pl-6 whitespace-nowrap">
              {displayedItems.length} shown
            </span>
          </div>
        </div>
      </div>

      {/* ── MASONRY GRID ── */}
      <main className="container py-10">
        {displayedItems.length === 0 ? (
          <div className="py-24 text-center text-neutral-400 text-sm font-light">
            No items in this category yet.
          </div>
        ) : (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gridAutoRows: "260px",
              gridAutoFlow: "dense",
            }}
          >
            {displayedItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => openLightbox(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── SENTINEL + LOADER ── */}
        <div
          ref={sentinelRef}
          className="mt-10 flex justify-center min-h-[40px]"
        >
          {fetchLoading && (
            <div className="flex items-center gap-3 text-neutral-400 text-sm font-light">
              <svg
                className="animate-spin w-4 h-4 text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Loading more works...
            </div>
          )}
          {!hasMore && displayedItems.length > 0 && (
            <p className="text-neutral-400 text-xs font-light tracking-widest py-4">
              — You&apos;ve seen it all —
            </p>
          )}
        </div>
      </main>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && displayedItems[lightboxIndex] && (
        <Lightbox
          item={displayedItems[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </div>
  );
}
