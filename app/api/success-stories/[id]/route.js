import { NextResponse } from "next/server";
import SuccessStory from "@/models/SuccessStory";
import { UTApi } from "uploadthing/server";
import connectDB from "@/lib/mongodb";

const utapi = new UTApi();

// GET a single story
export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  try {
    const story = await SuccessStory.findById(id);
    if (!story)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: story });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// UPDATE a story (e.g., updating Alt Text)
export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const body = await req.json();
    const updatedStory = await SuccessStory.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );
    return NextResponse.json({ success: true, data: updatedStory });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// DELETE a story + Remove from UploadThing
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const story = await SuccessStory.findById(id);
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }
    const fileKey = story.imageUrl.split("/").pop();

    // 2. Delete from UploadThing Server
    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }

    // 3. Delete from MongoDB
    await SuccessStory.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
