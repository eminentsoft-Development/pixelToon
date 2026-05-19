import { fetchGalleryItems } from "@/app/action/gallery";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SimpleGalleryClient from "@/components/site/StudentEventClient";

export async function generateMetadata() {
  return {
    title: "Latest Events - Pixeltoonz Academy",
    description:
      "Our latest events and vibrant energy across a range of exciting themes.",
    alternates: {
      canonical: "https://pixeltoonzacademy.com/gallery/students-life-events",
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
      <Breadcrumbs />
      <main className="container py-14">
        <SimpleGalleryClient images={items} />
      </main>
    </div>
  );
}
