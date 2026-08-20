import { CURRENTS_CATEGORY_MAP, NEWSDATA_CATEGORY_MAP } from "../config/categoryMap";

export interface NormalizedArticle {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
  author: string | null;
  category: string;
  country: string;
  language: string;
  publishedAt: Date;
  mood: string | null;
}
const mapCategory = (category: string[], map: Record<string, string>): string => {
  for (const cat of category) {
    const mapped = map[cat.toLowerCase()];
    if (mapped) return mapped;
  }
  return "world";
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeNewsData = (raw: any): NormalizedArticle | null => {
  if (!raw.link || !raw.title) return null;
  return {
    url: raw.link,
    title: raw.title.trim(),
    description: raw.description ?? null,
    thumbnail: raw.image_url || null,
    author: raw.author?.trim() ?? null,
    category: mapCategory(raw.category ?? [], NEWSDATA_CATEGORY_MAP),
    country: raw.country?.[0] ?? "us",
    language: raw.language?.[0] ?? "en",
    publishedAt: new Date(raw.published_at || raw.pubDate || Date.now()),
    mood: raw.sentiment ?? null,
  };
};
export const normalizeCurrents = (raw: any): NormalizedArticle | null => {
  if (!raw.url || !raw.title) return null;

  return {
    url: raw.url,
    title: raw.title.trim(),
    description: raw.description ?? null,
    thumbnail: raw.image ?? null,
    author: raw.author?.trim() ?? null,
    category: mapCategory(raw.category ?? [], CURRENTS_CATEGORY_MAP),
    country: "us",
    language: raw.language ?? "en",
    publishedAt: new Date(raw.published || Date.now() || raw.published_at),
    mood: null,
  };
};
