"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { revalidatePath } from "next/cache";
import { FormSchemaCategoryUpsert } from "@/app/categories/_components/drawer-upsert-category";

export const categoryUpsert = async (data: FormSchemaCategoryUpsert) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.categories.upsert({
    update: { ...data, userId, id: data.id ?? undefined },
    create: { ...data, userId, id: data.id ?? undefined },
    where: {
      id: data.id || "",
    },
  });

  revalidatePath("/categories");
};
