import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal"; // The lightweight wrapper from before
import CourseCarousel from "./CourseCarousel";

export default function CourseSection({ courses = [] }) {
  // Filtering happens on the server now
  const featuredCourses = courses.filter((course) => course.isFeatured);

  return (
    <section className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          {/* Hardware-accelerated CSS animation wrapper */}
          <ScrollReveal delay={0} direction="up">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Popular <span className="text-yellow-500">Courses</span>
            </h2>
          </ScrollReveal>

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

        {/* Client-side carousel injected here */}
        <CourseCarousel featuredCourses={featuredCourses} />
      </div>
    </section>
  );
}
