"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { FormSchemaProductsUpsert } from "@/app/products/_components/drawer-upsert-product";

export const productUpsert = async (data: FormSchemaProductsUpsert) => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.products.upsert({
    update: { ...data, userId, id: data.id ?? undefined },
    create: {
      ...data,
      userId,
      id: data.id ?? undefined,
      organizationId: orgId || "",
    },
    where: {
      id: data.id || "",
    },
  });

  revalidatePath("/products");
};
