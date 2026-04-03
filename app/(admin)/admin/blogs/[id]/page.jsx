"use client";

import React, { useEffect, useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EditBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [fetching, setFetching] = useState(true);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`);
        if (!response.ok) throw new Error("Blogs not found");

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        toast.error("Could not load blog details");
        router.push("/admin/blogs");
      } finally {
        setFetching(false);
      }
    };

    if (params.id) fetchBlog();
  }, [params.id, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update Blog");

      toast.success("Blogs updated successfully!");
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      toast.error("Error updating Blog");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
        <p className="text-slate-500 text-sm animate-pulse">
          Loading blog data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Create Blog Post
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Compose and publish your latest article.
        </p>
      </div>

      <BlogForm
        onSubmit={onSubmit}
        loading={loading}
        initialData={initialData}
      />
    </div>
  );
};

export default EditBlogPage;
