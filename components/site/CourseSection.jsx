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
import CourseCard from "./CourseCard";
import Link from "next/link";

export default function CourseSection({ courses = [] }) {
  const featuredCourses = React.useMemo(
    () => courses.filter((course) => course.isFeatured),
    [courses]
  );

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Popular <span className="text-yellow-500">Courses</span>
            </h2>
          </motion.div>

          {/* Desktop Only CTA */}
          <div className="hidden lg:block">
            <Link href="/courses" prefetch={false}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                           font-bold hover:bg-yellow-500 hover:text-black transition-colors shadow-lg"
              >
                Explore All
                <ArrowUpRight size={18} />
              </motion.button>
            </Link>
          </div>
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
            skipSnaps: false, // Performance: Better touch behavior on mobile
            dragFree: false,   // Performance: Keeps layout stable
          }}
        >
          <CarouselContent className="-ml-4">
            {featuredCourses.map((course, index) => (
              <CarouselItem
                key={course.id || index}
                className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1 h-full">
                  {/* Ensure CourseCard handles its own image optimization */}
                  <CourseCard {...course} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation & Mobile CTA */}
          <div className="flex items-center justify-center md:justify-end mt-8">
            {/* Mobile Only CTA */}
            <div className="block lg:hidden w-full">
              <Link href="/courses" prefetch={false}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white px-7 py-4 rounded-xl
                             font-bold active:bg-yellow-500 active:text-black transition-colors"
                >
                  Explore All Courses
                  <ArrowUpRight size={18} />
                </motion.button>
              </Link>
            </div>

            {/* Desktop Navigation Arrows */}
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