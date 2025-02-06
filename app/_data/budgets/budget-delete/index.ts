"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

export const budgetDeleteById = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.budgets.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/budgets/myBudgets");
};
