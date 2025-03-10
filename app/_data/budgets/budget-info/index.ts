import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const totalRevenueByOrg = async () => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const budgetsApproved = await db.budgets.findMany({
    where: {
      organizationId: orgId,
      budgetStatus: "APPROVED",
    },
  });

  const totalRevenue = budgetsApproved.reduce((acc, budget) => {
    return acc + Number(budget.value);
  }, 0);

  return totalRevenue;
};

export const salesMonthlyByOrg = async () => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const budgetsApproved = await db.budgets.findMany({
    where: {
      organizationId: orgId,
    },
  });

  const totalRevenue = budgetsApproved.reduce((acc, budget) => {
    return acc + Number(budget.value);
  }, 0);

  return totalRevenue;
};
