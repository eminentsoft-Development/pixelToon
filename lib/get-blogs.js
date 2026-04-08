
export async function getBlogs(page = 1, limit = 6) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 60 }, // Cache for 1 min, or use 'no-store' for real-time
      },
    );

    if (!res.ok) return { blogs: [], totalPages: 0 };
    return res.json();
  } catch (error) {
    return { courses: [], totalPages: 0 };
  }
}