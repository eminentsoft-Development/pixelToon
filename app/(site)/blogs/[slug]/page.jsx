import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function SingleBlogPost({ params }) {
  const { slug } = await params;

  await connectDB();

  const post = await Post.findOne({ slug }).lean();

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mt-24 mx-auto px-6 py-12 prose prose-lg">
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />

      <div className="flex gap-4 text-sm text-gray-600 mb-8">
        <span>By {post.author}</span>
        <span>{new Date(post.date).toLocaleDateString('en-IN')}</span>
      </div>

      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full rounded-xl mb-10" />
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}