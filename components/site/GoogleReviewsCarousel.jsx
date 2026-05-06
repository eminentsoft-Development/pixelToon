"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";

export default function GoogleReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const CARD_WIDTH = 380;
  const GAP = 24;
  const AUTO_PLAY_INTERVAL = 4000;

  const tripleReviews = useMemo(() => {
    if (reviews.length === 0) return [];
    return [...reviews, ...reviews, ...reviews];
  }, [reviews]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    let isMounted = true;
    fetch("https://featurable.com/api/v2/widgets/af9ec977-25fe-4086-bbbc-01f1dd08c1c4")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.widget?.reviews) {
          setReviews(data.widget.reviews);
        }
        if (isMounted) setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });
    
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (isPaused || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const xOffset = useMemo(() => {
    if (reviews.length === 0) return "0px";
    const displayIndex = (currentIndex % reviews.length) + reviews.length;
    return isMobile
      ? `calc(-${displayIndex} * (100% + ${GAP}px))`
      : `calc(-${displayIndex} * (${CARD_WIDTH}px + ${GAP}px))`;
  }, [currentIndex, reviews.length, isMobile]);

  if (isLoading || reviews.length === 0) return null;

  return (
    <section className="py-16 md:py-20 container">
      <div className="mx-auto mb-12 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Live Feedback
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Google Reviews
          </h2>
        </div>
      </div>

      <div className="mx-auto relative">
        <div
          className="relative overflow-hidden group py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[380px] gap-6"
            animate={{ x: xOffset }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 14,
              mass: 1
            }}
          >
            {tripleReviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className="w-full">
                <ReviewCard
                  review={review}
                  setIsPaused={setIsPaused}
                  isActive={(currentIndex % reviews.length) === (index % reviews.length)}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center mt-6 gap-2 mb-2">
        {reviews.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              (currentIndex % reviews.length) % 5 === i ? "w-8 bg-blue-600" : "w-2 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}