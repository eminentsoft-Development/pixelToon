"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext, 
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";

const carouselOpts = {
  align: "start",
  loop: true,
  skipSnaps: false,
  dragFree: false,
};

export default function CourseCarousel({ featuredCourses = [] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={carouselOpts}
    >
      <CarouselContent className="-ml-4">
        {featuredCourses.map((course, index) => (
          <CarouselItem
            key={course.slug ?? course._id ?? index}
            className="pl-4 basis-[90%] md:basis-1/2 lg:basis-1/4"
          >
            <div className="p-1 h-full">
              <CourseCard {...course} index={index} />
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
  );
}