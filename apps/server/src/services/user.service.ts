import { clerkClient } from "@clerk/express";
import { prisma } from "@repo/db";

export async function syncUserService(clerkId: string) {
  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email =
    clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ?? "";
  const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

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
