export const dynamic = "force-dynamic";

import { fetchVideoGallery } from "@/app/action/video";
import VideoGalleryClient from "@/components/site/VideoGalleryClient";

export const metadata = {
  title: "Video Gallery - Pixeltoonz",
  description:
    "Watch the latest VFX, animation, and film editing showreels created by Pixeltoonz students.",
  alternates: {
    canonical: "https://www.pixeltoonzacademy.com/video-gallery",
  },
};

export default async function VideoGalleryPage() {
  const videos = await fetchVideoGallery({ skip: 0, limit: 30 });

  return (
    <div className="min-h-screen text-textColor bg-neutral-50">
      <VideoGalleryClient videos={videos} />
    </div>
  );
}
