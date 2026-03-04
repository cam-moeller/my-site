import { getAllPosts } from '@/lib/mdx';
import { getAllProjects } from '@/lib/projects';
import { getAllPhotodumps } from '@/lib/photodumps';
import { generateRssFeed, type FeedItem } from '@/lib/rss';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000';

  const [posts, projects, photodumps] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
    getAllPhotodumps(),
  ]);

  const feedItems: FeedItem[] = [
    ...posts.map((post) => ({
      title: post.title,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.description,
      pubDate: post.date,
      categories: post.tags,
      guid: `${siteUrl}/blog/${post.slug}`,
    })),
    ...projects.map((project) => ({
      title: project.title,
      link: `${siteUrl}/projects/${project.slug}`,
      description: project.description,
      pubDate: project.date,
      categories: project.tags,
      guid: `${siteUrl}/projects/${project.slug}`,
    })),
    ...photodumps.map((photodump) => ({
      title: photodump.title,
      link: `${siteUrl}/photography/${photodump.slug}`,
      description: photodump.description,
      pubDate: photodump.date,
      categories: ['photography'],
      guid: `${siteUrl}/photography/${photodump.slug}`,
    })),
  ];

  const xml = generateRssFeed(feedItems, siteUrl);

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
