"use client";

import React, { use } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Added for routing
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Image from "next/image";

const EventsAlbum = ({ eventsPromise }) => {
  const ALBUMS = use(eventsPromise);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Get the selected ID from the URL (?album=id)
  const selectedAlbumId = searchParams.get("album");
  
  // 2. Find the album object based on that ID
  const selectedAlbum = ALBUMS.find((a) => a.id === selectedAlbumId);

  const handleAlbumClick = (album) => {
    // Update URL without a full page reload
    router.push(`?album=${album.id}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    // Clear the search param to go back to list view
    router.push("?", { scroll: false });
  };

  if (!ALBUMS || ALBUMS.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-neutral-400">No events found in the library.</h2>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs />
      <div className="container mx-auto py-12">
        <AnimatePresence mode="wait">
          {/* 3. Logic now depends on whether selectedAlbumId exists in URL */}
          {!selectedAlbumId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-10 mb-20 border-l-4 border-yellow-500 pl-8">
                <h1 className="text-5xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase">
                  Events <span className="text-neutral-400">Library</span>
                </h1>
                <p className="text-neutral-500 mt-4 max-w-lg text-lg font-medium leading-relaxed">
                  A chronological archive of our workshops, batches, and creative milestones.
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
                        src={album.photos[0] || "/placeholder-image.webp"}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-6 left-6">
                        <span className="bg-white text-black text-sm tracking-wider font-extrabold px-3 py-1 uppercase">
                          {album.title}
                        </span>
                      </div>

                      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col text-white">
                          <span className="text-2xl font-bold leading-none">{album.count}</span>
                          <span className="text-[10px] uppercase font-bold text-white/70">Photos</span>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-lg">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{album.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-yellow-500 transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3">
                        {album.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors mb-12 font-bold uppercase text-xs tracking-widest"
              >
                <ArrowLeft size={16} /> Back to Library
              </button>

              {selectedAlbum ? (
                <>
                  <div className="mb-20 border-l-4 border-yellow-500 pl-8">
                    <div className="flex items-center gap-3 text-yellow-500 mb-4">
                      <Calendar size={18} />
                      <span className="text-sm font-black uppercase tracking-[0.2em]">{selectedAlbum.date}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 uppercase tracking-tighter">
                      {selectedAlbum.title}
                    </h2>
                    <p className="text-neutral-500 max-w-2xl text-lg leading-relaxed font-medium">
                      {selectedAlbum.description}
                    </p>
                  </div>

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
                        <Image
                          src={photo}
                          alt={`${selectedAlbum.title} - ${i + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-20 text-center">Album not found.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsAlbum;