import React from "react";
import ScrollReveal from "./ScrollReveal";
import ReviewsSlider from "./ReviewsSlider";

export default async function GoogleReviews() {
  // Fetch data on the server! 
  // Next.js will cache this and revalidate every hour (3600 seconds)
  let reviews = [];
  try {
    const res = await fetch("https://featurable.com/api/v2/widgets/af9ec977-25fe-4086-bbbc-01f1dd08c1c4", {
      next: { revalidate: 3600 } 
    });
    const data = await res.json();
    if (data.success && data.widget?.reviews) {
      reviews = data.widget.reviews;
    }
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
  }

  if (!reviews.length) return null;

  return (
    <section className="py-16 md:py-20 container">
      <ScrollReveal delay={0} direction="up" className="mx-auto mb-12 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Live Feedback
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Google Reviews
          </h2>
        </div>
      </ScrollReveal>

      {/* Client-side Slider */}
      <ScrollReveal delay={100} direction="up">
        <ReviewsSlider initialReviews={reviews} />
      </ScrollReveal>
    </section>
  );
}