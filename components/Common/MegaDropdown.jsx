"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function MegaDropdown({ title, menuChildren, path }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-2 bg-transparent hover:bg-transparentv">
            <Link
              href={path}
              className="px-2 py-1 font-bold text-base text-textColor hover:text-primary transition-colors"
            >
              {title}
            </Link>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="min-w-[700px] rounded-xl bg-white shadow-md p-4 grid grid-cols-3 gap-2">
              {menuChildren.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  className="group rounded-lg px-3 py-2 transition-all hover:bg-primary/5"
                >
                  <p className="text-sm font-bold tracking-wider mb-1 text-textColor group-hover:text-primary line-clamp-1">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500 leading-tight line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
