"use server";

import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";

export async function getEventsAction() {
  try {
    await connectDB();
    
    // Fetch events and convert them to plain objects
    const events = await Event.find().sort({ date: -1 }).lean();

    return events.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      // Format date for the UI
      date: new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      count: event.images?.length || 0,
      // Map images array to simple string array for your gallery logic
      photos: event.images?.map((img) => img.url) || [],
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}