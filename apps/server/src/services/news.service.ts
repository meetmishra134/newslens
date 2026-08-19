import { prisma } from "@repo/db";
import { ArticleQuery } from "@repo/types";
const getFeedService = async ({ category, country, page = 1, limit = 20 }: ArticleQuery) => {
  const where: NonNullable<Parameters<typeof prisma.article.findMany>[0]>["where"] = {};
  if (country) {
    where.country = country;
  }
  if (category && category.length > 0) {
    where.category = {
      in: category,
    };
  }
  const [articles, totalCount] = await prisma.$transaction([
    prisma.article.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        publishedAt: "desc",
      },
    }),
    prisma.article.count({ where }),
  ]);

  return {
    articles,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export { getFeedService };
