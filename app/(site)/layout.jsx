import { Suspense } from "react";
import Footer from "@/components/site/footer";
import Navbar from "@/components/site/header";
import { getCourses } from "@/lib/get-courses";
import { Toaster } from "sonner";

export default async function SiteLayout({ children }) {
  const courses = await getCourses();
  return (
    <div>
      <Suspense fallback={<div className="h-16" />}>  {/* skeleton height */}
        <Navbar courses={courses} />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ duration: 5000 }}
      />
    </div>
  );
}