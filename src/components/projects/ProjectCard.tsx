import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="py-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/projects/${project.slug}`} className="group block">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {project.title}
          </h2>
        </Link>
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <Github size={18} />
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live site"
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      <time className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 block">
        {formatDate(project.date)}
      </time>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{project.description}</p>
      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
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
