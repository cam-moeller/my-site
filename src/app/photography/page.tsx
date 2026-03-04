import Link from 'next/link';
import { getAllPhotodumps } from '@/lib/photodumps';

export default async function PhotographyPage() {
  const photodumps = await getAllPhotodumps();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Photography</h1>
      {photodumps.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No photos yet. Check back soon.</p>
      ) : (
        <ul className="space-y-8">
          {photodumps.map((dump) => (
            <li key={dump.slug}>
              <Link
                href={`/photography/${dump.slug}`}
                className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                {dump.title}
              </Link>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{dump.date}</p>
              <p className="text-neutral-700 dark:text-neutral-300 mt-1">{dump.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
