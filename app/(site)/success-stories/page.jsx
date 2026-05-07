import Breadcrumbs from "@/components/site/Breadcrumbs";
import React from "react";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import SuccessStory from "@/models/SuccessStory";
import { DynamicPagination } from "@/components/site/Pagination";

export const revalidate = 0;
const ITEMS_PER_PAGE = 12;

const SuccessStoriesPage = async ({ searchParams }) => {
  await connectDB();
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [stories, totalStories] = await Promise.all([
    SuccessStory.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .lean(),
    SuccessStory.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalStories / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white text-black">
      <Breadcrumbs />

      <div className="container mx-auto py-20">
        {/* Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="group relative h-[380px] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg"
            >
              <Image
                src={story.imageUrl}
                alt={story.altText || "Success Story"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-fill transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10">
            <DynamicPagination totalPages={totalPages} />
          </div>
        )}

        {stories.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">
              No success stories found on this page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
