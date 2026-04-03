"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import { Wand2, Save, Search, Star, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().min(10, "Description is required for SEO"),
  metaTitle: z.string().min(10, "Meta Title is required"),
  metaDescription: z.string().min(10, "Meta Description is required"),
  metaKeywords: z.string().optional(),
  canonicalUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  images: z
    .array(z.object({ url: z.string(), alt: z.string() }))
    .min(1, "At least one image is required"),
  content: z.string().min(20, "Content is too short"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export default function BlogForm({ initialData, onSubmit, loading }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    // values: initialData is better for Edit forms to sync data
    values: initialData || {
      title: "",
      slug: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      canonicalUrl: "https://pixeltoonzacademy.com/blogs/",
      images: [],
      content: "",
      isPublished: false,
      isFeatured: false,
    },
  });

  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = slugify(title, { lower: true, strict: true });
      form.setValue("slug", slug, { shouldValidate: true });
      form.setValue(
        "canonicalUrl",
        `https://pixeltoonzacademy.com/blogs/${slug}`,
        { shouldValidate: true },
      );
    }
  };

  const onInvalid = (errs) => console.error("Validation failed:", errs);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10"
      >
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Post Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The Future of Web Design..."
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium" />
                  </FormItem>
                )}
              />

              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">
                        URL Slug <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 font-mono text-sm"
                          placeholder="url-slug-here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={generateSlug}
                  className="gap-2 h-10 bg-bgColor text-white"
                >
                  <Wand2 size={16} /> Generate
                </Button>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Short Summary <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe what students will gain..."
                        rows={3}
                        className={"text-sm resize-none"}
                        {...field}
                      />
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
                    <FormLabel className="font-semibold">
                      Article Body <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SEO MANAGEMENT */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Search size={20} className="text-blue-500" /> Seo Management
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Meta Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Meta Description
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Keywords (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="tag1, tag2" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="canonicalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Canonical URL
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-6 space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    multiple={false}
                  />
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  Publishing Status
                </h3>
                <Separator />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium text-slate-700">
                          Published
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium text-slate-700 flex items-center gap-1">
                          Featured{" "}
                          <Star
                            size={14}
                            className="text-amber-500 fill-amber-500"
                          />
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full gap-2 bg-slate-900 hover:bg-slate-800 h-11 text-white shadow-lg"
                >
                  <Save size={18} />{" "}
                  {initialData ? "Update Article" : "Save Article"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
