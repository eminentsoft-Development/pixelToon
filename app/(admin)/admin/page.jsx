"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  BookOpen,
  PenTool,
  Star,
  MoreVertical,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState({ stats: null, recentActivity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-gray-400 font-medium">
        Loading original data...
      </div>
    );

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your courses, blogs, and student success stories.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={"admin/courses/add"} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
            <Plus size={18} /> New Course
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Active Courses"
          value={data.stats?.courses}
          icon={<BookOpen className="text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Total Blogs"
          value={data.stats?.blogs}
          icon={<PenTool className="text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Featured Content"
          value={data.stats?.featured}
          icon={<Star className="text-amber-600" />}
          bgColor="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-lg">Recent Content</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.recentActivity.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        /{item.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                          item.type === "Course"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${item.isPublished ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        <span className="text-sm text-gray-600 font-medium">
                          {item.isPublished ? "Live" : "Draft"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400 hover:text-gray-900 cursor-pointer">
                      <MoreVertical size={18} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6"></div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md">
      <div
        className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-black text-gray-900 leading-tight">
          {value ?? 0}
        </h3>
      </div>
    </div>
  );
}
