"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center bg-white px-10">
      
      <div className="grid grid-cols-2 gap-10 items-center w-full">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold leading-tight">
            The Best Digital Marketing Institute
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Learn real digital marketing skills with industry experts and build
            your career with practical training.
          </p>

          <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition">
            Get Started
          </button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/hero-image.png"
              alt="hero"
              width={500}
              height={500}
            />
          </motion.div>

          {/* Floating icons */}
          <motion.div
            className="absolute top-10 left-0"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Image src="/icon1.png" alt="" width={60} height={60} />
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-0"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Image src="/icon2.png" alt="" width={60} height={60} />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}