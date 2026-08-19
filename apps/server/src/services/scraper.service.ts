// src/services/scraper.service.ts
import axios from "axios";
import * as cheerio from "cheerio";

interface ScrapedMeta {
  description: string | null;
  thumbnail: string | null;
}

const scrapeArticleMeta = async (url: string): Promise<ScrapedMeta> => {
  try {
    const res = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NewsLens/1.0)",
      },
    });

    const $ = cheerio.load(res.data);

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      null;

    const thumbnail =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[property="og:image:url"]').attr("content") ||
      null;

    return {
      description: description?.trim() ?? null,
      thumbnail: thumbnail?.trim() ?? null,
    };
  } catch {
    return { description: null, thumbnail: null };
  }
};
export { scrapeArticleMeta };
