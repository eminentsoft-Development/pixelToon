export async function GET() {
  try {
    const res = await fetch("https://www.pixeltoonzacademy.com/gallery/");
    const html = await res.text();

    // extract image URLs safely
    const regex = /<img[^>]+src="([^"]+)"/g;
    const matches = [...html.matchAll(regex)];

    const images = matches
      .map((m, i) => m[1])
      .filter((src) => src.includes("uploads")) // filter real images
      .map((src, i) => ({
        id: i,
        src,
        thumb: src,
        title: "Gallery Image",
        category: "Gallery",
        aspect: "square",
      }));

    return Response.json(images);
  } catch (err) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}