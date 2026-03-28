import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = 'https://www.pixeltoonzacademy.com';

  try {
    const response = await fetch(
      `${wpUrl}/wp-json/wp/v2/posts?_embed&per_page=100&status=publish`,
      {
        cache: 'no-store',        // Always get fresh data during testing
        next: { revalidate: 0 },  // Disable caching for now
      }
    );

    if (!response.ok) {
      console.error(`WordPress API returned status: ${response.status}`);
      return NextResponse.json(
        { error: `Failed to fetch from WordPress: ${response.status}` },
        { status: response.status }
      );
    }

    const posts = await response.json();

    console.log(`✅ Successfully fetched ${posts.length} posts from WordPress`);

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts: posts,           // Send all posts (you can limit if too many)
    });
  } catch (error) {
    console.error('❌ API Route Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to connect to WordPress', details: error.message },
      { status: 500 }
    );
  }
}