"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import Link from "next/link";

export default function CourseSection({ courses = [] }) {
  // Plugin for Auto-scroll
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="px-6 lg:px-28 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 ">
              Popular <span className="text-yellow-500">Courses</span>
            </h2>
            <p className="text-neutral-500 max-w-md"></p>
          </motion.div>

          {/* Nav controls + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-3"
          >
            <Link href="/courses">
              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors"
              >
                Explore All
                <ArrowUpRight size={18} />
              </motion.button>
            </Link>
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
          <CarouselContent className="-ml-4">
            {courses.map((course, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <CourseCard {...course} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center md:justify-end mt-6">
            {/* Custom Dot Indicators or Pagination could go here */}
            <Link className="block lg:hidden" href="/courses">
              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors"
              >
                Explore All
                <ArrowUpRight size={18} />
              </motion.button>
            </Link>
            <div className="hidden lg:flex gap-2">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-neutral-200 hover:bg-neutral-900 hover:text-white transition-all" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-neutral-200 hover:bg-neutral-900 hover:text-white transition-all" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
