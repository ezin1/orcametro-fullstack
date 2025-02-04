import { usersInfo } from "@/app/_data/users/users-info";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DataTableBudgets from "./_components/data-table-budgets";
import { sellerInfoById } from "@/app/_data/sellers/sellers-info";

const MyBudgetsPage = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const budgets = await db.budgets.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const budgetsWithSellerName = await Promise.all(
    budgets.map(async (budget) => {
      const seller = await sellerInfoById(budget.sellerId);
      return {
        ...budget,
        sellerName: seller.verifyIfUserIsSeller?.name,
      };
    }),
  );

  return (
    <>
      <div className="flex h-screen flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
            Meus Orçamentos
          </h1>
        </div>
        <DataTableBudgets
          budgetsTotal={JSON.parse(JSON.stringify(budgetsWithSellerName))}
        />
      </div>
    </>
  );
};

export default MyBudgetsPage;
