export async function getCourses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/menu-courses`);
    if (!res.ok) return []; 
    const data = await res.json();
    return Array.isArray(data) ? data : []; // Force array type
  } catch (e) {
    console.error("Build fetch failed, using empty array");
    return []; 
  }
}


export async function getFullCourses(page = 1, limit = 9) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/course?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return { courses: [], totalPages: 0 };
    return res.json();
  } catch (error) {
    console.error("Courses build fetch failed:", error.message);
    // Return empty state so the build can finish
    return { courses: [], totalPages: 0 };
  }
}

