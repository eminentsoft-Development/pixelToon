"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MenuIcon,
  Twitter,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MegaDropdown } from "../Common/MegaDropdown";
import Dropdown from "../Common/Dropdown";
import { NavbarmenuData } from "@/contant/menu";

const Navbar = () => {
  const currentPath = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              ? "bg-white/60 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 h-24"
              : " h-28"
          }`}
        >
          <div
            className={`flex mx-2 lg:mx-20  py-1 items-center justify-between w-full 
                ${isScrolled ? "bg-transparent px-0" : "bg-white/40 backdrop-blur-md border px-4 md:px-10 border-white/20 rounded-full shadow-lg transition-all duration-300"}`}
          >
            <Link href="/" className="w-[220px] md:w-[250px]">
              <Image
                src="/logo.png"
                width={300}
                height={70}
                alt="PixelToonz logo"
                sizes="300px"
                className="w-48"
              />
            </Link>
            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-3 font-normal text-textColor text-sm">
                  {NavbarmenuData.map((item) => {
                    if (item.subMenu) {
                      return item.subMenuType === "mega" ? (
                        <MegaDropdown
                          isScrolled={isScrolled}
                          key={item.id}
                          title={item.title}
                          menuChildren={item.children}
                        />
                      ) : (
                        <Dropdown
                          isScrolled={isScrolled}
                          key={item.id}
                          title={item.title}
                          path={item.path}
                          menuChildren={item.children}
                        />
                      );
                    }

                    return (
                      <li
                        key={item.id}
                        className={`px-2 py-1 rounded-md ${isScrolled ? "text-black" : "text-white"} hover:bg-gray-100  hover:text-primary transition-colors text-[13px] uppercase font-extrabold tracking-wide `}
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
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Facebook size={18} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Instagram size={18} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Linkedin size={18} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Twitter size={18} />
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
            className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg transition-all ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <nav className="px-4 pt-3 pb-5">
              <ul className="flex flex-col gap-1 text-black font-semibold">
                {NavbarmenuData.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-md px-2 hover:bg-gray-100 ${
                      currentPath === item.path
                        ? "bg-gray-100 text-primary"
                        : ""
                    }`}
                  >
                    <Link href={item.path} className="block py-3">
                      {item.title}
                    </Link>
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
