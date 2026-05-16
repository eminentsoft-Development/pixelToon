"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard";

// ✅ All variants and configs at module scope — zero allocation on render
const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const ctaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
};
const viewport = { once: true };

const carouselOpts = {
  align: "start",
  loop: true,
};

export default function LatestBlogs({ blogs = [] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Latest from <span className="text-yellow-500">Pixeltoonz</span>
            </h2>
            <p className="text-neutral-500 max-w-md">
              Stay updated with the latest campus news, student achievements,
              and upcoming design workshops.
            </p>
          </motion.div>

          {/* ✅ Single CTA — visibility toggled via CSS, not duplicate DOM nodes */}
          {/* ✅ Wrapped in Link so it actually navigates; CSS-only hover, no motion.button */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <Link
              href="/blogs"
              prefetch={false}
              className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors
                         hover:scale-[1.03] active:scale-[0.97]"
            >
              Explore All News
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={carouselOpts}
        >
          <CarouselContent className="-ml-8">
            {blogs.map((blog) => (
              // ✅ Stable key — slug or id, not array index
              <CarouselItem
                key={blog.slug ?? blog._id}
                className="pl-8 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <BlogCard {...blog} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden lg:flex items-center justify-end mt-10 gap-3">
            <CarouselPrevious className="static translate-y-0 w-11 h-11 border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all" />
            <CarouselNext className="static translate-y-0 w-11 h-11 border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}