"use client";

import { useState } from "react";
import { GraduationCap, Heart, Film, Calendar, LayoutGrid } from "lucide-react";
import GallerySidebar from "@/components/admin/GallerySidebar";
import ImageGalleryTab from "@/components/admin/ImageGalleryTab";
import VideosTab from "@/components/admin/VideosTab";
import EventsTab from "@/components/admin/EventsTab";

const SECTION_META = {
  "students-work": {
    label: "Students Work",
    icon: GraduationCap,
    color: "#6366f1",
    bg: "#eef2ff",
    description: "Showcase student artwork and projects",
  },
  "students-life": {
    label: "Students Life & Events",
    icon: Heart,
    color: "#ec4899",
    bg: "#fdf2f8",
    description: "Capture campus life and student moments",
  },
  videos: {
    label: "Videos Gallery",
    icon: Film,
    color: "#f59e0b",
    bg: "#fffbeb",
    description: "Manage YouTube video embeds",
  },
  "latest-events": {
    label: "Latest Events",
    icon: Calendar,
    color: "#10b981",
    bg: "#ecfdf5",
    description: "Create and manage school events with photo albums",
  },
};

export default function GalleryAdminPage() {
  const [activeSection, setActiveSection] = useState("students-work");
  const meta = SECTION_META[activeSection];
  const SectionIcon = meta.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <LayoutGrid size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              Gallery Management
            </h1>
            <p className="text-xs text-slate-400">
              Manage all gallery sections and media
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        <GallerySidebar
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        <main className="flex-1 min-w-0">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: meta.bg }}
            >
              <SectionIcon size={20} style={{ color: meta.color }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{meta.label}</h2>
              <p className="text-xs text-slate-400">{meta.description}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {activeSection === "students-work" && (
              <ImageGalleryTab category="students-work" />
            )}
            {activeSection === "students-life" && (
              <ImageGalleryTab category="students-life" />
            )}
            {activeSection === "videos" && <VideosTab />}
            {activeSection === "latest-events" && <EventsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}