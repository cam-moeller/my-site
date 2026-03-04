import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPhotodumps, getPhotodump } from '@/lib/photodumps';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const photodumps = await getAllPhotodumps();
  return photodumps.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPhotodump(slug);
  if (!result) return {};
  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

export default async function PhotodumpPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPhotodump(slug);
  if (!result) notFound();

  const { frontmatter, content } = result;

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        {frontmatter.title}
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{frontmatter.date}</p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-8">{frontmatter.description}</p>
      <div className="prose dark:prose-invert max-w-none mb-8">{content}</div>
      {frontmatter.images.length > 0 && (
        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {frontmatter.images.map((filename) => (
            <div key={filename} className="break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/photography/${filename}`}
                alt=""
                className="w-full rounded-sm"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
