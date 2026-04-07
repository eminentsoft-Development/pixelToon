import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Blog from "@/models/Blog";
import Image from "next/image";
import ContentRenderer from "@/components/site/ContentRenderer";



export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const post = await Blog.findOne({ slug }).lean();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    alternates: {
      canonical: post.canonicalUrl || `https://www.pixeltoonzacademy.com/blog/${slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      images: [
        {
          url: post.images?.[0]?.url || "/default-blog-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function SingleBlogPost({ params }) {
  const { slug } = await params;

  await connectDB();

  const post = await Blog.findOne({ slug }).lean();

  if (!post) {
    notFound();
  }

  return (
   
    <div className="min-h-screen text-black">
      <Breadcrumbs />
      <div className="container py-10">
        <div className="page-layout px-6">
          <main className="main-col">

            <section className="relative w-full aspect-video overflow-hidden rounded-xl border border-gray-300">
              <Image 
                src={post.images?.[0]?.url || "/default-blog-image.jpg"} 
                alt={post.images?.[0]?.alt || post.title}
                fill
                priority // Tells Next.js to load this immediately
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
            </section>

            {/* HERO SECTION */}
            <section className="relative pt-8 pb-8 border-b border-[#2a2a35] mb-16">
              <h1 className="text-4xl font-bold w-[95%] italic leading-[1.1] text-primary mb-6 tracking-wide">
                {post.title}
              </h1>
            </section>
            
            <section className="mb-[72px]">
               <ContentRenderer content={post.content} />
            </section>
            <div className="mobile-form mb-16">
              <EnquiryForm />
            </div>
          </main>

          <aside className="sidebar-col">
            <EnquiryForm />
          </aside>
        </div>
      </div>
    </div>
  );
}
