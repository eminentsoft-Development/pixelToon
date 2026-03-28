import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

const CourseCard = ({ image, title, category, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer flex-shrink-0 w-[300px] md:w-full" // Added flex-shrink for scrolling
    >
      <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Darker gradient on hover to make description readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-6 left-6">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-8 left-4 right-4 text-white">
          <h3 className="text-xl font-bold leading-tight uppercase group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          
          {/* Animated Description */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden">
              <p className="text-sm text-gray-300 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden">
              <Button className={"w-full py-6 bg-white mt-2 rounded-full text-black text-base tracking-wider"}>
                Explore More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
