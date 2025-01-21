"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

export const usersInfo = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const verifyIfUserIsRegistered = await db.users.findUnique({
    where: {
      userId,
    },
  });

  return { verifyIfUserIsRegistered };
};

export const verifyIfUserExistsByEmail = async (email: string) => {
  const user = await db.users.findFirst({
    where: {
      email,
    },
  });

  return { user };
};
