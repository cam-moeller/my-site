import Link from 'next/link';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="py-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
      <Link href={`/blog/${post.slug}`} className="group block">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
          {post.title}
        </h2>
      </Link>
      <time className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 block">
        {formatDate(post.date)}
      </time>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{post.description}</p>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
