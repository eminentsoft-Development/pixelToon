"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Sparkles, Target } from "lucide-react";

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      <div className="px-4 lg:px-28 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: Content Area (7 Columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest mb-4">
                About Us
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                ABOUT PIXELTOONZ <br />
                <span className="text-gray-400">
                  ACADEMY OF FILM & MEDIA DESIGN
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                Pixeltoonz, an{" "}
                <span className="text-black font-bold underline decoration-yellow-400 underline-offset-4">
                  ISO certified company
                </span>
                , is one among the top educational institutions in Kerala.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Providing the best multimedia courses in Animation, VFX, 3D
                Design, Film Editing, Photography, Cinematography, Graphics
                Design and Web Technologies. As the best film editing institute
                in Kerala, we personally understand the student’s natural
                ability and accordingly inculcate “Creativity” with the right
                blend of motivation & inspiration towards Art, Design &
                Technology.
              </p>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-yellow-400 hover:text-black shadow-xl"
            >
              DISCOVER MORE
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </motion.button>

            {/* Mission/Vision/Motto Grid */}
          </motion.div>

          {/* RIGHT: Visual "Film Reel" Collage (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                    alt="Photography"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
                    alt="VFX"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 pt-12"
              >
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg border-4 border-yellow-400">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
                    alt="Editing"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
                    alt="Animation"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mt-16 overflow-hidden rounded-[3rem] bg-[#0a0a0a] p-8 md:p-16 text-white shadow-2xl"
        >
          {/* Abstract Background Decoration */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-yellow-400/10 blur-[120px]" />

          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Mission */}
            <div className="group relative flex flex-col py-8 md:px-10 md:py-0 first:pl-0 last:pr-0">
              <span className="mb-6 font-mono text-sm tracking-widest text-yellow-400">
                01 // MISSION
              </span>
              <h4 className="mb-4 text-3xl font-black uppercase tracking-tighter">
                The <span className="text-primary">Bridge</span>
              </h4>
              <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                Providing high-quality film and multimedia training to nurture
                creative capabilities and linking students with India’s finest
                industry professionals.
              </p>
            </div>

            {/* Vision */}
            <div className="group relative flex flex-col py-8 md:px-10 md:py-0">
              <span className="mb-6 font-mono text-sm tracking-widest text-yellow-400">
                02 // VISION
              </span>
              <h4 className="mb-4 text-3xl font-black uppercase tracking-tighter">
                The <span className="text-primary">Future</span>
              </h4>
              <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                Extensive practical and on-job training that empowers students
                to transform their talent into a thriving, high-impact creative
                career.
              </p>
            </div>

            {/* Motto */}
            <div className="group relative flex flex-col py-8 md:px-10 md:py-0">
              <span className="mb-6 font-mono text-sm tracking-widest text-yellow-400">
                03 // MOTTO
              </span>
              <p className="text-lg italic font-medium leading-snug text-white">
                “Human mind is a beautiful place... they just need the right
                teacher to{" "}
                <span className="text-primary">ignite the Spark!!</span>”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
