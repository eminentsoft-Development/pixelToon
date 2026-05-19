"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const formatIndex = (index) => String(index + 1).padStart(2, "0");

const overlayStyle = {
  background: "linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.82) 100%)",
};
const bottomGradient = {
  background: "linear-gradient(to top, rgba(0,0,0,0.9) 60%, transparent)",
};
const arrowStyle = {
  border: "1.5px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(6px)",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewport = { once: true };

const CourseCard = memo(({ images, title, slug, description, tag, index }) => {
  return (
    <Link href={`/courses/${slug}`} className="block h-full">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: Math.min(index * 0.08, 0.3) }}
        whileHover={{ y: -6 }}
        className="group relative w-full h-[500px] flex-shrink-0 rounded-[28px] overflow-hidden cursor-pointer"
        style={{ background: "#111" }}
      >
        <Image
          src={
            images?.[0]?.url ||
            "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800"
          }
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
        />

        <div className="absolute inset-0 transition-opacity duration-400" style={overlayStyle} />

        <div className="absolute top-6 left-6 right-6">
          <div className="flex flex-col w-fit">
            <span
              className="text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 54, letterSpacing: 2 }}
            >
              {formatIndex(index)}
            </span>
            <span className="block w-8 h-[3px] rounded-full bg-white/60 mt-0.5 ml-0.5" />
          </div>
          <h3 className="mt-2.5 text-white text-[18px] font-medium tracking-wider leading-snug max-w-[220px]">
            {title}
          </h3>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3.5" style={bottomGradient}>
          {tag && (
            <span className="w-fit text-[11px] font-medium uppercase tracking-[1.5px] text-white/55 border border-white/20 rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          )}
          {description && (
            <p className="text-[13px] font-light text-white/65 leading-relaxed line-clamp-2 m-0">
              {description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[2px] text-white/50">
              View course
            </span>
            {/* ✅ CSS-only scale — removed motion.div wrapper entirely */}
            <div
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center
                         transition-transform duration-200 hover:scale-110 active:scale-95"
              style={arrowStyle}
              aria-label="View course"
            >
              <ArrowRight size={17} color="white" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

CourseCard.displayName = "CourseCard";
export default CourseCard;