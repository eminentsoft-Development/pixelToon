"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";
import Link from "next/link";

// ✅ Outside component — one object, never recreated
const headerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const viewport = { once: true, margin: "-50px" };

const carouselOpts = {
  align: "start",
  loop: true,
  skipSnaps: false,
  dragFree: false,
};

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Popular <span className="text-yellow-500">Courses</span>
            </h2>
          </motion.div>

          {/* ✅ CSS-only hover — no motion.button inside Link */}
          <div className="hidden lg:block">
            <Link
              href="/courses"
              prefetch={false}
              className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors shadow-lg
                         hover:scale-[1.03] active:scale-[0.97]"
            >
              Explore All
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={carouselOpts}
        >
          <CarouselContent className="-ml-4">
            {featuredCourses.map((course, index) => (
              // ✅ key by stable id, not array index
              <CarouselItem
                key={course.slug ?? course._id ?? index}
                className="pl-4 basis-[90%] md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1 h-full">
                  {/* ✅ Pass carouselIndex so card knows its visible position */}
                  <CourseCard {...course} carouselIndex={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center md:justify-end mt-8">
            <div className="block lg:hidden w-full">
              <Link
                href="/courses"
                prefetch={false}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white
                           px-7 py-4 rounded-xl font-bold active:bg-yellow-500 active:text-black
                           transition-colors active:scale-[0.95]"
              >
                Explore All Courses
                <ArrowUpRight size={18} />
              </Link>
            </div>

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