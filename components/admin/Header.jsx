"use client";

import { Menu, Bell, Search } from "lucide-react";
import AdminProfile from "./AdminProfile";
import { useTransition } from "react";
import { handleLogout } from "@/app/action/auth";

export default function AdminHeader({ toggleSidebar }) {
  const [isPending, startTransition] = useTransition();

  const onLogoutClick = () => {
    startTransition(async () => {
      await handleLogout();
    });
  };

  return (
    <header className="h-20 bg-white border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-dark-forest transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      <AdminProfile onLogoutClick={onLogoutClick} />
    </header>
  );
}
