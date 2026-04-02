"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import { Wand2, Save, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import BlogForm from "@/components/admin/BlogForm";

const formSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().min(10, "Provide a meta description"),
  images: z.array(z.object({ url: z.string(), alt: z.string() })).min(1, "Feature image required"),
  content: z.string().min(20, "Content is required"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export default function AddBlogPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", slug: "", description: "", images: [], content: "", isPublished: false, isFeatured: false },
  });

  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      form.setValue("slug", slugify(title, { lower: true, strict: true }), { shouldValidate: true });
    }
  };

  const onSubmit = (data) => console.log("Final Submission:", data);

  return (
    <div className="min-h-screen">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Blog Post</h1>
            <p className="text-slate-500 mt-1">Compose and publish your latest article.</p>          
        </div>

        <BlogForm onSubmit={onSubmit} />
    </div>
  );
}