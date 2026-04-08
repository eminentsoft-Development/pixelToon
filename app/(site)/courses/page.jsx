import React from "react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CourseCard from "@/components/site/CourseCard";
import { DynamicPagination } from "@/components/site/Pagination";


const ITEMS_PER_PAGE = 6;

export async function getCourses(page = 1, limit = 9) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/course?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return { courses: [], totalPages: 0 };
    return res.json();
  } catch (error) {
    console.error("Courses build fetch failed:", error.message);
    // Return empty state so the build can finish
    return { courses: [], totalPages: 0 };
  }
}


const CourseListing = async ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;

  const { courses, totalPages } = await getCourses(currentPage, ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs />
      <div className="container mx-auto py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
              Explore <span className="text-[#BC430D]">Programs</span>
            </h1>
            <p className="text-slate-500 max-w-md font-medium">
              Industry-standard training in Film, VFX, and Media Design.
              Personalized attention with only 12 students per batch.
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses?.map((course, index) => (
            <CourseCard key={index} {...course} index={index} />
          ))}
        </div>

        {/* Pagination Controls */}
        <DynamicPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CourseListing;
