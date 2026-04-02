import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";

const utapi = new UTApi();

export async function POST(req) {
  try {
    const { url } = await req.json();

    const key = url.split("/").pop();

    if (!key) {
      return NextResponse.json({ error: "Invalid file key" }, { status: 400 });
    }

    await utapi.deleteFiles(key);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}