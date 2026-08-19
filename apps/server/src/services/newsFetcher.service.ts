import axios from "axios";
import { prisma } from "@repo/db";
import { MVP_CATEGORIES } from "../config/categoryMap";
import { normalizeNewsData, normalizeCurrents, NormalizedArticle } from "./normalizer.service";
import { scrapeArticleMeta } from "./scraper.service";
import { fetchFromRss } from "./rssFetcher.service";

const saveArticles = async (articles: NormalizedArticle[], sourceId: string) => {
  let saved = 0;
  for (const article of articles) {
    const needsScraping =
      !article.thumbnail || !article.description || article.description.length < 100;

    if (needsScraping) {
      const meta = await scrapeArticleMeta(article.url);
      if (!article.thumbnail && meta.thumbnail) {
        article.thumbnail = meta.thumbnail;
      }
      if ((!article.description || article.description.length < 100) && meta.description) {
        article.description = meta.description;
      }
    }

    // still no description after scraping — skip article
    if (!article.description || article.description.length < 80) {
      continue;
    }
    try {
      await prisma.article.upsert({
        where: {
          url: article.url,
        },
        update: {},
        create: {
          sourceId,
          url: article.url,
          title: article.title,
          description: article.description,
          thumbnail: article.thumbnail,
          author: article.author,
          category: article.category,
          country: article.country,
          language: article.language,
          publishedAt: article.publishedAt,
          mood: article.mood,
        },
      });
      saved++;
    } catch (err) {
      console.error(`Error saving article with URL ${article.url}:`, err);
    }
  }
  return saved;
};

const getOrCreateSource = async (name: string, provider: string, url: string) => {
  return prisma.newsSource.upsert({
    where: { name },
    update: {},
    create: {
      name,
      apiProvider: provider,
      baseUrl: url,
      isActive: true,
    },
  });
};
export const fetchFromNewsData = async () => {
  const apiKey = process.env.NEWSDATA_API_KEY;
  let totalFetched = 0;
  let totalSaved = 0;

  const source = await getOrCreateSource("NewsData.io", "newsdata", "https://newsdata.io");

  for (const category of MVP_CATEGORIES) {
    try {
      console.info(`[NewsData] Fetching category: ${category}`);

      const res = await axios.get("https://newsdata.io/api/1/latest", {
        params: {
          apikey: apiKey,
          category,
          language: "en",
          image: 1, // only articles with images
          removeduplicate: 1,
        },
        timeout: 10000,
      });

      const articles = (res.data.results ?? [])
        .map(normalizeNewsData)
        .filter(Boolean) as NormalizedArticle[];

      totalFetched += articles.length;

      const saved = await saveArticles(articles, source.id);
      totalSaved += saved;

      console.info(`[NewsData] ${category} — ${articles.length} fetched, ${saved} saved`);

      // small delay between category requests to avoid rate limiting
      await new Promise((r) => setTimeout(r, 500));
    } catch (err: unknown) {
      console.error(
        `[NewsData] Failed category ${category}: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  return { totalFetched, totalSaved };
};
export const fetchFromCurrents = async () => {
  const apiKey = process.env.CURRENTS_API_KEY;
  let totalFetched = 0;
  let totalSaved = 0;

  const source = await getOrCreateSource(
    "Currents API",
    "currents",
    "https://currentsapi.services",
  );

  for (const category of MVP_CATEGORIES) {
    try {
      console.info(`[Currents] Fetching category: ${category}`);

      const res = await axios.get("https://api.currentsapi.services/v1/latest-news", {
        headers: { Authorization: apiKey },
        params: {
          language: "en",
          category,
          page_size: 10,
        },
        timeout: 10000,
      });

      const articles = (res.data.news ?? [])
        .map(normalizeCurrents)
        .filter(Boolean) as NormalizedArticle[];

      totalFetched += articles.length;

      const saved = await saveArticles(articles, source.id);
      totalSaved += saved;

      console.info(`[Currents] ${category} — ${articles.length} fetched, ${saved} saved`);

      await new Promise((r) => setTimeout(r, 500));
    } catch (err: unknown) {
      console.error(
        `[Currents] Failed category ${category}: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  return { totalFetched, totalSaved };
};
export const fetchAllNews = async () => {
  console.info("[FETCHER] Starting news fetch...");

  const [newsdata, currents, rss] = await Promise.allSettled([
    fetchFromNewsData(),
    fetchFromCurrents(),
    fetchFromRss(),
  ]);

  const newsdataResult =
    newsdata.status === "fulfilled" ? newsdata.value : { totalFetched: 0, totalSaved: 0 };
  const currentsResult =
    currents.status === "fulfilled" ? currents.value : { totalFetched: 0, totalSaved: 0 };
  const rssResult = rss.status === "fulfilled" ? rss.value : { totalFetched: 0, totalSaved: 0 };

  console.info(`
    [FETCHER] Done
    NewsData : ${newsdataResult.totalFetched} fetched, ${newsdataResult.totalSaved} saved
    Currents : ${currentsResult.totalFetched} fetched, ${currentsResult.totalSaved} saved
    RSS      : ${rssResult.totalFetched} fetched, ${rssResult.totalSaved} saved
    Total saved: ${newsdataResult.totalSaved + currentsResult.totalSaved + rssResult.totalSaved}
  `);
};
