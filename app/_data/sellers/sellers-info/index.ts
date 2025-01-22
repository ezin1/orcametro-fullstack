"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

export const sellerInfoByEmail = async (email: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const verifyIfUserIsSeller = await db.sellers.findFirst({
    where: {
      email,
    },
  });

  return { verifyIfUserIsSeller };
};
