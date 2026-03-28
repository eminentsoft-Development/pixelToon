"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdminProfile({ onLogoutClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 md:gap-6 relative">
      
      {/* Notification */}
      <div className="relative cursor-pointer">
        <Bell size={20} className="text-gray-400" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-sage rounded-full border-2 border-white" />
      </div>

      {/* Profile */}
      <div
        ref={dropdownRef}
        className="flex items-center gap-3 pl-4 md:pl-6 border-l border-border cursor-pointer relative"
        onClick={() => setOpen(!open)}
      >
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase font-bold text-dark-forest">
            Admin Architect
          </p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
            SUPER ADMIN
          </p>
        </div>

        <div className="w-10 h-10 bg-sage/10 rounded-full border border-sage/20 flex items-center justify-center font-bold text-sage text-xs">
          AD
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-3 w-48 bg-white border border-border shadow-xl rounded-xl overflow-hidden z-50"
            >
              <Link href={'profile'} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors">
                <User size={16} /> Profile
              </Link>

              <Link href={'settings'} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors">
                <Settings size={16} /> Settings
              </Link>

              <div className="border-t border-border" />

              <button
                onClick={onLogoutClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}