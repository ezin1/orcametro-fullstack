"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteCategorySchema } from "./schema";

export const categoryDelete = async ({ id }: DeleteCategorySchema) => {
  await db.categories.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/categories");
};
