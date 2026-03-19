"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Clock, Star, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Film Editing & Post Production",
    category: "Cinema",
    duration: "6 Months",
    image: "https://images.unsplash.com/photo-1535016120720-40c646bebbdc?q=80&w=1200",
    rating: "4.9",
  },
  {
    title: "VFX & Cinematic Animation",
    category: "Visual Effects",
    duration: "12 Months",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    rating: "5.0",
  },
  {
    title: "Professional Photography",
    category: "Media",
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
    rating: "4.8",
  },
  {
    title: "Web Technologies & UI/UX",
    category: "Design",
    duration: "6 Months",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1200",
    rating: "4.9",
  },
];

const CourseSection = () => {
  return (
    <section className="py-24 bg-[#fcfcfc]">
      <div className="px-4 lg:px-28 mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Our Programs
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
              Master the <br /> <span className="text-gray-400">Creative Arts.</span>
            </h2>
          </div>
          <button className="group flex items-center gap-2 font-bold uppercase text-sm tracking-widest hover:text-yellow-500 transition-colors">
            View All Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Floating Category Tag */}
                <div className="absolute top-6 left-6">
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>

                {/* Play Button Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-black fill-current" />
                  </div>
                </div>

                {/* Bottom Content (Inside Image) */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-[10px] font-bold">{course.rating} Rating</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight uppercase group-hover:text-yellow-400 transition-colors">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Course Meta Info (Outside) */}
              <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">{course.duration}</span>
                </div>
                <div className="h-[1px] flex-grow mx-4 bg-gray-200" />
                <span className="text-xs font-black text-black uppercase">Enrolling</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;