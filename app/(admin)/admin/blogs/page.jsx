"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Plus,
  Loader2,
  Search,
  Filter
} from "lucide-react";

import CustomPagination from "@/components/admin/CustomPagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BlogAdminPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  // Data States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 1. Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build dynamic query parameters
      const query = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      }).toString();

      const res = await fetch(`/api/blogs?${query}`);
      const data = await res.json();

      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting blog");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">All Blogs</h1>
        </div>
        <Link href="/admin/blogs/add">
          <Button className="bg-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" /> New Blog
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-md border shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Shadcn Status Dropdown */}
        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full pl-9 bg-white border-slate-200">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title & Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Meta Title</TableHead>
              <TableHead className="text-right text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                  Loading your posts...
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                   {searchTerm || statusFilter !== "all" 
                     ? "No blogs match your filters." 
                     : "No blogs found."}
                 </TableCell>
               </TableRow>
             ) : (
              blogs.map((blog) => (
                <TableRow key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <Image
                      src={blog.images?.[0]?.url || "/placeholder.png"}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                      alt="blog image"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{blog.title}</span>
                      <span className="text-xs text-slate-500 font-mono italic">/{blog.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {blog.isPublished ? (
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Published
                      </div>
                    ) : (
                      <div className="flex items-center text-slate-400 text-sm font-medium">
                        <XCircle className="w-4 h-4 mr-1.5" /> Draft
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm max-w-[200px] truncate">
                    {blog.metaTitle || "---"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/blogs/${blog._id}`}>
                        <Button variant="ghost" size="icon" className="text-blue-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-rose-600 hover:bg-rose-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete <span className="font-bold text-slate-900">&quot;{blog.title}&quot;</span>? This action is permanent.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBlog(blog._id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Smart Pagination */}
        {!loading && blogs.length > 0 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              router.push(`?page=${page}`, { scroll: false });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BlogAdminPage;