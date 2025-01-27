"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";
import { DeleteProductSchema } from "./schema";

export const productDelete = async ({ id }: DeleteProductSchema) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.products.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/products");
};
