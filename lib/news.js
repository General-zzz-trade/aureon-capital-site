const FEEDS = [
  {
    source: "Bloomberg",
    url: "https://www.bloomberg.com/feeds/bbiz/sitemap_news.xml",
  },
  {
    source: "Yahoo Finance",
    url: "https://finance.yahoo.com/news/rssindex",
  },
  {
    source: "CoinDesk",
    url: "https://www.coindesk.com/arc/outboundfeeds/rss/",
  },
];

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: {
      "User-Agent": "AureonSiteBot/1.0",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${feed.url}: ${response.status}`);
  }

  return response.text();
}

function decode(str = "") {
  return str
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) && items.length < 12) {
    const block = match[1];
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
    const descriptionMatch = block.match(/<description>([\s\S]*?)<\/description>/);

    const title = decode(titleMatch?.[1] || "");
    if (!title) continue;

    items.push({
      title,
      link: decode(linkMatch?.[1] || ""),
      description: decode(descriptionMatch?.[1] || ""),
    });
  }

  return items;
}

function buildSummary(item, source) {
  const base = item.description || item.title;
  const trimmed = base.length > 220 ? `${base.slice(0, 217)}...` : base;
  return {
    en: `${trimmed} (via ${source})`,
    zh: `${trimmed}（来源：${source}）`,
  };
}

export async function getNewsHighlights() {
  try {
    const rawFeeds = await Promise.all(FEEDS.map((feed) => fetchFeed(feed)));

    const aggregated = rawFeeds.flatMap((xml, index) =>
      extractItems(xml).map((item) => ({
        ...item,
        source: FEEDS[index].source,
      }))
    );

    const unique = [];
    const seen = new Set();
    for (const entry of aggregated) {
      if (seen.has(entry.title)) continue;
      seen.add(entry.title);
      unique.push(entry);
      if (unique.length >= 5) break;
    }

    if (!unique.length) {
      return { status: "empty" };
    }

    return {
      status: "ready",
      items: unique.map((item) => ({
        title: item.title,
        source: item.source,
        summary: buildSummary(item, item.source),
      })),
    };
  } catch (error) {
    console.error("News fetch error", error);
    return { status: "error" };
  }
}
