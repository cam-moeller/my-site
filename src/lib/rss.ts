export interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  categories: string[];
  guid: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssFeed(items: FeedItem[], siteUrl: string): string {
  const sortedItems = [...items].sort((a, b) =>
    a.pubDate < b.pubDate ? 1 : -1
  );

  const itemsXml = sortedItems
    .map((item) => {
      const categories = item.categories
        .map((c) => `    <category>${escapeXml(c)}</category>`)
        .join('\n');
      return `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.link)}</link>
    <description>${escapeXml(item.description)}</description>
    <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>
${categories}
    <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
  </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cameron Moeller</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Blog posts, projects, and photography by Cameron Moeller.</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(siteUrl + '/feed.xml')}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}
