"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import AdminHeader from "@/components/admin/Header";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024); // lg breakpoint
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-layout-container flex h-screen overflow-hidden">
      <Toaster position="top-right" richColors />

      {/* Sidebar Component handles its own internal responsiveness */}
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Mobile Overlay (Darkened backdrop when sidebar is open on mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-dark-forest/60 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto lg:px-16 py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
