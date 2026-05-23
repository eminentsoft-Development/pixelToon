import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Core Course Redirects (Moving from Root to /courses/)
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
