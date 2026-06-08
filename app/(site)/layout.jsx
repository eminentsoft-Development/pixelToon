import { Suspense } from "react";
import Navbar from "@/components/site/header";
import { getCourses } from "@/lib/get-courses";
import { Toaster } from "sonner";
import ScrollUp from "@/components/Common/ScrollUp";
import Footer from "@/components/site/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata = {
  verification: {
    google: "IVs7EPV4G4TAjB1JWb_LvzQB1IGhJZ2S4UB0XmPzk4Y",
  },
};

export default async function SiteLayout({ children }) {
  const courses = await getCourses();
  return (
    <>
      {/* 2. Add Facebook Pixel using next/script */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1430508572456108'); 
          fbq('track', 'PageView');
        `}
      </Script>

      {/* 3. Add the noscript fallback image */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1430508572456108&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <ScrollUp />
      <Suspense fallback={<div className="h-16" />}>
        {" "}
        {/* skeleton height */}
        <Navbar courses={courses} />
      </Suspense>
      <main>{children}</main>
      <Footer courses={courses} />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ duration: 5000 }}
      />
      {/* 2. Add Google Analytics here */}
      <GoogleAnalytics gaId="G-EF6RNWLDEK" />
    </>
  );
}
