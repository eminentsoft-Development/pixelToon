"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import { Wand2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";

const formSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().min(10, "Provide a meta description"),
  images: z.array(z.object({ url: z.string(), alt: z.string() })).min(1, "Feature image required"),
  content: z.string().min(20, "Content is required"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export default function BlogForm({ initialData, onSubmit, loading }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      images: [],
      content: "",
      isPublished: false,
      isFeatured: false,
    },
  });

  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      form.setValue("slug", slugify(title, { lower: true, strict: true }), { 
        shouldValidate: true 
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Content */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardContent className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="The Future of Web Design..." className="text-lg h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-slate-700 font-semibold">URL Slug</FormLabel>
                      <FormControl>
                        <Input className={"h-10"} placeholder="the-future-of-web-design" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" variant="secondary" onClick={generateSlug} className="gap-2 bg-bgColor h-10 text-white">
                  <Wand2 size={16} /> Generate
                </Button>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">Meta Description</FormLabel>
                    <FormControl>
                      <Input className={"h-10"} placeholder="A brief summary for SEO..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">Article Body</FormLabel>
                    <FormControl>
                      <RichTextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-6 space-y-6">
            
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <ImageUpload value={field.value} onChange={field.onChange} multiple={false} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-bold text-slate-800">Publishing Settings</h3>
                <Separator />
                
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium text-slate-700">Published Status</FormLabel>
                        <FormDescription className="text-[11px]">Visible to everyone</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium text-slate-700">Featured Post</FormLabel>
                        <FormDescription className="text-[11px]">Pin to home page</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  disabled={loading} 
                  type="submit" 
                  className="w-full gap-2 bg-bgColor hover:bg-bgColor/90 h-11 text-white"
                >
                  <Save size={18} /> {initialData ? "Update Article" : "Save Article"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}