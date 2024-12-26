"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteSellerSchema } from "./schema";

export const sellerDelete = async ({ sellerId }: DeleteSellerSchema) => {
  await db.sellers.delete({
    where: {
      sellerId: sellerId,
    },
  });

  revalidatePath("/sellers");
};
