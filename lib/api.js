export async function apiRequest(url, opts = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  return res.json();
}

export const SECTIONS = [
  {
    id: "students-work",
    label: "Students Work",
    icon: "GraduationCap",
    color: "#6366f1",
    bg: "#eef2ff",
    description: "Showcase student artwork and projects",
  },
  {
    id: "students-life",
    label: "Students Life & Events",
    icon: "Heart",
    color: "#ec4899",
    bg: "#fdf2f8",
    description: "Capture campus life and student moments",
  },
  {
    id: "videos",
    label: "Videos Gallery",
    icon: "Film",
    color: "#f59e0b",
    bg: "#fffbeb",
    description: "Manage YouTube video embeds",
  },
  {
    id: "latest-events",
    label: "Latest Events",
    icon: "Calendar",
    color: "#10b981",
    bg: "#ecfdf5",
    description: "Create and manage school events with photo albums",
  },
];