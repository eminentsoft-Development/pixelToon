import Footer from "@/components/site/footer";
import Navbar from "@/components/site/header";

export async function getCourses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/menu-courses`,
    {
      next: { revalidate: 3600 }, // Cache for 1 min, or use 'no-store' for real-time
    },
  );

  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function SiteLayout({ children }) {
  const courses = await getCourses();
  return (
    <div>
      <Navbar courses={courses} />
      <main >{children}</main>
      <Footer />
    </div>
  );
}