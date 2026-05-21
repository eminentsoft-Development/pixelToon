import GalleryClient from "@/components/site/GalleryClient";

export async function generateMetadata() {
  return {
    title: "Gallery - Pixeltoonz",
    description: "",
    alternates: {
      canonical: "https://pixeltoonzacademy.com/gallery/students-work",
    }
  }
}

export default function GalleryPage() {
  return (
    <main>
      <GalleryClient />
    </main>
  );
}