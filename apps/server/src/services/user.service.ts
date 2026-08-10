import { prisma } from "@repo/db";
import ApiError from "../utils/api.error";

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}
