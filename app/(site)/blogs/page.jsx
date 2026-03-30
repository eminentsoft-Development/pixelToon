"use client";

import Breadcrumbs from "@/components/site/Breadcrumbs";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "@/components/site/BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const news = [
  {
    category: "Placement",
    title: "15 Students Placed at Top VFX Studios This Month",
    description:
      "Our latest batch has seen record-breaking placements in international studios across Bangalore and Hyderabad.",
    date: "March 24, 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800",
  },
  {
    category: "Campus",
    title: "New Digital Art Lab Opens at Pixeltoonz Cochin",
    description:
      "Equipped with the latest Wacom Cintiqs and RTX 4090 workstations to fuel your creative fire.",
    date: "March 22, 2026",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800",
  },
  {
    category: "Awards",
    title: "Winner: Best Multimedia Institute of the Year",
    description:
      "Pixeltoonz takes home the gold at the National Education Excellence Awards 2026.",
    date: "March 18, 2026",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800",
  },
  {
    category: "Placement",
    title: "15 Students Placed at Top VFX Studios This Month",
    description:
      "Our latest batch has seen record-breaking placements in international studios across Bangalore and Hyderabad.",
    date: "March 24, 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800",
  },
  {
    category: "Campus",
    title: "New Digital Art Lab Opens at Pixeltoonz Cochin",
    description:
      "Equipped with the latest Wacom Cintiqs and RTX 4090 workstations to fuel your creative fire.",
    date: "March 22, 2026",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800",
  },
  {
    category: "Awards",
    title: "Winner: Best Multimedia Institute of the Year",
    description:
      "Pixeltoonz takes home the gold at the National Education Excellence Awards 2026.",
    date: "March 18, 2026",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800",
  },
  {
    category: "Placement",
    title: "15 Students Placed at Top VFX Studios This Month",
    description:
      "Our latest batch has seen record-breaking placements in international studios across Bangalore and Hyderabad.",
    date: "March 24, 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800",
  },
  {
    category: "Campus",
    title: "New Digital Art Lab Opens at Pixeltoonz Cochin",
    description:
      "Equipped with the latest Wacom Cintiqs and RTX 4090 workstations to fuel your creative fire.",
    date: "March 22, 2026",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800",
  },
  {
    category: "Awards",
    title: "Winner: Best Multimedia Institute of the Year",
    description:
      "Pixeltoonz takes home the gold at the National Education Excellence Awards 2026.",
    date: "March 18, 2026",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800",
  },
];

const ITEMS_PER_PAGE = 6;

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const displayedNews = news.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );


  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      <div className="container mx-auto py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
              Latest <span className="text-[#BC430D]">News</span>
            </h1>
            <p className="text-slate-500 max-w-md font-medium">
              Industry-standard training in Film, VFX, and Media Design.
              Personalized attention with only 12 students per batch.
            </p>
          </div>

          {/* Dynamic Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            {/* {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  filter === cat
                    ? "bg-[#BC430D] text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))} */}
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedNews.map((blog, index) => (
              <BlogCard key={index} {...blog} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#BC430D] hover:text-[#BC430D] disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-full font-black text-sm transition-all ${
                    currentPage === i + 1
                      ? "bg-[#131313] text-white shadow-xl"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#BC430D] hover:text-[#BC430D] disabled:opacity-30 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
