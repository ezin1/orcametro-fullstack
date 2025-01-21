"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteSellerSchema } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const sellerDelete = async ({ sellerId }: DeleteSellerSchema) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.sellers.delete({
    where: {
      sellerId: sellerId,
    },
  });

  revalidatePath("/sellers");
};
