"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const AboutSection = () => {
  // Animation variants optimized for GPU performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Content Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-black text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                ABOUT PIXELTOONZ <br />
                <span className="text-gray-400">
                  ACADEMY OF FILM & MEDIA DESIGN
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-5 md:space-y-6">
              <p className="text-base md:text-xl text-gray-600 leading-relaxed font-medium">
                Pixeltoonz, an{" "}
                <span className="text-black font-bold underline decoration-yellow-400 underline-offset-4">
                  ISO certified company
                </span>
                , is one among the top educational institutions in Kerala.
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                Providing the best multimedia courses in Animation, VFX, 3D
                Design, Film Editing, Photography, Cinematography, Graphics
                Design and Web Technologies. As the best film
                editing institute in Kerala, we personally understand the
                student’s natural ability and accordingly inculcate “Creativity”
                with the right blend of motivation & inspiration.
              </p>
            </motion.div>

            <Link href="/about-us" prefetch={false}>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 mt-6 bg-black text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-yellow-400 hover:text-black shadow-lg"
              >
                DISCOVER MORE
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* RIGHT: Visual Collage */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3 md:space-y-4 will-change-transform"
              >
                <div className="relative h-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=70&w=600&auto=format&fit=crop"
                    alt="Photography"
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-56 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=70&w=600&auto=format&fit=crop"
                    alt="VFX"
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3 md:space-y-4 pt-8 md:pt-12 will-change-transform"
              >
                <div className="relative h-56 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-md border-2 md:border-4 border-yellow-400 bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=70&w=600&auto=format&fit=crop"
                    alt="Editing"
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                    className="object-cover"
                    priority // Prioritize this image as it's the "featured" one in the collage
                  />
                </div>
                <div className="relative h-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=70&w=600&auto=format&fit=crop"
                    alt="Animation"
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Info Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative mt-12 md:mt-16 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#0a0a0a] p-6 md:p-16 text-white shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 h-64 md:h-96 w-64 md:w-96 rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Mission */}
            <div className="group relative flex flex-col py-6 md:px-10 md:py-0 first:pl-0 last:pr-0">
              <span className="mb-4 font-mono text-[10px] md:text-sm tracking-widest text-yellow-400">
                01 // MISSION
              </span>
              <h4 className="mb-3 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                The <span className="text-yellow-400">Bridge</span>
              </h4>
              <p className="text-xs md:text-sm leading-relaxed text-gray-400">
                Providing consistent high quality training on film and multimedia to bridge the gap by linking students with India’s finest professionals.
              </p>
            </div>

            {/* Vision */}
            <div className="group relative flex flex-col py-6 md:px-10 md:py-0">
              <span className="mb-4 font-mono text-[10px] md:text-sm tracking-widest text-yellow-400">
                02 // VISION
              </span>
              <h4 className="mb-3 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                The <span className="text-yellow-400">Future</span>
              </h4>
              <p className="text-xs md:text-sm leading-relaxed text-gray-400">
                Extensive practical and on-job training helps students turn their skills and talent into a promising creative career.
              </p>
            </div>

            {/* Motto */}
            <div className="group relative flex flex-col py-6 md:px-10 md:py-0">
              <span className="mb-4 font-mono text-[10px] md:text-sm tracking-widest text-yellow-400">
                03 // MOTTO
              </span>
              <h4 className="mb-3 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Our <span className="text-yellow-400">MOTTO</span>
              </h4>
              <p className="text-base md:text-lg italic font-medium leading-snug text-white">
                “Every individual is creatively endowed. They just need the right teacher to <span className="text-yellow-400">ignite the Spark!!</span>”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;