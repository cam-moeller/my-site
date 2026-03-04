# Personal Website — Claude Code Context

## Project Overview
Personal portfolio site built with Next.js 16, TypeScript, and Tailwind CSS v4.
Deployed on Vercel. Content is MDX files stored in /src/content.

## Tech Stack
- Framework: Next.js 16.1.6 (App Router)
- Language: TypeScript (strict mode)
- Runtime: React 19.2.3 with React Compiler enabled
- Styling: Tailwind CSS 4 + @tailwindcss/postcss 4 + @tailwindcss/typography 0.5.19
- Content: MDX via next-mdx-remote 6.0.0 + gray-matter 4.0.3
- Icons: lucide-react 0.575.0
- Deployment: Vercel

## Project Structure
```
my-site/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout (Nav, Footer, Geist fonts)
│   │   ├── page.tsx          # Home page (bio + GitHub/LinkedIn/Email links)
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog index (lists all published posts)
│   │   │   └── [slug]/page.tsx   # Individual post (MDX + generateStaticParams)
│   │   ├── projects/
│   │   │   ├── page.tsx      # Projects index (lists all projects)
│   │   │   └── [slug]/page.tsx   # Individual project (MDX + generateStaticParams)
│   │   ├── photography/
│   │   │   ├── page.tsx      # Photography index (lists photodumps)
│   │   │   └── [slug]/page.tsx   # Individual photodump (MDX + image grid)
│   │   └── feed.xml/
│   │       └── route.ts      # RSS 2.0 feed (all posts, projects, photodumps)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx       # Sticky nav with links + ThemeToggle
│   │   │   └── Footer.tsx    # Simple copyright footer
│   │   ├── ui/
│   │   │   └── ThemeToggle.tsx  # "use client" — toggles dark class + localStorage
│   │   └── blog/
│   │       └── BlogCard.tsx  # Post preview card (title link, date, description, tags)
│   ├── content/
│   │   ├── blog/
│   │   │   └── hello-world.mdx  # Sample post
│   │   ├── projects/
│   │   │   ├── personal-site.mdx
│   │   │   └── sample-project.mdx
│   │   └── photodumps/
│   │       └── sample-photodump.mdx
│   ├── lib/
│   │   ├── mdx.ts            # getAllPosts() + getPost(slug) utilities
│   │   ├── projects.ts       # getAllProjects() + getProject(slug) utilities
│   │   ├── photodumps.ts     # getAllPhotodumps() + getPhotodump(slug) utilities
│   │   └── rss.ts            # generateRssFeed(items, siteUrl) → RSS 2.0 XML string
│   └── types/
│       └── index.ts          # BlogPost, Project, and Photodump interfaces
├── public/
│   └── images/
└── [config files: tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs]
```

## Conventions
- Use server components by default; only add `"use client"` when interactivity requires it
- All components use TypeScript with explicit prop types defined in the component file
- Tailwind for all styling — no CSS modules or inline styles
- Prefer named exports for components (exception: Next.js page/layout defaults)
- Blog posts and projects are MDX files with frontmatter (see schema below)
- Page content width: `max-w-2xl mx-auto px-4` (blog/post pages); Nav uses `max-w-3xl`

## Dark Mode Implementation
- Tailwind custom variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Toggled by adding/removing the `dark` class on `document.documentElement`
- `ThemeToggle` (client component) persists preference to `localStorage` under key `"theme"`
- No system-preference detection yet — manual toggle only

## MDX Implementation
- `getAllPosts()`: reads `src/content/blog/`, parses frontmatter only with `gray-matter`, filters `published: true`, sorts by date descending
- `getPost(slug)`: reads `src/content/blog/{slug}.mdx`, compiles with `compileMDX` from `next-mdx-remote/rsc` (`parseFrontmatter: true`), returns `{ frontmatter, content }`
- Post pages use `prose dark:prose-invert max-w-none` for typography styles
- No remark/rehype plugins in v1

## MDX Frontmatter Schema

### Blog posts (/content/blog/*.mdx)
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Short description for previews and SEO"
tags: ["tag1", "tag2"]
published: true
---
```

### Projects (/content/projects/*.mdx)
```yaml
---
title: "Project Name"
description: "Short description"
tags: ["typescript", "aws"]
github: "https://github.com/..."   # optional
url: "https://..."                  # optional
date: "YYYY-MM-DD"
featured: true
---
```

### Photodumps (/content/photodumps/*.mdx)
```yaml
---
title: "Photodump Title"
date: "YYYY-MM-DD"
description: "Short description for previews and RSS"
images: ["filename1.jpg", "filename2.jpg"]   # filenames in /public/images/photography/
published: true
---
```

## Current Status
- [x] Phase 1: Foundation — **Complete**
  - [x] Next.js 16 + React 19 + React Compiler setup
  - [x] Root layout with Nav and Footer
  - [x] Home page (bio, social icon links)
  - [x] Global styles (Tailwind v4, typography plugin, dark mode custom variant)
  - [x] Dark mode toggle (ThemeToggle, localStorage persistence)
- [x] Phase 2: Blog — **Complete**
  - [x] MDX parsing utilities (src/lib/mdx.ts)
  - [x] Blog index page (src/app/blog/page.tsx)
  - [x] Individual post page with generateStaticParams + generateMetadata
  - [x] BlogCard component
  - [x] Sample post (hello-world.mdx)
- [x] Phase 3: Projects page — **Complete**
  - [x] src/content/projects/ with sample .mdx files
  - [x] src/lib/projects.ts with getAllProjects() + getProject(slug)
  - [x] src/app/projects/page.tsx (index) + src/app/projects/[slug]/page.tsx
- [x] Phase 4: Photography gallery — **Complete**
  - [x] src/content/photodumps/ MDX content type with frontmatter (title, date, description, images, published)
  - [x] src/lib/photodumps.ts with getAllPhotodumps() + getPhotodump(slug)
  - [x] src/app/photography/page.tsx (lists photodumps, empty state)
  - [x] src/app/photography/[slug]/page.tsx (individual photodump with image grid)
  - [ ] Add photos to /public/images/photography (currently empty)
- [x] Phase 5: RSS Feed — **Complete**
  - [x] src/lib/rss.ts — generateRssFeed() returns RSS 2.0 XML
  - [x] src/app/feed.xml/route.ts — GET handler aggregates all content types
  - [x] Set NEXT_PUBLIC_SITE_URL env var in Vercel (fallback: https://localhost:3000)
- [ ] Phase 6: Polish
  - System dark mode preference detection on load
  - SEO: open graph images, sitemap, robots.txt
  - Animations/transitions

## Key Design Decisions
- Using next-mdx-remote for MDX rendering (simpler setup than Contentlayer)
- No database for v1 — all content is file-based MDX
- Photography images stored in /public/images/photography
- No auth for v1 — fully static/public site
- React Compiler enabled in next.config.ts for optimized performance
- Tailwind CSS v4 with new @tailwindcss/postcss package

## Notes for Claude Code
- When creating new components, always add TypeScript prop types
- When adding new pages, check if Nav needs updating (blog/projects/photography already in navLinks)
- When updating MDX schema, update types/index.ts accordingly
- Prefer `async` server components for data fetching over useEffect
- Node/npx available via NVM at `~/.nvm/versions/node/v25.6.1/bin/` — `~/.zshenv` initializes NVM for non-interactive shells
