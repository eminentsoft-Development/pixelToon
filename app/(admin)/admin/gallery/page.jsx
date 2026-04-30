"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Heart,
  Video,
  CalendarDays,
  Images,
} from "lucide-react";
import LatestEvents from "@/components/admin/Gallery/EventGallery";
import StudentsLifeEvents from "@/components/admin/Gallery/StudentsLifeEvents";
import StudentsWork from "@/components/admin/Gallery/StudentsWork";
import VideosGallery from "@/components/admin/Gallery/VideoGallery";
const TABS = [
  {
    id: "students-work",
    label: "Students Work",
    icon: GraduationCap,
    description: "Showcase student artwork and projects",
    component: StudentsWork,
  },
  {
    id: "students-life",
    label: "Students Life & Events",
    icon: Heart,
    description: "Campus life moments and event memories",
    component: StudentsLifeEvents,
  },
  {
    id: "videos",
    label: "Videos Gallery",
    icon: Video,
    description: "Video content and recordings",
    component: VideosGallery,
  },
  {
    id: "latest-events",
    label: "Latest Events",
    icon: CalendarDays,
    description: "Recent and upcoming event highlights",
    component: LatestEvents,
  },
];

export default function GalleryManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the active tab from URL (?tab=...) or default to the first tab
  const activeTab = searchParams.get("tab") || "students-work";

  const handleTabChange = (tabId) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tabId);
    // Use { scroll: false } to prevent the page from jumping to top
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeTabData = TABS.find((t) => t.id === activeTab) || TABS[0];
  const ActiveComponent = activeTabData.component;

  return (
    <div className="min-h-screen mb-6 mt-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#1a1a2e] flex items-center justify-center">
            <Images className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Gallery Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage all gallery sections and media
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex items-center gap-2.5 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 flex-1 justify-center border-b-2 ${
                  isActive
                    ? "text-[#5b4fcf] border-[#5b4fcf] bg-[#5b4fcf]/5"
                    : "text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-[#5b4fcf]" : "text-gray-400"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {ActiveComponent && (
            <ActiveComponent
              tabLabel={activeTabData.label}
              tabDescription={activeTabData.description}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}