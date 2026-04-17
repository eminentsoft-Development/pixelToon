"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard";

export default function LatestBlogs({ blogs = [] }) {
  // Plugin for Auto-scroll
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">
        {/* Header - Exact same design as your original */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Latest from <span className="text-yellow-500">Pixeltoonz</span>
            </h2>
            <p className="text-neutral-500 max-w-md">
              Stay updated with the latest campus news, student achievements,
              and upcoming design workshops.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors"
            >
              Explore All News
              <ArrowUpRight size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Carousel Component */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          {/* -ml-8 matches the gap-8 in your original design */}
          <CarouselContent className="-ml-8">
            {blogs.map((blog, index) => (
              <CarouselItem
                key={index}
                // basis-full (1 card mobile) | md:1/2 (2 cards tablet) | lg:1/3 (3 cards laptop)
                className="pl-8 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <BlogCard {...blog} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav controls - Styled to match your brand */}
          <div className="flex items-center justify-center md:justify-end mt-10 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block lg:hidden"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors"
              >
                Explore All News
                <ArrowUpRight size={18} />
              </motion.button>
            </motion.div>

            <CarouselPrevious
              className="hidden lg:block static translate-y-0 w-11 h-11 border-neutral-200 
                         text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all"
            />
            <CarouselNext
              className="hidden lg:block static translate-y-0 w-11 h-11 border-neutral-200 
                         text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
