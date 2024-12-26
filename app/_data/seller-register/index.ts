"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import { FormSchemaSellerRegister } from "@/app/sellers/_components/drawer-edit-seller";

export const sellerRegister = async (data: FormSchemaSellerRegister) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.sellers.update({
    where: {
      userId: userId,
      sellerId: data.sellerId,
    },
    data: {
      sellerId: data.sellerId,
      name: data.name,
      document: data.document,
      sellerPassword: data.sellerPassword,
      sellerStatus: data.sellerStatus,
      sellerPermission: data.sellerPermission,
    },
  });
};
