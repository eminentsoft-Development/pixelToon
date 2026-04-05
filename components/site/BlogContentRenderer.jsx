"use client";
import DOMPurify from "dompurify";

export default function BlogContentRenderer({ content }) {
  const cleanHtml = typeof window !== "undefined" ? DOMPurify.sanitize(content) : content;

  return (
    <div
  className="prose prose-slate lg:prose-lg max-w-none 
             prose-headings:font-serif prose-headings:italic 
             prose-headings:text-[#131313] 
             prose-p:font-sans-dm prose-p:font-light 
             /* Custom Gaping */
             prose-p:my-5 
             prose-headings:mt-12 prose-headings:mb-4
             prose-a:text-primary"
  dangerouslySetInnerHTML={{ __html: cleanHtml }}
/>
  );
}