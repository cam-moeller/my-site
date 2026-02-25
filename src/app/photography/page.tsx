import fs from 'fs/promises';
import path from 'path';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const PHOTOS_DIR = path.join(process.cwd(), 'public/images/photography');

export default async function PhotographyPage() {
  let images: string[] = [];
  try {
    const files = await fs.readdir(PHOTOS_DIR);
    images = files.filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()));
  } catch {
    // directory doesn't exist yet — show empty state
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Photography</h1>
      {images.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No photos yet. Check back soon.</p>
      ) : (
        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {images.map((filename) => (
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
