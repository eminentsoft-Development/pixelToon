"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const formatIndex = (index) => String(index + 1).padStart(2, "0");

const CourseCard = ({ images, title, slug, description, tag, index }) => {
  return (
    <Link href={`/courses/${slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        className="group relative w-[320px] h-[500px] flex-shrink-0 rounded-[28px] overflow-hidden cursor-pointer"
        style={{ background: "#111" }}
      >
        {/* Image */}
        <Image
          src={
            images?.[0]?.url ||
            "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800"
          }
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        {/* Top: index + title */}
        <div className="absolute top-6 left-6 right-6">
          <div className="flex flex-col w-fit">
            <span
              className="text-white leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 54,
                letterSpacing: 2,
              }}
            >
              {formatIndex(index)}
            </span>
            <span className="block w-8 h-[3px] rounded-full bg-white/60 mt-0.5 ml-0.5" />
          </div>
          <h3 className="mt-2.5 text-white text-[18px] font-medium  tracking-wider leading-snug max-w-[220px]">
            {title}
          </h3>
        </div>

        {/* Bottom: tag + description + CTA */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3.5"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 60%, transparent)",
          }}
        >
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

            {/* Arrow button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors duration-250"
              style={{
                border: "1.5px solid rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
              }}
              aria-label="View course overview"
            >
              <ArrowRight size={17} color="white" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;