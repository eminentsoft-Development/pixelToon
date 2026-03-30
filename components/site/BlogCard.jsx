import React from "react";
import { motion } from "framer-motion";

const BlogCard = ({ image, category, date, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 mb-6 overflow-hidden rounded-2xl bg-neutral-100">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="text-primary font-mono text-xs font-bold">
          {date}
        </p>
        <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-neutral-500 line-clamp-2 text-sm leading-relaxed">
          {description}
        </p>

        {/* Underline Animation */}
        <div className="pt-4 overflow-hidden">
          <div className="h-[2px] w-full bg-neutral-100 relative">
            <motion.div
              className="absolute inset-0 bg-yellow-500 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
