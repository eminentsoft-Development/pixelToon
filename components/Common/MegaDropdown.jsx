"use client";

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function MegaDropdown({ title, menuChildren }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="px-2 py-1 uppercase font-extrabold tracking-wide text-[13px] text-textColor bg-transparent hover:bg-transparent hover:text-primary">
        {title}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="min-w-[700px] rounded-xl bg-white shadow-lg p-3 grid grid-cols-3 gap-3">
          {menuChildren.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className="group rounded-lg px-2 py-2 transition-all hover:bg-primary/5"
            >
              <p className="text-sm font-bold mb-1 text-textColor group-hover:text-primary line-clamp-1">
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
        <NavigationMenuViewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenuItem>
  );
}
