"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext, 
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard"; // Ensure the path matches your structure

const carouselOpts = {
  align: "start",
  loop: true,
};

export default function BlogCarousel({ blogs = [] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={carouselOpts}
    >
      <CarouselContent className="-ml-8">
        {blogs.map((blog) => (
          <CarouselItem
            key={blog.slug ?? blog._id}
            className="pl-8 basis-full md:basis-1/2 lg:basis-1/3"
          >
            <div className="h-full">
              <BlogCard {...blog} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="hidden lg:flex items-center justify-end mt-10 gap-3">
        <CarouselPrevious className="static translate-y-0 w-11 h-11 border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all" />
        <CarouselNext className="static translate-y-0 w-11 h-11 border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all" />
      </div>
    </Carousel>
  );
}