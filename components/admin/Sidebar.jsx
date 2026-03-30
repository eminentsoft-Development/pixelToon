"use client";

import { LayoutDashboard, Image as ImageIcon, Package, LogOut, X, Layers, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTransition } from "react";
import Image from "next/image";
import { handleLogout } from "@/app/action/auth";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Courses", icon: Package, href: "/admin/courses" },
  { name: "Category", icon: Layers, href: "/admin/category" },
    { name: "Blogs", icon: FileText, href: "/admin/blogs" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },

];

export default function Sidebar({ isOpen, toggle }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onLogoutClick = () => {
     startTransition(async () => {
      await handleLogout();
    });
  };

  return (
    <>
      {/* 1. Mobile Sidebar (Slide-in Overlay) */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-72 bg-[#080808] text-white z-[60] lg:hidden flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={"/logo-icon.png"}
              width={40}
              height={40}
              alt="logo-icon"
            ></Image>
            <span className="font-extrabold tracking-widest text-primary uppercase text-base whitespace-nowrap">
              Admin Portal
            </span>
          </div>

          <button
            onClick={toggle}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={toggle}>
              <div
                className={`flex items-center gap-4 p-4 rounded-sm transition-all ${pathname === item.href ? "bg-deep-green text-white" : "text-gray-400 hover:text-white"}`}
              >
                <item.icon size={22} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.2em] font-bold">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-4 text-gray-500 hover:text-red-400 p-4 w-full">
            <LogOut size={22} />
            <span className="text-xs uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* 2. Desktop Sidebar (Fixed/Collapsible) */}
      <aside
        className={`hidden lg:flex flex-col bg-[#080808] text-white transition-all duration-300 h-full overflow-hidden shrink-0 z-50 ${isOpen ? "w-64" : "w-20"}`}
      >
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Image
            src={"/logo-icon.png"}
            width={40}
            height={40}
            alt="logo-icon"
          ></Image>

          {isOpen && (
            <span className="font-extrabold tracking-widest text-primary uppercase text-base whitespace-nowrap">
              Admin Portal
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 p-3 transition-all group rounded-sm ${pathname === item.href ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <item.icon size={20} strokeWidth={1.5} className="shrink-0" />
              {isOpen && (
                <span className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

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
