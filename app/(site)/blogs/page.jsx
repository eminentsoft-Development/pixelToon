import Breadcrumbs from "@/components/site/Breadcrumbs";
import React from "react";
import BlogCard from "@/components/site/BlogCard";
import { DynamicPagination } from "@/components/site/Pagination";


const ITEMS_PER_PAGE = 9;

export async function getBlogs(page = 1, limit = 6) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?page=${page}&limit=${limit}`, {
    next: { revalidate: 60 } // Cache for 1 min, or use 'no-store' for real-time
  });
  
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

const Page = async ({ searchParams }) => {
const currentPage = Number(searchParams.page) || 1;

const { blogs, totalPages } = await getBlogs(currentPage, ITEMS_PER_PAGE);
 
  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      <div className="container mx-auto py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
              Latest <span className="text-[#BC430D]">News</span>
            </h1>
            <p className="text-slate-500 max-w-md font-medium">
              Industry-standard training in Film, VFX, and Media Design.
              Personalized attention with only 12 students per batch.
            </p>
          </div>

         
        </div>

        {/* Courses Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {blogs.map((blog, index) => (
              <BlogCard key={index} {...blog} index={index} />
            ))}
        </div>

        {/* Pagination Controls */}
        <DynamicPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
