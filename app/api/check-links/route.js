import { NextResponse } from "next/server";
import Blog from "@/models/Blog"; 
import * as cheerio from "cheerio";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).select("title slug content").lean();
    const report = [];

    blogs.forEach((blog) => {
      const $ = cheerio.load(blog.content || "");
      const internalLinks = [];

      $("a").each((_, element) => {
        const href = $(element).attr("href");
        if (href) {
          const isRelative = href.startsWith("/");
          const isAbsoluteInternal = href.includes("pixeltoonzacademy.com");

          if (isRelative || isAbsoluteInternal) {
            internalLinks.push(href);
          }
        }
      });

      if (internalLinks.length > 0) {
        report.push({
        //   blogTitle: blog.title,
        //   blogSlug: `/blog/${blog.slug}`,
        //   totalInternalLinks: internalLinks.length,
          links: internalLinks,
        });
      }
    });

    return NextResponse.json({ success: true, count: report.length, data: report });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}