import {
  articleQuerySchema,
  defaultNewsQuerySchema,
  markArticleAsReadParamSchema,
} from "@repo/types";
import { asyncHandler } from "../utils/async-handler";
import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import ApiError from "../utils/api.error";
import {
  exploreNewsService,
  getArticleByIdService,
  getDefaultNewsService,
  getFeedService,
  markArticleAsReadService,
  trendingNewsService,
} from "../services/news.service";
import ApiResponse from "../utils/api.response";

const getuserFeed = asyncHandler(async (req: Request, res: Response) => {
  const { category, country, page, limit } = articleQuerySchema.parse(req.query);
  const { userId, isAuthenticated } = getAuth(req);
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const articles = await getFeedService({ category, country, page, limit });
  return res.status(200).json(new ApiResponse(200, "News fetched successfully", articles));
});

const getExploreNews = asyncHandler(async (req: Request, res: Response) => {
  const { category, country, page, limit } = articleQuerySchema.parse(req.query);
  const { userId, isAuthenticated } = getAuth(req);
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const articles = await exploreNewsService({ category, country, page, limit });
  return res.status(200).json(new ApiResponse(200, "News fetched successfully", articles));
});

const getDefaultNews = asyncHandler(async (req: Request, res: Response) => {
  const { category, country, language, page, limit } = defaultNewsQuerySchema.parse(req.query);
  const { userId, isAuthenticated } = getAuth(req);
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const articles = await getDefaultNewsService({ category, country, language, page, limit });
  return res.status(200).json(new ApiResponse(200, "News fetched successfully", articles));
});

const getTrendingNews = asyncHandler(async (req: Request, res: Response) => {
  const { category, country, language, page, limit } = defaultNewsQuerySchema.parse(req.query);
  const articles = await trendingNewsService({ category, country, language, page, limit });
  return res.status(200).json(new ApiResponse(200, "Trending news fetched successfully", articles));
});

const getArticleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    throw new ApiError(400, "Invalid article ID");
  }
  const article = await getArticleByIdService(id);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }
  return res.status(200).json(new ApiResponse(200, "Article fetched successfully", article));
});

const markArticleAsRead = asyncHandler(async (req: Request, res: Response) => {
  const { userId, isAuthenticated } = getAuth(req);
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const { articleId } = markArticleAsReadParamSchema.parse(req.params);

  const article = await markArticleAsReadService(userId, articleId);
  return res.status(201).json(new ApiResponse(200, "Article marked as read", article));
});

export {
  getuserFeed,
  getExploreNews,
  getDefaultNews,
  getTrendingNews,
  getArticleById,
  markArticleAsRead,
};
