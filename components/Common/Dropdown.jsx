"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Dropdown = ({ title, menuChildren, path, isScrolled }) => {
  const currentPath = usePathname();
    const isActive = currentPath === path;
  
  return (
    <NavigationMenu className="relative z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`hover:bg-gray-100 h-fit px-2 py-1 uppercase font-extrabold tracking-wide text-[13px] ${isScrolled ? "text-black" : "text-white"} hover:text-primary`}
          >
            <Link
              href={path || ""}
              className={` uppercase h-full w-full font-extrabold text-[13px] transition-colors flex items-center gap-1
          ${isActive ? "text-primary" : isScrolled ? "text-black" : "text-white"}
        hover:text-primary
        `}
            >
              {title}
            </Link>
          </NavigationMenuTrigger>

          {/* Positioning the content directly under the trigger */}
          <NavigationMenuContent className="absolute left-0 top-0 w-auto">
            <ul className="flex w-[220px] flex-col gap-1 bg-white rounded-xl shadow-2xl border border-gray-100">
              {menuChildren.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.path}
                    className="block select-none rounded-lg px-4 py-3 no-underline outline-none transition-colors hover:bg-primary/5 group"
                  >
                    <div className={`text-sm font-bold transition-colors`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <p className="line-clamp-2 text-[11px] leading-snug text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* CRITICAL: The Viewport is what actually renders the dropdown 'box' */}
      <div className="absolute left-0 top-full flex justify-center">
        <NavigationMenuViewport
          className="
            origin-top-center relative mt-1.5
            h-[var(--radix-navigation-menu-viewport-height)]
            w-full overflow-hidden rounded-xl
            bg-white shadow-lg
            border-0 ring-0
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=closed]:zoom-out-95
            data-[state=open]:zoom-in-90
            md:w-[var(--radix-navigation-menu-viewport-width)]"
        />
      </div>
    </NavigationMenu>
  );
};

export default Dropdown;
