// "use server"

// import { db } from "@/app/_lib/prisma";
// import { ProductsFull, ServicesFull } from "@/app/budgets/newBudgets/_components/generate-budget-component";
// import { auth } from "@clerk/nextjs/server";
// import { BudgetType } from "@prisma/client";
// import { Decimal } from "@prisma/client/runtime/library";
// import { redirect } from "next/navigation";

// interface Budgets {
//     id: string;
//     userId: string;
//     value: Decimal;
//     organizationId: string;
//     createdAt: Date;
//     updatedAt: Date;
//     deleted: boolean;
//     sellerId: string;
//     clientName: string;
//     clientEmail: string;
//     clientDocument: string;
//     clientPhone: string;
//     products: string;
//     services: string;
//     discountPercentage: number;
//     budgetTotal: number;
//     observation?: string;
//     pdfBase64: string;
//     qrCodeBase64: string;
//     budgetType: BudgetType;

//   }

// interface BudgetCreateProps {
//     budget: Budgets
// }
// export const budgetCreate = async ({
//     budget,
//     }: BudgetCreateProps) => {
//     const { userId, orgId } = await auth();
//     if (!userId) {
//         throw new Error("Unauthorized");
//     }

//     await db.budgets.create({
//         data: {
//             userId,
//             organizationId: orgId || "",
//             value: budget.value,
//             sellerId: budget.sellerId,
//             clientName: budget.clientName,
//             clientEmail: budget.clientEmail,
//             clientDocument: budget.clientDocument,
//             clientPhone: budget.clientPhone,
//             products: budget.products || [],
//             services: budget.services || [],
//             discountPercentage: budget.discountPercentage,
//             budgetTotal: budget.budgetTotal,
//             observation: budget.observation,
//             pdfBase64: budget.pdfBase64,
//             qrCodeBase64: budget.qrCodeBase64,
//             budgetType: budget.budgetType,
//         },
//     });

//     redirect("/budgets");
//     };
