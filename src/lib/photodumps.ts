import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Photodump } from '@/types';

const PHOTODUMPS_DIR = path.join(process.cwd(), 'src/content/photodumps');

export async function getAllPhotodumps(): Promise<Photodump[]> {
  let files: string[];
  try {
    files = await fs.readdir(PHOTODUMPS_DIR);
  } catch {
    return [];
  }
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  const photodumps = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = await fs.readFile(path.join(PHOTODUMPS_DIR, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        images: (data.images as string[]) ?? [],
        published: (data.published as boolean) ?? false,
      };
    })
  );

  return photodumps
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPhotodump(
  slug: string
): Promise<{ frontmatter: Photodump; content: React.ReactElement } | null> {
  const filepath = path.join(PHOTODUMPS_DIR, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filepath, 'utf-8');
    const { frontmatter, content } = await compileMDX<Photodump>({
      source: raw,
      options: { parseFrontmatter: true },
    });
    return { frontmatter: { ...frontmatter, slug }, content };
  } catch {
    return null;
  }
}
