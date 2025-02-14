"use server";

import { db } from "@/app/_lib/prisma";
import {
  ProductsFull,
  ServicesFull,
} from "@/app/budgets/newBudgets/_components/generate-budget-component";
import { auth } from "@clerk/nextjs/server";
import { BudgetStatus, BudgetType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Budgets {
  description: string;
  value: number;
  budgetStatus: BudgetStatus;
  expirationDate: Date;
  clientName: string;
  clientDocument: string;
  clientEmail: string;
  clientPhone: string;
  sellerId: string;
  budgetPdf: string;
  budgetObservation: string;
  validationQRCode: string;
  budgetType: BudgetType | undefined;
  products: Array<ProductsFull>;
  services: Array<ServicesFull>;
  discount: number;
}

interface BudgetCreateProps {
  budget: Budgets;
}
export const budgetCreate = async ({ budget }: BudgetCreateProps) => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.budgets.create({
    data: {
      userId,
      organizationId: orgId || "",
      value: budget.value,
      sellerId: budget.sellerId,
      clientName: budget.clientName,
      clientEmail: budget.clientEmail,
      clientDocument: budget.clientDocument,
      clientPhone: budget.clientPhone,
      products: JSON.parse(JSON.stringify(budget.products)) || "",
      services: JSON.parse(JSON.stringify(budget.services)) || "",
      discount: budget.discount,
      budgetObservation: budget.budgetObservation || "",
      budgetPdf: budget.budgetPdf,
      validationQRCode: budget.validationQRCode,
      budgetType: budget.budgetType || BudgetType.HYBRID,
      description: budget.description,
      budgetStatus: budget.budgetStatus,
      expirationDate: budget.expirationDate,
    },
  });

  revalidatePath("/budgets/myBudgets");
  redirect("/budgets/newBudgets");
};
