import { Suspense } from "react";
import Navbar from "@/components/site/header";
import { getCourses } from "@/lib/get-courses";
import { Toaster } from "sonner";
import ScrollUp from "@/components/Common/ScrollUp";
import Footer from "@/components/site/footer";

export default async function SiteLayout({ children }) {
  const courses = await getCourses();
  return (
    <div>
      <ScrollUp />
      <Suspense fallback={<div className="h-16" />}>  {/* skeleton height */}
        <Navbar courses={courses} />
      </Suspense>
      <main>{children}</main>
      <Footer courses={courses}/>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ duration: 5000 }}
      />
    </div>
  );
}