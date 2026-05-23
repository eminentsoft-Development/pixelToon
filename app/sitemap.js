import Blog from "@/models/Blog";   
import Course from "@/models/Course"; 
import connectDB from "@/lib/mongodb";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://www.pixeltoonzacademy.com";

  try {
    await connectDB();

    const [blogs, courses] = await Promise.all([
      Blog.find({ isPublished: true }).select("slug updatedAt").lean().exec(),
      Course.find({ isPublished: true }).select("slug updatedAt").lean().exec(),
    ]);

    const courseUrls = courses.map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: course.updatedAt ? new Date(course.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9, 
    }));

    const blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // 5. Define Static URLs
    const staticUrls = [
      "",
      "/about-us",
      "/courses",
      "/contact-us",
      "/blog",
      "/franchise-supports",
      "/gallery",
      "/latest-events-new",
      "/studentslife",
      "/success-stories",
      "/video-gallery",
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: route === "" ? 1.0 : 0.8,
    }));

    // Combine and Return all URLs
    return [...staticUrls, ...courseUrls, ...blogUrls];

  } catch (error) {
    console.error("Sitemap generation error:", error);
    
    // Fallback: If the DB connection fails, at least return the root URL
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 1.0,
      },
    ];
  }
}