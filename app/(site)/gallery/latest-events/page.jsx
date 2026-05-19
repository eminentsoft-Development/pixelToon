import { getEventsAction } from "@/app/action/event.actions";
import EventsAlbum from "@/components/site/EventListing";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Latest Events New - Pixeltoonz",
    description: "Our latest events have been filled with creativity, learning, and vibrant energy across a range of exciting themes.",
    alternates: {
      canonical: "https://pixeltoonzacademy.com/gallery/latest-events",
    }
  }
}

export default function EventsPage() {
  const eventsPromise = getEventsAction();

  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Gallery...</div>}>
      <EventsAlbum eventsPromise={eventsPromise} />
    </Suspense>
  );
}