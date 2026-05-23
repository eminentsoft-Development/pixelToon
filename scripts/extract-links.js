import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog"; // Adjust path as needed
import * as cheerio from "cheerio";

export async function getInternalBlogLinks() {
  await connectDB();

  // Fetch only the necessary fields to keep the operation fast
  const blogs = await Blog.find({}).select("title slug content").lean();

  const report = [];

  blogs.forEach((blog) => {
    // Load the HTML content into Cheerio
    const $ = cheerio.load(blog.content || "");
    const internalLinks = [];

    // Find all anchor <a> tags
    $("a").each((_, element) => {
      const href = $(element).attr("href");

      if (href) {
        // Check if the link is internal (relative path OR includes the live domain)
        const isRelative = href.startsWith("/");
        const isAbsoluteInternal = href.includes("pixeltoonzacademy.com");

        if (isRelative || isAbsoluteInternal) {
          internalLinks.push(href);
        }
      }
    });

    // Only add to the report if the blog actually has internal links
    if (internalLinks.length > 0) {
      report.push({
        blogTitle: blog.title,
        blogSlug: `/blog/${blog.slug}`,
        totalInternalLinks: internalLinks.length,
        links: internalLinks,
      });
    }
  });

  return report;
}