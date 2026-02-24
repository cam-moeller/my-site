import { getAllPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/blog/BlogCard';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No posts yet. Check back soon.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
