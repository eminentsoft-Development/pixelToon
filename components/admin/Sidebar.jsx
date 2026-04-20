"use client";

import {
  LayoutDashboard,
  Image as ImageIcon,
  Package,
  LogOut,
  X,
  Layers,
  FileText,
  ChevronDown, // Added this
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { useTransition, useState } from "react"; // Added useState
import Image from "next/image";
import { handleLogout } from "@/app/action/auth";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  {
    name: "Courses",
    icon: FileText,
    href: "",
    submenu: [
      { name: "All Courses", href: "/admin/courses" },
      { name: "Add Course", href: "/admin/courses/add" },
    ],
  },
  {
    name: "Blogs",
    icon: FileText,
    href: "",
    submenu: [
      { name: "All Blogs", href: "/admin/blogs" },
      { name: "Add Blogs", href: "/admin/blogs/add" },
    ],
  },
  {
    name: "Gallery",
    icon: ImageIcon,
    href: "/admin/gallery",
  },
];

export default function Sidebar({ isOpen, toggle }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const onLogoutClick = () => {
    startTransition(async () => {
      await handleLogout();
    });
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  // Shared Submenu Render Logic
  const renderSubmenu = (items, isMobile = false) => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden bg-white/5 rounded-sm mt-1 ml-4"
    >
      {items.map((sub) => (
        <Link
          key={sub.name}
          href={sub.href}
          onClick={isMobile ? toggle : undefined}
          className={`block p-3 text-[10px] uppercase tracking-widest font-medium transition-colors ${
            pathname === sub.href
              ? "text-primary"
              : "text-gray-500 hover:text-white"
          }`}
        >
          {sub.name}
        </Link>
      ))}
    </motion.div>
  );

  return (
    <>
      {/* 1. Mobile Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-72 bg-[#080808] text-white z-[60] lg:hidden flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo-icon.png" width={40} height={40} alt="logo" />
            <span className="font-extrabold tracking-widest text-primary uppercase text-base whitespace-nowrap">
              Admin Portal
            </span>
          </div>
          <button
            onClick={toggle}
            className="p-2 hover:bg-white/5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="flex items-center justify-between w-full p-4 text-gray-400 hover:text-white"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={22} />
                      <span className="text-xs uppercase tracking-[0.2em] font-bold">
                        {item.name}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSubmenu === item.name &&
                      renderSubmenu(item.submenu, true)}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={item.href} onClick={toggle}>
                  <div
                    className={`flex items-center gap-4 p-4 rounded-sm transition-all ${pathname === item.href ? "bg-deep-green text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <item.icon size={22} />
                    <span className="text-xs uppercase tracking-[0.2em] font-bold">
                      {item.name}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>
        {/* ... Logout Button ... */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={onLogoutClick}
            disabled={isPending}
            className="flex items-center gap-4 text-gray-500 hover:text-red-400 transition-colors w-full overflow-hidden disabled:opacity-50"
          >
            <LogOut size={20} className="shrink-0" />
            {isOpen && (
              <span className="text-[10px] uppercase tracking-widest">
                {isPending ? "Logging out..." : "Logout"}
              </span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* 2. Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-[#080808] text-white transition-all duration-300 h-full overflow-hidden shrink-0 z-50 ${isOpen ? "w-64" : "w-20"}`}
      >
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Image src="/logo-icon.png" width={40} height={40} alt="logo" />
          {isOpen && (
            <span className="font-extrabold tracking-widest text-primary uppercase text-base">
              Admin Portal
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.submenu && isOpen ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="flex items-center justify-between w-full p-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all group rounded-sm"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className="shrink-0" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        {item.name}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSubmenu === item.name && renderSubmenu(item.submenu)}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 p-3 transition-all group rounded-sm ${pathname === item.href ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                >
                  <item.icon size={20} className="shrink-0" />
                  {isOpen && (
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                      {item.name}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
        {/* ... Logout Button ... */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={onLogoutClick}
            disabled={isPending}
            className="flex items-center gap-4 text-gray-500 hover:text-red-400 transition-colors w-full overflow-hidden disabled:opacity-50"
          >
            <LogOut size={20} className="shrink-0" />
            {isOpen && (
              <span className="text-[10px] uppercase tracking-widest">
                {isPending ? "Logging out..." : "Logout"}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
