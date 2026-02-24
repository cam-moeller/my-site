import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPost } from '@/lib/mdx';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(slug);
  if (!result) return {};
  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPost(slug);

  if (!result) notFound();

  const { frontmatter, content } = result;

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          {frontmatter.title}
        </h1>
        <time className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 block">
          {formatDate(frontmatter.date)}
        </time>
        {frontmatter.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <article className="prose dark:prose-invert max-w-none">{content}</article>
    </main>
  );
}
