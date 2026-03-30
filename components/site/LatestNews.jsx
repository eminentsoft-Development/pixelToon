"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // Optional: Install lucide-react or use SVG
import BlogCard from "./BlogCard";

const news = [
  {
    category: "Placement",
    title: "15 Students Placed at Top VFX Studios This Month",
    description: "Our latest batch has seen record-breaking placements in international studios across Bangalore and Hyderabad.",
    date: "March 24, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800",
  },
  {
    category: "Campus",
    title: "New Digital Art Lab Opens at Pixeltoonz Cochin",
    description: "Equipped with the latest Wacom Cintiqs and RTX 4090 workstations to fuel your creative fire.",
    date: "March 22, 2026",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800",
  },
  {
    category: "Awards",
    title: "Winner: Best Multimedia Institute of the Year",
    description: "Pixeltoonz takes home the gold at the National Education Excellence Awards 2026.",
    date: "March 18, 2026",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800",
  },
];

export default function NewsGrid() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="px-4 lg:px-28 mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Latest from <span className="text-yellow-500">Pixeltoonz</span>
            </h2>
            <p className="text-neutral-500 max-w-md">
              Stay updated with the latest campus news, student achievements, and upcoming design workshops.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full font-bold transition-colors hover:bg-yellow-500 hover:text-black"
          >
            Explore All News
            <ArrowUpRight size={20} />
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <BlogCard key={i} index={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}