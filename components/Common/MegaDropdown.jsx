"use client";

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MegaDropdown({ title, path, menuChildren, isScrolled }) {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`px-2 py-1 uppercase h-fit hover:bg-gray-100  font-extrabold tracking-wide text-[13px] ${isScrolled ? "text-black" : "text-black"} hover:text-primary  ${currentPath === path ? "text-primary" : " "}`}
      >
        <Link
          href={path || ""}
          className={` uppercase h-full w-full font-extrabold text-[13px] transition-colors flex items-center gap-1
          ${isActive ? "text-primary" : isScrolled ? "text-black" : "text-black"}
        hover:text-primary
        `}
        >
          {title}
        </Link>
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="min-w-[700px] rounded-xl bg-white shadow-lg p-3 grid grid-cols-3 gap-3">
          {menuChildren?.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className="group rounded-lg px-2 py-2 transition-all hover:bg-primary/5"
            >
              <p className="text-sm font-bold mb-1 line-clamp-1">
                {item.title}
              </p>

              <p className="text-xs text-gray-500 leading-tight line-clamp-2">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </NavigationMenuContent>

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
    </NavigationMenuItem>
  );
}
