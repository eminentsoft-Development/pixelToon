import React from "react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CourseCard from "@/components/site/CourseCard";
import { DynamicPagination } from "@/components/site/Pagination";
import { getFullCourses } from "../../../lib/get-courses";

const ITEMS_PER_PAGE = 12;

const CourseListing = async ({ searchParams }) => {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  
  const { courses, totalPages } = await getFullCourses(
    currentPage,
    ITEMS_PER_PAGE,
  );

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
