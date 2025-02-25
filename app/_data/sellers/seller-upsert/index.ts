"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import { FormSchemaSellerUpsert } from "@/app/sellers/_components/drawer-upsert-seller";
import { revalidatePath } from "next/cache";

export const sellerUpsert = async (data: FormSchemaSellerUpsert) => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.sellers.upsert({
    update: { ...data, userId, sellerId: data.sellerId ?? undefined },
    create: {
      ...data,
      userId,
      sellerId: data.sellerId ?? undefined,
      organizationId: orgId || "",
    },
    where: {
      sellerId: data.sellerId || "",
    },
  });

  revalidatePath("/sellers");
};
