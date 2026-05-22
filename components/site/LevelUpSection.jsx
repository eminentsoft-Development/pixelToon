import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import LazyVideo from "./LazyVideo";

const LevelUpSection = () => {
  return (
    <section className="py-6 md:py-10 px-4 lg:px-24 bg-white">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl min-h-[500px] md:min-h-[600px]">

          {/* LEFT: Content */}
          <div className="order-2 md:order-1 md:w-[40%] p-8 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-r border-white/10 relative z-10">
            <ScrollReveal delay={0} direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[0.95] md:leading-[0.9] uppercase tracking-tighter mb-4 md:mb-6">
                Education <br />
                <span className="text-gray-500 italic font-medium text-2xl sm:text-3xl md:text-4xl">
                  Taken to the
                </span>{" "}
                <br />
                <span className="text-yellow-400">Next Level</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 md:mb-8 max-w-xs">
                Breaking traditional boundaries with industry-first training in
                Film, VFX, and Media Design.
              </p>

              <Link
                href="/gallery/students-work"
                prefetch={false}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-8 py-4 md:px-6 md:py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                View Gallery <ArrowUpRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          {/* RIGHT: Video */}
          <div className="order-1 md:order-2 md:w-[60%] relative group min-h-[300px] md:min-h-full overflow-hidden bg-neutral-900">
            <LazyVideo src="https://res.cloudinary.com/dauoxptqb/video/upload/f_auto,q_auto/v1777518818/website_p3semc.mp4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelUpSection;