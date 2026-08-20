import { prisma } from "@repo/db";
import { ArticleQuery, DefaultNewsQuery } from "@repo/types";
import { calculateNewStreak } from "../utils/streak.helper";
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
      include: {
        source: {
          select: {
            id: true,
            name: true,
            apiProvider: true,
          },
        },
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

const exploreNewsService = async ({ category, country, page = 1, limit = 20 }: ArticleQuery) => {
  const where: NonNullable<Parameters<typeof prisma.article.findMany>[0]>["where"] = {};
  if (country) {
    where.country = country;
  }
  if (category && category.length > 0) {
    where.category = {
      notIn: category,
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
      include: {
        source: {
          select: {
            id: true,
            name: true,
            apiProvider: true,
          },
        },
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

const getDefaultNewsService = async ({
  page = 1,
  limit = 20,
  category,
  country,
  language,
}: DefaultNewsQuery) => {
  const where: NonNullable<Parameters<typeof prisma.article.findMany>[0]>["where"] = {};
  if (country) {
    where.country = country;
  }
  if (language) {
    where.language = language;
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

const trendingNewsService = async ({
  page = 1,
  limit = 20,
  category,
  country,
  language,
}: DefaultNewsQuery) => {
  const where: NonNullable<Parameters<typeof prisma.article.findMany>[0]>["where"] = {};
  // const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // where.publishedAt = { gte: since };

  if (country) {
    where.country = country;
  }
  if (language) {
    where.language = language;
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
      include: {
        source: {
          select: {
            id: true,
            name: true,
            apiProvider: true,
          },
        },
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

const getArticleByIdService = async (id: string) => {
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      source: {
        select: {
          id: true,
          name: true,
          apiProvider: true,
        },
      },
    },
  });
  return article;
};

const markArticleAsReadService = async (clerkId: string, articleId: string) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch user first to get internal DB id and streak data
    const user = await tx.user.findUnique({
      where: { clerkId },
      select: { id: true, lastReadAt: true, currentStreak: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Increment article read count
    const article = await tx.article.update({
      where: { id: articleId },
      data: {
        readCount: {
          increment: 1,
        },
      },
    });

    // 3. Upsert ReadHistory using the internal DB user.id (UUID)
    await tx.readHistory.upsert({
      where: {
        userId_articleId: {
          userId: user.id, // Correct internal UUID
          articleId,
        },
      },
      create: {
        userId: user.id,
        articleId,
      },
      update: {
        readAt: new Date(),
      },
    });

    // 4. Calculate streak & update user
    const now = new Date();
    const newStreak = calculateNewStreak(user.currentStreak, user.lastReadAt, now);

    await tx.user.update({
      where: { id: user.id },
      data: {
        currentStreak: newStreak,
        lastReadAt: now,
      },
    });

    return article;
  });
};
export {
  getFeedService,
  exploreNewsService,
  getDefaultNewsService,
  trendingNewsService,
  getArticleByIdService,
  markArticleAsReadService,
};
