"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

const Breadcrumbs = ({ items }) => {
  const pathname = usePathname();

  // 1. Generate auto-items from pathname if no props are provided
  const pathElements = pathname.split("/").filter((path) => path !== "");
  const autoItems = pathElements.map((path, index) => ({
    label: path.replace(/-/g, " "),
    href: `/${pathElements.slice(0, index + 1).join("/")}`,
  }));

  // 2. Decide which items to use (Props override Auto)
  const breadcrumbItems = items && items.length > 0 ? items : autoItems;

  // 3. Title Logic (Based on the last item in our normalized array)
  const lastItemLabel = breadcrumbItems.length > 0 
    ? breadcrumbItems[breadcrumbItems.length - 1].label 
    : "Welcome";
    
  const title = lastItemLabel || "Welcome";
  const shortTitle = title.length > 50 ? title.slice(0, 50).trim() + "..." : title;

  return (
    <div className="h-96 w-full bg-gradient-to-br from-[#F09410] to-[#BC430D] relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center justify-center pt-20 h-full z-10 text-center px-4">
        
        {/* Dynamic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl max-w-4xl font-black text-white mb-6 capitalize tracking-tight line-clamp-2 font-sans"
        >
          {shortTitle}
        </motion.h1>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl shadow-xl">
          
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {breadcrumbItems.map((item, index) => {
            // It is the last item if it's at the end of the array OR if it lacks an href
            const isLast = index === breadcrumbItems.length - 1 || !item.href;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <ChevronRight size={14} className="text-white/40" />
                {isLast ? (
                  <span className="text-white font-bold text-sm capitalize line-clamp-1">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors text-sm capitalize font-medium"
                  >
                    {item.label}
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