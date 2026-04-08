import Footer from "@/components/site/footer";
import Navbar from "@/components/site/header";
import { getCourses } from "@/lib/get-courses";



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