This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Blog — How It Works

### Architecture Overview

```
src/content/blog/*.mdx        ← your post files (source of truth)
         ↓
src/lib/mdx.ts                ← reads and parses MDX files
         ↓
src/app/blog/page.tsx         ← /blog  (post list)
src/app/blog/[slug]/page.tsx  ← /blog/my-post  (individual post)
src/components/blog/BlogCard.tsx ← card used in the list
```

The site is **fully static** — there's no database. Posts are just MDX files on disk. At build time, Next.js reads every `.mdx` file, renders the pages, and deploys them as static HTML.

---

### Two key functions (`src/lib/mdx.ts`)

**`getAllPosts()`** — used by the blog index page
- Reads every `.mdx` file in `src/content/blog/`
- Parses only the frontmatter (fast, no MDX compilation)
- Filters out posts where `published: false`
- Returns posts sorted newest-first

**`getPost(slug)`** — used by the individual post page
- Reads the single `.mdx` file matching the slug
- Compiles the full MDX (frontmatter + rendered React content)
- Returns `null` if the file doesn't exist (triggers a 404)

---

### Creating a New Post

1. Create a file in `src/content/blog/` named `your-post-slug.mdx`
   - The filename becomes the URL: `/blog/your-post-slug`

2. Add the frontmatter at the top:

```yaml
---
title: "Your Post Title"
date: "2026-02-25"
description: "A short summary shown in the post list and page metadata."
tags: ["tag1", "tag2"]
published: true
---
```

3. Write your content below the frontmatter using Markdown:

```md
## Introduction

Your content here. Standard Markdown works — headings, **bold**, _italic_,
`inline code`, code blocks, links, lists, etc.
```

4. Push to main → Vercel auto-deploys and the post appears live.

---

### Keeping a Post Hidden (Draft)

Set `published: false` in the frontmatter. `getAllPosts()` filters these out, so the post won't appear in the list and `generateStaticParams` won't build a page for it. The file can sit in the repo safely until you're ready.

---

### Frontmatter Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Displayed as the `<h1>` on the post page |
| `date` | `"YYYY-MM-DD"` | yes | Used for sorting and display |
| `description` | string | yes | Shown in the card and `<meta>` description |
| `tags` | string[] | yes | Rendered as pills; use `[]` for none |
| `published` | boolean | yes | Set to `false` to hide the post |
