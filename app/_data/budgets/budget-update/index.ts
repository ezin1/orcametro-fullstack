"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { redirect } from "next/navigation";
import { BudgetStatus } from "@prisma/client";

interface BudgetUpdateStatusProps {
  budgetId: string;
  budgetStatus: BudgetStatus;
}
export const updateStatusBudgetById = async ({
  budgetId,
  budgetStatus,
}: BudgetUpdateStatusProps) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.budgets.update({
    where: {
      id: budgetId,
    },
    data: {
      budgetStatus: budgetStatus,
    },
  });

  redirect("/budgets/myBudgets");
};
