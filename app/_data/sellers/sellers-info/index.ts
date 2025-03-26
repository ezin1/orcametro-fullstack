"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

export const getSellerInfoByEmail = async (email: string) => {
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

export const sellerInfoById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const verifyIfUserIsSeller = await db.sellers.findFirst({
    where: {
      sellerId: id,
    },
  });

  return { verifyIfUserIsSeller };
};

export const verifyPasswordBySellerId = async (
  id: string,
  password: string,
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const verifyPassword = await db.sellers.findFirst({
    where: {
      sellerId: id,
      sellerPassword: password,
    },
  });

  return { verifyPassword };
};
