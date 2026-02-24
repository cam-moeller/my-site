import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { BlogPost } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = await fs.readFile(path.join(BLOG_DIR, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: (data.tags as string[]) ?? [],
        published: (data.published as boolean) ?? false,
      };
    })
  );

  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(
  slug: string
): Promise<{ frontmatter: BlogPost; content: React.ReactElement } | null> {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filepath, 'utf-8');
    const { frontmatter, content } = await compileMDX<BlogPost>({
      source: raw,
      options: { parseFrontmatter: true },
    });
    return { frontmatter: { ...frontmatter, slug }, content };
  } catch {
    return null;
  }
}
