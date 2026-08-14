import { clerkClient } from "@clerk/express";
import { prisma } from "@repo/db";

export async function syncUserService(clerkId: string) {
  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email =
    clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ?? "";
  const name = clerkUser.username;
  const user = await prisma.user.upsert({
    where: {
      clerkId,
    },
    update: {
      email,
      name,
      avatar: clerkUser.imageUrl,
    },
    create: {
      clerkId,
      email,
      name,
      avatar: clerkUser.imageUrl,
    },
  });
  return user;
}
export async function checkUserExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !!user;
}
