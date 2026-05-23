import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://www.pixeltoonzacademy.com";

  try {
   
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
    ];
  }
}
