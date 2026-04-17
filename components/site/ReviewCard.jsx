import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export const ReviewCard = ({ review, setIsPaused, isActive }) => {
  const { author, rating, text } = review;
  const [imgSrc, setImgSrc] = useState(author.avatarUrl);
  const [isExpanded, setIsExpanded] = useState(false);
  const CHAR_LIMIT = 200;
  const shouldShowReadMore = text && text.length > CHAR_LIMIT;

  useEffect(() => {
    if (isExpanded) setIsPaused(true);
  }, [isExpanded, setIsPaused]);

  return (
    <div className={`
      bg-white p-8 rounded-[2rem] border transition-all duration-500 flex flex-col h-full min-h-[280px]
      
    `}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src={imgSrc}
              alt={author.name}
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="rounded-full bg-gray-50 object-cover ring-4 ring-gray-50"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base leading-tight">{author.name}</h4>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < rating.value ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                />
              ))}
            </div>
          </div>
        </div>
        <Quote className="text-blue-50/50 w-10 h-10 -mt-2" />
      </div>

      <div className="flex-1">
        <p className="text-gray-600 text-[15px] leading-relaxed italic overflow-hidden">
          {isExpanded || !shouldShowReadMore
            ? text
            : `${text.substring(0, CHAR_LIMIT)}...`}
          
          {shouldShowReadMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="ml-2 text-primary font-bold hover:underline focus:outline-none not-italic inline-block"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
      
      <div className=" border-t border-gray-50 flex justify-between items-center">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Google Review</span>
        <div className="w-5 h-5  group-hover:opacity-100 transition-all">
            <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        </div>
      </div>
    </div>
  );
};