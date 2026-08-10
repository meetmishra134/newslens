import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/async-handler";
import ApiResponse from "../utils/api.response";
import { getUserById } from "../services/user.service";
import ApiError from "../utils/api.error";
import { Request, Response } from "express";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId, isAuthenticated } = getAuth(req);
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const user = await getUserById(userId);
  return res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});
export { getUser };
