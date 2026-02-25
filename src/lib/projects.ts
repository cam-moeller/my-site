import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Project } from '@/types';

const PROJECTS_DIR = path.join(process.cwd(), 'src/content/projects');

export async function getAllProjects(): Promise<Project[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  const projects = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = await fs.readFile(path.join(PROJECTS_DIR, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: (data.tags as string[]) ?? [],
        github: data.github as string | undefined,
        url: data.url as string | undefined,
        featured: (data.featured as boolean) ?? false,
      };
    })
  );

  return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getProject(
  slug: string
): Promise<{ frontmatter: Project; content: React.ReactElement } | null> {
  const filepath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filepath, 'utf-8');
    const { frontmatter, content } = await compileMDX<Project>({
      source: raw,
      options: { parseFrontmatter: true },
    });
    return { frontmatter: { ...frontmatter, slug }, content };
  } catch {
    return null;
  }
}
