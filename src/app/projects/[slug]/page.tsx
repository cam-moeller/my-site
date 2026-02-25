import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Github, ExternalLink } from 'lucide-react';
import { getAllProjects, getProject } from '@/lib/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProject(slug);
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const result = await getProject(slug);

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
        {(frontmatter.github || frontmatter.url) && (
          <div className="mt-4 flex items-center gap-4">
            {frontmatter.github && (
              <a
                href={frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
            )}
            {frontmatter.url && (
              <a
                href={frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <ExternalLink size={16} />
                Live Site
              </a>
            )}
          </div>
        )}
      </header>
      <article className="prose dark:prose-invert max-w-none">{content}</article>
    </main>
  );
}
