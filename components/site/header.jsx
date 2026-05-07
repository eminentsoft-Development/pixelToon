"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  MenuIcon,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MegaDropdown } from "../Common/MegaDropdown";
import Dropdown from "../Common/Dropdown";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = ({ courses }) => {
  const NavbarmenuData = [
    {
      id: 1,
      title: "Home",
      path: "/",
      newTab: false,
      subMenu: false,
    },
    {
      id: 2,
      title: "About",
      path: "/about-us",
      newTab: false,
      subMenu: false,
    },
    {
      id: 3,
      title: "Courses",
      path: "/courses",
      newTab: false,
      subMenu: true,
      subMenuType: "mega",
      children: courses,
    },
    {
      id: 4,
      title: "Gallery",
      path: "",
      newTab: false,
      subMenu: true,
      subMenuType: "normal",
      children: [
        {
          title: "Students Work",
          path: "/gallery/students-work",
        },
        {
          title: "Video Gallery",
          path: "/gallery/video-gallery",
        },
        {
          title: "Student Life & Events",
          path: "/gallery/students-life-events",
        },
        {
          title: "Latest Events",
          path: "/gallery/latest-events",
        },
      ],
    },
    {
      id: 5,
      title: "Blogs",
      path: "/blogs",
      newTab: false,
      subMenu: false,
    },
    {
      id: 6,
      title: "Success Stories",
      path: "/success-stories",
      newTab: false,
      subMenu: false,
    },
    {
      id: 7,
      title: "Contact",
      path: "/contact-us",
      newTab: false,
      subMenu: false,
    },
  ];
  const currentPath = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSubMenu = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Using 20px or 50px usually feels smoother for the user
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <header
          className={`w-full flex justify-center items-center bg-transparent transition-shadow duration-300 ${
            isScrolled
              ? "bg-white border border-gray-200 shadow-lg transition-all duration-300 h-24"
              : " h-28"
          }`}
        >
          <div
            className={`flex mx-2 lg:mx-20 py-1 items-center justify-between w-full 
                ${isScrolled ? "bg-white/80 px-0" : "bg-white border border-white/20 px-4 md:px-10  rounded-full shadow-lg transition-all duration-300"}`}
          >
            <Link href="/" className="w-[220px] md:w-[280px]">
              <Image
                src="/logo_.png"
                width={350}
                height={80}
                alt="PixelToonz logo"
                sizes="350px"
                className="w-44 md:w-52"
                // className="w-48 invert brightness-0"
              />
            </Link>
            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-3 font-normal text-sm">
                  {NavbarmenuData.map((item, i) => {
                    if (item.subMenu) {
                      return item.subMenuType === "mega" ? (
                        <MegaDropdown
                          isScrolled={isScrolled}
                          key={i}
                          title={item.title}
                          path={item.path}
                          menuChildren={item.children}
                        />
                      ) : (
                        <Dropdown
                          isScrolled={isScrolled}
                          key={i}
                          title={item.title}
                          path={item.path}
                          menuChildren={item.children}
                        />
                      );
                    }

                    return (
                      <li
                        key={i}
                        className={`px-2 py-1 rounded-md ${isScrolled ? "text-black" : "text-black"} hover:bg-gray-100  hover:text-primary transition-colors text-[13px] uppercase font-extrabold tracking-wide `}
                      >
                        <Link
                          href={item.path}
                          className={
                            currentPath === item.path
                              ? "text-primary border-b-2 pb-1 border-b-primary"
                              : ""
                          }
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            {/* SOCIAL ICONS */}
            <ul className="hidden lg:flex items-center gap-5">
              <li>
                <a
                  href="https://www.facebook.com/pixeltoonz"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Facebook size={18} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/pixeltoonz/?igshid=1b7pgky2g3bi4"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Instagram size={18} />
                </a>
              </li>
            
              <li>
                <a
                  href="https://www.youtube.com/channel/UCIKz0ZYOA54p-86TL-eXkAg"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Youtube size={24} />
                </a>
              </li>
            </ul>
            {/* MOBILE MENU BUTTON */}
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                {mobileMenuOpen ? <X size={34} /> : <MenuIcon size={34} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}

          <div
            className={`lg:hidden fixed inset-x-3 top-[100px] bg-white rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 ease-in-out z-[90] ${
              mobileMenuOpen
                ? "max-h-[85vh] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-10 pointer-events-none"
            }`}
          >
            <nav className="p-6 overflow-y-auto max-h-[75vh]">
              <ul className="flex flex-col gap-1 text-black font-semibold">
                {NavbarmenuData.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-lg px-2 hover:bg-gray-100 ${
                      currentPath === item.path
                        ? "bg-gray-100 text-primary"
                        : ""
                    }`}
                  >
                    {item.subMenu ? (
                      <div className="flex flex-col">
                        <button
                          onClick={() => toggleSubMenu(item.id)}
                          className="flex items-center justify-between w-full py-3 text-left font-bold text-slate-800"
                        >
                          <span
                            
                          >
                            {item.title}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${expandedItem === item.id ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItem === item.id && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="mt-1 ml-2 pl-4 border-l border-slate-200"
                            >
                              <ul className="flex flex-col">
                                {item.children?.map((child, idx) => {
                                  const isActive = currentPath === child.path;

                                  return (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.04 }}
                                    >
                                      <Link
                                        href={child.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="group flex items-center py-3 relative"
                                      >
                                        {/* Minimalist Indicator */}
                                        <span
                                          className={`absolute -left-[17.5px] w-2 h-2 rounded-full border-2 border-white transition-all duration-300 ${
                                            isActive
                                              ? "bg-[#BC430D] scale-125 shadow-[0_0_8px_#BC430D]"
                                              : "bg-slate-200"
                                          }`}
                                        />

                                        <div className="flex flex-col">
                                          <span
                                            className={`text-sm font-bold transition-colors ${
                                              isActive
                                                ? "text-[#BC430D]"
                                                : "text-slate-500 group-hover:text-slate-900"
                                            }`}
                                          >
                                            {child.title}
                                          </span>

                                          {/* Optional: Tiny description if your courses have them */}
                                          {child.description && (
                                            <span className="text-[10px] text-slate-400 font-medium line-clamp-1">
                                              {child.description}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    </motion.li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3 text-base font-bold ${
                          currentPath === item.path
                            ? "text-[#BC430D]"
                            : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
