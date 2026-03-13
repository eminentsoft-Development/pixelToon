"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { MegaDropdown } from "../Common/MegaDropdown";
import Dropdown from "../Common/Dropdown";
import { NavbarmenuData } from "@/contant/menu";

const Navbar = () => {
  const currentPath = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-transform duration-300"
        style={{ transform: isScrolled ? 'translateY(-40px)' : 'translateY(0)' }}>

        <header className={`w-full bg-white transition-shadow duration-300 ${isScrolled ? "shadow-xl" : ""}`}>
          <div className="h-20 px-4 lg:px-20 flex items-center justify-between">
            <Link href={"/"} className="w-[220px] md:w-[250px]">
              {/* Added explicit width/height to logo container */}
              <Image
                src="/logo.png"
                width={300}
                height={60}
                alt="PixelToonz logo"
                sizes="250px"
                className="w-40"
              />            </Link>

            <nav className="hidden lg:flex">
              <ul className="flex rtl:flex-row-reverse items-center gap-2 font-bold text-textColor text-base">
                {NavbarmenuData.map((item) => {
                  if (item.subMenu) {
                    return (
                      <li key={item.id}>
                        {item.subMenuType === "mega" ? (
                          <MegaDropdown title={item.title} path={item.path} menuChildren={item.children} />
                        ) : (
                          <Dropdown title={item.title} path={item.path} menuChildren={item.children} />
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.id} className="px-2 py-1 rounded-md hover:bg-gray-100 tracking-wider">
                      <Link
                        href={item.path}
                        className={currentPath === item.path ? "text-primary" : ""}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* MOBILE MENU ICON */}
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                {mobileMenuOpen ? <X size={34} /> : <MenuIcon size={34} />}
              </button>
            </div>

          </div>

          {/* MOBILE MENU */}
          <div className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg transition-all ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
            <nav className="px-4 pt-3 pb-5">
              <ul className="flex flex-col gap-1 text-textColor font-semibold">
                {NavbarmenuData.map((item) => (
                  <li key={item.id} className={`rounded-md px-2 hover:bg-gray-100 ${currentPath === item.path ? "bg-gray-100 text-primary" : ""}`}>
                    <Link href={item.path} className="block py-3">{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header >
      </div >
      <div className="h-[80px] lg:h-[120px] w-full" aria-hidden="true" />
    </>
  );
};

export default Navbar;