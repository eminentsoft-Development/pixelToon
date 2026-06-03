import { Suspense } from "react";
import Navbar from "@/components/site/header";
import { getCourses } from "@/lib/get-courses";
import { Toaster } from "sonner";
import ScrollUp from "@/components/Common/ScrollUp";
import Footer from "@/components/site/footer";
import { GoogleAnalytics } from '@next/third-parties/google'; 

export const metadata = {
  verification: {
    google: 'IVs7EPV4G4TAjB1JWb_LvzQB1IGhJZ2S4UB0XmPzk4Y',
  },
};

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
      {/* 2. Add Google Analytics here */}
      <GoogleAnalytics gaId="G-EF6RNWLDEK" />
    </div>
  );
}