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