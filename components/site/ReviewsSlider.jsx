"use client";

import { useEffect, useState, useMemo } from "react";
import { ReviewCard } from "./ReviewCard";

const CARD_WIDTH = 380;
const GAP = 24;
const AUTO_PLAY_INTERVAL = 4000;

export default function ReviewsSlider({ initialReviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Debounced resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); 

    let timer;
    const debounced = () => { clearTimeout(timer); timer = setTimeout(check, 150); };
    window.addEventListener("resize", debounced);
    return () => { window.removeEventListener("resize", debounced); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (isPaused || initialReviews.length === 0) return;
    const interval = setInterval(() => setCurrentIndex((p) => p + 1), AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, initialReviews.length]);

  const tripleReviews = useMemo(() => {
    if (initialReviews.length === 0) return [];
    return [...initialReviews, ...initialReviews, ...initialReviews];
  }, [initialReviews]);

  const displayIndex = initialReviews.length > 0
    ? (currentIndex % initialReviews.length) + initialReviews.length
    : 0;
    
  const xOffset = isMobile
    ? `calc(-${displayIndex} * (100% + ${GAP}px))`
    : `calc(-${displayIndex} * (${CARD_WIDTH}px + ${GAP}px))`;

  if (initialReviews.length === 0) return null;

  return (
    <>
      <div className="mx-auto relative">
        <div
          className="relative overflow-hidden group py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Native CSS Transition replaces framer-motion */}
          <div
            className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[380px] gap-6"
            style={{
              transform: `translateX(${xOffset})`,
              transition: "transform 0.5s ease-in-out",
              willChange: "transform"
            }}
          >
            {tripleReviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className="w-full">
                <ReviewCard
                  review={review}
                  setIsPaused={setIsPaused}
                  isActive={(currentIndex % initialReviews.length) === (index % initialReviews.length)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center mt-6 gap-2 mb-2">
        {initialReviews.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              (currentIndex % initialReviews.length) % 5 === i ? "w-8 bg-blue-600" : "w-2 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </>
  );
}