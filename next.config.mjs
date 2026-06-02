import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // url replacement redirection
      {
        source: "/integrated-diploma-in-graphics-3d",
        destination: "/courses/integrated-diploma-in-graphics-3d",
        permanent: true,
      },
      {
        source: "/graphics-designing",
        destination: "/courses/graphics-designing",
        permanent: true,
      },
      {
        source: "/film-editing",
        destination: "/courses/film-editing",
        permanent: true,
      },
      {
        source: "/media-production",
        destination: "/courses/media-production",
        permanent: true,
      },
      {
        source: "/photography",
        destination: "/courses/photography",
        permanent: true,
      },
      {
        source: "/multimedia",
        destination: "/courses/multimedia",
        permanent: true,
      },
      {
        source: "/graphics-web",
        destination: "/courses/graphics-web",
        permanent: true,
      },
      {
        source: "/ai-filmmaking",
        destination: "/courses/ai-filmmaking",
        permanent: true,
      },
      {
        source: "/diploma-in-content-creation-program",
        destination: "/courses/diploma-in-content-creation-program",
        permanent: true,
      },
      {
        source: "/ui-ux-course",
        destination: "/courses/ui-ux-course",
        permanent: true,
      },
      {
        source: "/interior-design-course",
        destination: "/courses/interior-design-course",
        permanent: true,
      },
      {
        source: "/short-term-courses",
        destination: "/courses/short-term-courses",
        permanent: true,
      },
      {
        source: "/diploma-in-interior-visualization",
        destination: "/courses/diploma-in-interior-visualization",
        permanent: true,
      },
      {
        source: "/integrated-diploma-in-digital-marketing-with-ai-tools",
        destination:
          "/courses/integrated-diploma-in-digital-marketing-with-ai-tools",
        permanent: true,
      },
      {
        source: "/diploma-in-ai-cinematics-virtual-production",
        destination:
          "/courses/diploma-in-ai-cinematics-virtual-production",
        permanent: true,
      },

      // Handle legacy duplication (if these URLs are indexed)
      {
        source: "/integrated-diploma-in-graphics-3d-2",
        destination: "/courses/integrated-diploma-in-graphics-3d",
        permanent: true,
      },
      {
        source: "/diploma-in-multimedia",
        destination: "/courses/multimedia",
        permanent: true,
      },
      // Trailing slash redirection
      {
        source: "/contact-us/",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/faq/",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/courses/",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/gallery/",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/video-gallery/",
        destination: "/video-gallery",
        permanent: true,
      },
      {
        source: "/studentslife/",
        destination: "/studentslife",
        permanent: true,
      },
      {
        source: "/latest-events-new/",
        destination: "/latest-events-new",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "www.pixeltoonzacademy.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
