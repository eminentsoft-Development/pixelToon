import { getEventsAction } from "@/app/action/event.actions";
import EventsAlbum from "@/components/site/EventListing";
import { Suspense } from "react";

export default function EventsPage() {
  const eventsPromise = getEventsAction();

  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Gallery...</div>}>
      <EventsAlbum eventsPromise={eventsPromise} />
    </Suspense>
  );
}