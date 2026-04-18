"use client";

import {
  GraduationCap,
  Heart,
  Film,
  Calendar,
  ChevronRight,
  Sparkles,
  Star,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = { GraduationCap, Heart, Film, Calendar };

const SECTIONS = [
  {
    id: "students-work",
    label: "Students Work",
    icon: "GraduationCap",
    color: "#6366f1",
  },
  {
    id: "students-life",
    label: "Students Life & Events",
    icon: "Heart",
    color: "#ec4899",
  },
  {
    id: "videos",
    label: "Videos Gallery",
    icon: "Film",
    color: "#f59e0b",
  },
  {
    id: "latest-events",
    label: "Latest Events",
    icon: "Calendar",
    color: "#10b981",
  },
];

export default function GallerySidebar({ activeSection, onSelect }) {
  return (
    <aside className="w-56 shrink-0">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Sections
          </p>
        </div>
        <nav className="p-2 space-y-0.5">
          {SECTIONS.map((section) => {
            const Icon = ICON_MAP[section.icon];
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelect(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                  isActive ? "text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
                )}
                style={isActive ? { backgroundColor: section.color } : {}}
              >
                <Icon
                  size={15}
                  className={isActive ? "text-white" : "text-slate-400"}
                />
                <span className="text-xs font-semibold leading-tight">
                  {section.label}
                </span>
                {isActive && (
                  <ChevronRight size={12} className="ml-auto text-white/70" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tips card */}
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Tips
        </p>
        <ul className="space-y-2 text-xs text-slate-500">
          <li className="flex items-start gap-1.5">
            <Sparkles size={10} className="mt-0.5 text-indigo-400 shrink-0" />
            Drag images to reorder them
          </li>
          <li className="flex items-start gap-1.5">
            <Star size={10} className="mt-0.5 text-amber-400 shrink-0" />
            First image becomes the cover
          </li>
          <li className="flex items-start gap-1.5">
            <Eye size={10} className="mt-0.5 text-emerald-400 shrink-0" />
            Toggle publish to go live
          </li>
        </ul>
      </div>
    </aside>
  );
}