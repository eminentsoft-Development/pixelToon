"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ index, title, slug, description, createdAt, images }) => {
  const imageUrl = "/our-vision.jpg";

  return (
    <Link href={`/blogs/${slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group cursor-pointer h-full"
      >
        {/* Image Container */}
        <div className="relative h-64 mb-6 overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={images[0]?.url || "/our-vision.jpg"}
            alt={images[0]?.alt || title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">
              {new Date(createdAt)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 px-4">
          <h3 className="text-2xl font-extrabold text-neutral-900 group-hover:text-[#BC430D] transition-colors leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-neutral-500 line-clamp-2 text-sm leading-relaxed">
            {description}
          </p>

          {/* Underline Animation */}
          <div className="pt-4 overflow-hidden">
            <div className="h-[2px] w-full bg-neutral-100 relative">
              <motion.div
                className="absolute inset-0 bg-[#BC430D] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
