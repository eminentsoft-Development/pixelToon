import Breadcrumbs from "@/components/site/Breadcrumbs";
import React from "react";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import SuccessStory from "@/models/SuccessStory";
import { DynamicPagination } from "@/components/site/Pagination";

export const revalidate = 3600; 
const ITEMS_PER_PAGE = 16;

export async function generateMetadata() {
  return {
    title: "Success Stories - Pixeltoonz Academy",
    description:
      "Discover inspiring success stories from our talented students at Pixeltoonz Academy, showcasing their creative journeys and achievements in the world of VFX, animation, and graphic design.",
    alternates: {
      canonical: "https://www.pixeltoonzacademy.com/success-stories",
    },
  };
}


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
        {stories.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No success stories found on this page.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {stories.map((story, i) => (
                <div
                  key={story._id?.toString() ?? i}
                  className="group relative w-full overflow-hidden rounded-2xl shadow-md bg-slate-100
                             hover:shadow-xl transition-shadow duration-300"
                  style={{ aspectRatio: "2 / 2.1" }}
                >
                  <Image
                    src={story.imageUrl}
                    alt={story.altText || "Success Story"}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={i < 4}
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10">
                <DynamicPagination totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesPage;