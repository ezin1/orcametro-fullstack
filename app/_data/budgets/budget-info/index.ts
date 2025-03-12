import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { sellerInfoById } from "../../sellers/sellers-info";

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

  const totalRevenue = budgetsApproved.reduce(
    (acc, budget) => acc + Number(budget.value),
    0,
  );

  const salesMap = new Map<string, { totalSales: number; count: number }>();

  budgetsApproved.forEach((budget) => {
    const month = new Date(budget.updatedAt).toLocaleString("pt-BR", {
      month: "long",
    });

    if (!salesMap.has(month)) {
      salesMap.set(month, { totalSales: 0, count: 0 });
    }

    const current = salesMap.get(month)!;
    salesMap.set(month, {
      totalSales: current.totalSales + Number(budget.value),
      count: current.count + 1,
    });
  });

  const salesPerMonth = Array.from(
    salesMap,
    ([month, { totalSales, count }]) => ({
      month,
      totalSales,
      count,
    }),
  );

  return { totalRevenue, budgetsApproved, salesPerMonth };
};

export const totalRevenueByOrgMonthly = async () => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const budgetsApproved = await db.budgets.findMany({
    where: {
      organizationId: orgId,
      updatedAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
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
      updatedAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
      budgetStatus: "APPROVED",
    },
  });

  const salesMonthly = budgetsApproved.length;

  return salesMonthly;
};

export const pendingSalesMonthlyByOrg = async () => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const budgetsApproved = await db.budgets.findMany({
    where: {
      organizationId: orgId,
      updatedAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
      budgetStatus: "PENDING",
    },
  });

  const salesMonthly = budgetsApproved.length;

  return salesMonthly;
};

export const salesPerSellerByOrg = async () => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const budgetsApproved = await db.budgets.findMany({
    where: {
      organizationId: orgId,
      updatedAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
      budgetStatus: "APPROVED",
    },
  });

  const salesPerSeller = budgetsApproved.reduce<Record<string, number>>(
    (acc, budget) => {
      if (acc[budget.sellerId]) {
        acc[budget.sellerId] += Number(budget.value);
      } else {
        acc[budget.sellerId] = Number(budget.value);
      }
      return acc;
    },
    {},
  );

  const objectData = [];

  for (const [key, value] of Object.entries(salesPerSeller)) {
    const seller = await sellerInfoById(key);
    const fullName = seller.verifyIfUserIsSeller?.name || "";
    const [firstName, secondName] = fullName.split(" ");
    objectData.push({ name: `${firstName} ${secondName || ""}`, value: value });
  }
  return objectData;
};
