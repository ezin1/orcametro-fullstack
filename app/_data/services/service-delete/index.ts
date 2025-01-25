"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteServiceSchema } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const serviceDelete = async ({ id }: DeleteServiceSchema) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.services.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/services");
};
