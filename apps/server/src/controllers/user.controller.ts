import { syncUserService } from "../services/user.service";
import ApiError from "../utils/api.error";
import ApiResponse from "../utils/api.response";
import { asyncHandler } from "../utils/async-handler";
import { getAuth } from "@clerk/express";
import { Request, Response } from "express";

const syncUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const user = await syncUserService(userId);
  res.status(200).json(new ApiResponse(200, "User synced successfully", user));
});
export { syncUser };
