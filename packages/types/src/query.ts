import { z } from "zod";

export const articleQuerySchema = z.object({
  country: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  category: z.union([z.string().transform((val) => [val]), z.array(z.string())]).default([]),
});
export type ArticleQuery = z.infer<typeof articleQuerySchema>;
