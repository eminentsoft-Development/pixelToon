import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import BlogCarousel from "./BlogCarousel";

export default function LatestBlogs({ blogs = [] }) {
  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <ScrollReveal delay={0} direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Latest from <span className="text-yellow-500">Pixeltoonz</span>
            </h2>
            <p className="text-neutral-500 max-w-md">
              Stay updated with the latest campus news, student achievements,
              and upcoming design workshops.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100} direction="up">
            <Link
              href="/blog"
              prefetch={false}
              className="flex items-center gap-2 bg-neutral-900 text-white px-7 py-3 rounded-full
                         font-bold hover:bg-yellow-500 hover:text-black transition-colors
                         hover:scale-[1.03] active:scale-[0.97]"
            >
              Explore All News
              <ArrowUpRight size={18} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Client-side carousel injected here */}
        <BlogCarousel blogs={blogs} />
        
      </div>
    </section>
  );
}