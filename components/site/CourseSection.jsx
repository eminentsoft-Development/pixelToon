"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import CourseCard from "./CourseCard";

const VISIBLE_COUNT = 3;

export default function CourseSection({ courses = [] }) {
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, courses.length - VISIBLE_COUNT);

  const go = (dir) => {
    setCurrent((prev) => Math.max(0, Math.min(maxIndex, prev + dir)));
  };

  const goTo = (i) => setCurrent(Math.max(0, Math.min(maxIndex, i)));

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="px-6 lg:px-28 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
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
            className="flex items-center gap-3"
          >
            {/* Prev */}
            <motion.button
              onClick={() => go(-1)}
              disabled={current === 0}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center
                         text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed
                         hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            >
              <ArrowLeft size={18} />
            </motion.button>

            {/* Next */}
            <motion.button
              onClick={() => go(1)}
              disabled={current >= maxIndex}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center
                         text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed
                         hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            >
              <ArrowRight size={18} />
            </motion.button>

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
          </motion.div>
        </div>

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: `calc(-${current} * (100% / ${VISIBLE_COUNT} + 8px))`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 0.8,
            }}
          >
            {courses?.map((course, index) => (
              <motion.div
                key={index}
                className="min-w-[calc(33.333%-1.4rem)]"
                animate={{
                  opacity:
                    index >= current && index < current + VISIBLE_COUNT
                      ? 1
                      : 0.4,
                  scale:
                    index >= current && index < current + VISIBLE_COUNT
                      ? 1
                      : 0.96,
                }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard {...course} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {/* Change 'courses.map' to a sliced array or a limited range */}
          {courses.slice(0, maxIndex + 1).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === current ? 28 : 8,
                background: i === current ? "#eab308" : "#d4d4d4",
              }}
              transition={{ duration: 0.25 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
