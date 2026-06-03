import { fetchGalleryItems } from "@/app/action/gallery";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SimpleGalleryClient from "@/components/site/StudentEventClient";

export async function generateMetadata() {
  return {
    title: "Student - Pixeltoonz",
    description:
      "OUR PROJECT DISCOVER OUR MOVIES 9.5 RATING 120 MIN Pixeltoonz Gallery Welcome to the Pixeltoonz Academy Events &amp; Student Life gallery! Here, we showcase the vibrant atmosphere that defines our creative community.",
    alternates: {
      canonical: "https://www.pixeltoonzacademy.com/studentslife",
    },
  };
}

export default async function EventsPage() {
  const items = await fetchGalleryItems({
    category: "students-life",
    skip: 0,
    limit: 30,
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Breadcrumbs
        items={[{ label: "Student Life" }]}
      />
      <main className="container py-14">
        <SimpleGalleryClient images={items} />
      </main>
    </div>
  );
}
