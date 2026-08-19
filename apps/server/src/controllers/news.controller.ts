import { articleQuerySchema } from "@repo/types";
import { asyncHandler } from "../utils/async-handler";
import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import ApiError from "../utils/api.error";
import { getFeedService } from "../services/news.service";
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
export { getuserFeed };
