// src/services/rssFetcher.service.ts
import Parser from "rss-parser";
import { prisma } from "@repo/db";
import { RSS_FEEDS } from "../config/rssFeeds";
import { scrapeArticleMeta } from "./scraper.service";
import { NormalizedArticle } from "./normalizer.service";

type CustomItem = {
  "media:content": { $: { url: string } };
  "media:thumbnail": { $: { url: string } };
  enclosure: { url: string };
  author?: string;
};

const parser = new Parser<Record<string, unknown>, CustomItem>({
  customFields: {
    item: [["media:content", "media:content"], ["media:thumbnail", "media:thumbnail"], "enclosure"],
  },
});

const normalizeRssItem = (
  item: Parser.Item & CustomItem,
  feed: (typeof RSS_FEEDS)[number],
): NormalizedArticle | null => {
  if (!item.link || !item.title) return null;

  const thumbnail =
    item["media:content"]?.$?.url || item["media:thumbnail"]?.$?.url || item.enclosure?.url || null;

  return {
    url: item.link,
    title: item.title.trim(),
    description: item.contentSnippet?.trim() ?? item.summary?.trim() ?? "",
    thumbnail,
    author: item.creator ?? item.author ?? null,
    category: feed.category,
    country: "us",
    language: "en",
    publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    mood: null,
  };
};

export const fetchFromRss = async () => {
  let totalFetched = 0;
  let totalSaved = 0;

  for (const feed of RSS_FEEDS) {
    try {
      console.info(`[RSS] Fetching ${feed.source}...`);

      const parsed = await parser.parseURL(feed.url);

      // get or create source in DB
      const source = await prisma.newsSource.upsert({
        where: { name: feed.source },
        update: {},
        create: {
          name: feed.source,
          apiProvider: "rss",
          baseUrl: feed.url,
          category: feed.category,
          isActive: true,
        },
      });

      const articles = parsed.items
        .map((item) => normalizeRssItem(item as Parser.Item & CustomItem, feed))
        .filter(Boolean) as NormalizedArticle[];

      totalFetched += articles.length;

      for (const article of articles) {
        // scrape missing thumbnail or short description
        const needsScraping =
          !article.thumbnail || !article.description || article.description.length < 100;

        if (needsScraping) {
          const meta = await scrapeArticleMeta(article.url);
          if (!article.thumbnail && meta.thumbnail) article.thumbnail = meta.thumbnail;
          if ((!article.description || article.description.length < 100) && meta.description) {
            article.description = meta.description;
          }
        }

        // skip if still no description
        if (!article.description || article.description.length < 80) continue;

        // detect mood

        try {
          await prisma.article.upsert({
            where: { url: article.url },
            update: {},
            create: {
              sourceId: source.id,
              url: article.url,
              title: article.title,
              description: article.description,
              thumbnail: article.thumbnail,
              author: article.author,
              category: article.category,
              country: article.country,
              language: article.language,
              publishedAt: article.publishedAt,
            },
          });
          totalSaved++;
        } catch {
          // skip silently
        }
      }

      console.info(`[RSS] ${feed.source} — ${articles.length} fetched`);

      // small delay between feeds
      await new Promise((r) => setTimeout(r, 300));
    } catch (err: unknown) {
      console.error(`[RSS] Failed ${feed.source}: ${(err as Error).message}`);
    }
  }

  console.info(`[RSS] Done — ${totalFetched} fetched, ${totalSaved} saved`);
  return { totalFetched, totalSaved };
};
