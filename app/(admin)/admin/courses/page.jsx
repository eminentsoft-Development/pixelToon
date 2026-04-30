"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Plus,
  Loader2,
  BookOpen,
} from "lucide-react";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import CustomPagination from "@/components/admin/CustomPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const CourseAdminPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/course?page=${currentPage}&limit=10`);
      const data = await res.json();

      setCourses(data.courses || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/course/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Course deleted successfully");
        fetchCourses();
      }
    } catch (error) {
      toast.error("Error deleting course");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" /> All Courses
          </h1>
        </div>
        <Link href="/admin/courses/add">
          <Button className="bg-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" /> New Course
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[80px]">Thumbnail</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                  Loading courses...
                </TableCell>
              </TableRow>
            ) : courses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-40 text-center text-muted-foreground"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow
                  key={course._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell>
                    <Image
                      src={course.images?.[0]?.url || "/placeholder.png"}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                      alt="course thumbnail"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {course.title}
                      </span>
                      <span className="text-xs text-slate-400">
                        Created:{" "}
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.isPublished ? (
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Live
                      </div>
                    ) : (
                      <div className="flex items-center text-slate-400 text-sm font-medium">
                        <XCircle className="w-4 h-4 mr-1.5" /> Draft
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                      {course.isFeatured && (
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/courses/${course._id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              <span className="font-bold text-slate-900">
                                &quot;{course.title}&quot;
                              </span>
                              ? All curriculum data will be lost.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCourse(course._id)}
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

        {!loading && courses.length > 0 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              router.push(`?page=${page}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CourseAdminPage;
