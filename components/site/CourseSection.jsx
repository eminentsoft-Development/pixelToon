"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";
import { Button } from "../ui/button";
import Link from "next/link";

const courses = [
  {
    title: "Film Editing & Post Production",
    category: "Cinema",
    description:
      "Master industry-standard tools like Premiere Pro and DaVinci Resolve.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
  },
  {
    title: "VFX & Cinematic Animation",
    category: "Visual Effects",
    description:
      "Master industry-standard tools like Premiere Pro and DaVinci Resolve.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
  },
  {
    title: "Professional Photography",
    category: "Media",
    description:
      "Master industry-standard tools like Premiere Pro and DaVinci Resolve.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
  },
  {
    title: "Web Technologies & UI/UX",
    category: "Design",
    description:
      "Master industry-standard tools like Premiere Pro and DaVinci Resolve.",
    image:
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1200",
  },
];

const CourseSection = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.firstChild?.offsetWidth + 24; // Width + gap
    const scrollAmount = direction === "next" ? cardWidth : -cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = setInterval(() => {
      if (!isHovered) {
        const cardWidth = scrollContainer.firstChild?.offsetWidth + 24; // Width + gap (gap-6 = 24px)
        const maxScrollLeft =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (scrollContainer.scrollLeft >= maxScrollLeft - 10) {
          // Reset to start if at the end
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by exactly one card width
          scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(autoScroll);
  }, [isHovered]);

  return (
    <section className="py-24 bg-[#fff0e7] overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Our Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
              Popular <span className="text-gray-400">Services.</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleScroll("prev")}
              className="p-4 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll("next")}
              className="p-4 rounded-full bg-primary text-white hover:bg-primary hover:border-primary transition-all active:scale-95 border-2 border-primary"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Updated Scrolling Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-nowrap gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[...courses, ...courses].map((course, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              <CourseCard {...course} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center items-center">
        <Link href={"/courses"}>
          <Button className="group flex items-center gap-2 py-7 px-12 rounded-full font-bold uppercase text-sm tracking-widest text-white hover:text-black transition-all duration-300 transform hover:scale-105">
            View All Courses
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CourseSection;
