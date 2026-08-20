import { z } from "zod";
const DEFAULT_CATEGORIES: string[] = [
  // "business",
  // "entertainment",
  // "general",
  // "health",
  // "science",
  // "sports",
  "technology",
];
export const articleQuerySchema = z.object({
  country: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  category: z.union([z.string().transform((val) => [val]), z.array(z.string())]).default([]),
});
export type ArticleQuery = z.infer<typeof articleQuerySchema>;

export const defaultNewsQuerySchema = z.object({
  category: z
    .union([z.string().transform((val) => [val]), z.array(z.string())])
    .default(DEFAULT_CATEGORIES),
  country: z.string().optional().default("us"),
  language: z.string().optional().default("en"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});
export type DefaultNewsQuery = z.infer<typeof defaultNewsQuerySchema>;

export const markArticleAsReadParamSchema = z.object({
  articleId: z.uuid(),
});
export type MarkArticleAsReadParam = z.infer<typeof markArticleAsReadParamSchema>;
