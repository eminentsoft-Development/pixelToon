"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import Footer from "@/components/site/footer";
import Navbar from "@/components/site/header";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full pt-[120px] lg:pt-[90px] bg-gradient-to-br from-[#F09410] to-[#BC430D] relative overflow-hidden flex items-center justify-center px-4">
        {/* Abstract Background Decoration (Matching your Breadcrumbs) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          {/* Animated 404 Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <motion.h1
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[120px] md:text-[200px] font-black text-white leading-none tracking-tighter opacity-20"
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle size={80} className="text-white drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Lost in the Clouds?
            </h2>
            <p className="text-white/80 text-lg mb-8 font-medium">
              The page you&apos;re looking for has moved to another orbit or
              never existed in this dimension.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 bg-white text-[#BC430D] px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Home size={20} />
                Back to Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-md"
              >
                <ArrowLeft size={20} />
                Go Back
              </button>
            </div>
          </motion.div>

          {/* Footer Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-white/50 text-sm font-medium"
          >
            If you think this is a mistake, please contact support.
          </motion.p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
