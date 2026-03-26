"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import Breadcrumbs from "@/components/site/Breadcrumbs";

// Mock Data - In a real project, this would come from your WordPress API or a database
const ALL_COURSES = [
  {
    id: 1,
    title: "Diploma in Film Editing",
    category: "Film",
    duration: "6 Months",
    level: "Professional",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800",
  },
  {
    id: 2,
    title: "Graphic Design Masterclass",
    category: "Design",
    duration: "4 Months",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800",
  },
  {
    id: 3,
    title: "VFX & 3D Animation",
    category: "Animation",
    duration: "12 Months",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800",
  },
  {
    id: 4,
    title: "Digital Photography",
    category: "Media",
    duration: "3 Months",
    level: "Professional",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800",
  },
  {
    id: 5,
    title: "UI/UX Design Studio",
    category: "Design",
    duration: "4 Months",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800",
  },
  {
    id: 6,
    title: "Cinematography Basics",
    category: "Film",
    duration: "6 Months",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800",
  },
  {
    id: 7,
    title: "Web Technologies",
    category: "Design",
    duration: "5 Months",
    level: "Professional",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800",
  },
  {
    id: 8,
    title: "Interior Visualization",
    category: "Animation",
    duration: "6 Months",
    level: "Professional",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
  },
];

const ITEMS_PER_PAGE = 6;

const CourseListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Film", "Design", "Animation", "Media"];

  const filteredCourses =
    filter === "All"
      ? ALL_COURSES
      : ALL_COURSES.filter((c) => c.category === filter);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs />
      <div className="container mx-auto py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
              Explore <span className="text-[#BC430D]">Programs</span>
            </h1>
            <p className="text-slate-500 max-w-md font-medium">
              Industry-standard training in Film, VFX, and Media Design.
              Personalized attention with only 12 students per batch.
            </p>
          </div>

          {/* Dynamic Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            {categories.map((cat) => (
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
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 h-[450px]"
              >
                {/* Course Image & Overlay */}
                <div className="h-2/3 relative overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {course.category}
                    </span>
                  </div>
                  {/* Play Button Icon on Hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white w-16 h-16" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 relative">
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} /> Max 12 Seats
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-[#BC430D] transition-colors">
                    {course.title}
                  </h3>

                  {/* Action Button (Slides in on hover) */}
                  <div className="absolute bottom-8 right-8 overflow-hidden">
                    <motion.button className="flex items-center gap-2 text-[#BC430D] font-black text-sm uppercase tracking-tighter">
                      View Details <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
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
                      ? "bg-slate-900 text-white shadow-xl"
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

export default CourseListing;
