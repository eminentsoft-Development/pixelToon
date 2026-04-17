"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Image from "next/image";

// 1. Ensure ALBUMS is a valid Array
const ALBUMS = [
  {
    id: 1,
    title: "Batch Launch 2025",
    count: 6,
    description:
      "Our new batch is officially on board, and the journey toward mastering media, design, and storytelling begins now.",
    date: "Jan 12, 2025",
    photos: [
      "/gallery/latest-events/batch_launch-1.webp",
      "/gallery/latest-events/batch_launch-2.webp",
      "/gallery/latest-events/batch_launch-3.webp",
      "/gallery/latest-events/batch_launch-4.webp",
      "/gallery/latest-events/batch_launch-5.webp",
      "/gallery/latest-events/batch_launch-6.webp",
    ],
  },
  {
    id: 2,
    title: "Wildlife Trip",
    count: 2,
    description:
      "We recently conducted an exciting wildlife trip to Parambikulam Wildlife Sanctuary, giving students a chance to explore nature and capture its beauty through their lens.",
    date: "Feb 05, 2025",
    photos: ["/gallery/latest-events/wildlife-trip-1.webp", "/gallery/latest-events/wildlife-trip-2.webp"],
  },
  {
    id: 3,
    title: "Convocation Day 2025",
    count: 7,
    description:
      "Convocation Day at Pixeltoonz Academy A day filled with pride, joy, and unforgettable memories! These snapshots capture some of the most heartwarming and cherished moments from our convocation day",
    date: "Mar 20, 2025",
    photos: [
      "/gallery/latest-events/convocation-day-1.webp",
      "/gallery/latest-events/convocation-day-2.webp",
      "/gallery/latest-events/convocation-day-3.webp",
      "/gallery/latest-events/convocation-day-4.webp",
      "/gallery/latest-events/convocation-day-5.webp",
      "/gallery/latest-events/convocation-day-6.webp",
      "/gallery/latest-events/convocation-day-7.webp",
    ],
  },
  {
    id: 4,
    title: "Onam celebration 2025",
    count: 9,
    description:
      "Pixeltoonz Academy came alive with color and culture as students and faculty joined hands to celebrate Onam. The day was filled with traditional games, vibrant music, energetic dance performances, and a delicious Onam Sadhya. From the festive outfits to the joyful spirit, it was a celebration to remember.",
    date: "Mar 20, 2025",
    photos: [
      "/gallery/latest-events/onam-celebration-1.webp",
      "/gallery/latest-events/onam-celebration-2.webp",
      "/gallery/latest-events/onam-celebration-3.webp",
      "/gallery/latest-events/onam-celebration-4.webp",
      "/gallery/latest-events/onam-celebration-5.webp",
      "/gallery/latest-events/onam-celebration-6.webp",
      "/gallery/latest-events/onam-celebration-7.webp",
      "/gallery/latest-events/onam-celebration-8.webp",
      "/gallery/latest-events/onam-celebration-9.webp",
    ],
  },
  {
    id: 5,
    title: "Design & Branding Workshop",
    count: 11,
    description:
      "A glimpse from the Designing and Branding Workshop at Pixeltoonz — an inspiring session packed with creativity, collaboration, and hands-on learning. Guided by Thanveer Ajmal, students explored branding, logo design, and AI tools, gaining fresh ideas and perspectives in design.",
    date: "Mar 20, 2025",
    photos: [
      "/gallery/latest-events/designs-brand-1.webp",
      "/gallery/latest-events/designs-brand-2.webp",
      "/gallery/latest-events/designs-brand-3.webp",
      "/gallery/latest-events/designs-brand-4.webp",
      "/gallery/latest-events/designs-brand-5.webp",
      "/gallery/latest-events/designs-brand-6.webp",
      "/gallery/latest-events/designs-brand-7.webp",
      "/gallery/latest-events/designs-brand-8.webp",
      "/gallery/latest-events/designs-brand-9.webp",
      "/gallery/latest-events/designs-brand-10.webp",
      "/gallery/latest-events/designs-brand-11.webp",
    ],
  },
  {
    id: 6,
    title: "Learning that dives deeper",
    count: 12,
    description:
      "Our students experienced underwater photography the real way. Inside the water, equipped with professional gear, guided step by step by our expert faculty. This wasn’t a demo or a theory session. It was pure hands-on training. Every frame taught them control, confidence, and creativity beneath the surface. At Pixeltoonz, we don’t just teach photography. We",
    date: "Mar 20, 2025",
    photos: [
      "/gallery/latest-events/learning-1.webp",
      "/gallery/latest-events/learning-2.webp",
      "/gallery/latest-events/learning-3.webp",
      "/gallery/latest-events/learning-4.webp",
      "/gallery/latest-events/learning-5.webp",
      "/gallery/latest-events/learning-6.webp",
      "/gallery/latest-events/learning-7.webp",
      "/gallery/latest-events/learning-8.webp",
      "/gallery/latest-events/learning-9.webp",
      "/gallery/latest-events/learning-10.webp",
      "/gallery/latest-events/learning-11.webp",
    ],
  },
];

const EventsAlbum = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use "auto" for an instant jump
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs />
      <div className="container mx-auto py-12">
        <AnimatePresence mode="wait">
          {!selectedAlbum ? (
            /* --- VIEW 1: ALBUM LIST --- */
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-10 mb-20 border-l-4 border-yellow-500 pl-8">
                <h1 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight uppercase">
                  Events <span className="text-neutral-400">Library</span>
                </h1>
                <p className="text-neutral-500 mt-4 max-w-lg text-lg font-medium leading-relaxed">
                  A chronological archive of our workshops, batches, and
                  creative milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {ALBUMS.map((album) => (
                  <div
                    key={album.id}
                    onClick={() => handleAlbumClick(album)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-neutral-100 mb-8">
                      <Image
                        src={album.photos[0]}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Top Left Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="bg-white text-black text-sm tracking-wider font-extrabold px-3 py-1 uppercase">
                          {album.title}
                        </span>
                      </div>

                      {/* Bottom Info */}
                      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col text-white">
                          <span className="text-2xl font-bold leading-none">
                            {album.count}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-white/70">
                            Photos
                          </span>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-lg">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {album.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-yellow-500 transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {album.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* --- VIEW 2: INNER GALLERY --- */
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <button
                onClick={() => setSelectedAlbum(null)}
                className="flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors mb-12 font-bold uppercase text-xs tracking-widest"
              >
                <ArrowLeft size={16} /> Back to Library
              </button>

              <div className="mb-20 border-l-4 border-yellow-500 pl-8">
                <div className="flex items-center gap-3 text-yellow-500 mb-4">
                  <Calendar size={18} />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">
                    {selectedAlbum.date}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 uppercase tracking-tighter">
                  {selectedAlbum.title}
                </h2>
                <p className="text-neutral-500 max-w-2xl text-lg leading-relaxed font-medium">
                  {selectedAlbum.description}
                </p>
              </div>

              {/* Photos Grid with Masonry-like Columns */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {selectedAlbum.photos?.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative group overflow-hidden rounded-xl bg-neutral-100 border border-neutral-100 break-inside-avoid mb-6"
                  >
                    {/* Image Container */}
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={photo}
                        alt={`${selectedAlbum.title} - ${i + 1}`}
                        width={800} // Base width for aspect ratio calculation
                        height={600} // Base height (Next.js uses these for layout-shift prevention)
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                     
                    </div>

                    {/* Subtle Tint */}
                    <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsAlbum;
