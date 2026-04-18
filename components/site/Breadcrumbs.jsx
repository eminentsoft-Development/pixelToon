"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathElements = pathname.split("/").filter((path) => path !== "");

  // ✅ Title + Short Title Logic
  const title =
    pathElements.length > 0
      ? pathElements[pathElements.length - 1].replace(/-/g, " ")
      : "Welcome";

  const shortTitle =
    title.length > 50 ? title.slice(0, 50).trim() + "..." : title;

  return (
    <div className="h-96 w-full bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center justify-center pt-20 h-full z-10 text-center px-4">
        
        {/* ✅ Fixed Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl max-w-5xl font-black text-white mb-6 capitalize tracking-tight line-clamp-2"
        >
          {shortTitle}
        </motion.h1>

        {/* Breadcrumb */}
        <nav className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl shadow-xl">
          
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {pathElements.map((path, index) => {
            const href = `/${pathElements.slice(0, index + 1).join("/")}`;
            const isLast = index === pathElements.length - 1;

            return (
              <React.Fragment key={path}>
                <ChevronRight size={14} className="text-white/40" />
                {isLast ? (
                  <span className="text-white font-bold text-sm capitalize line-clamp-1">
                    {path.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white transition-colors text-sm capitalize font-medium"
                  >
                    {path.replace(/-/g, " ")}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;