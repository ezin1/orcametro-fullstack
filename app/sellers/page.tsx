import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { db } from "../_lib/prisma";

import DataTableSellers from "./_components/data-table-sellers";

const SellersPage = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const sellers = await db.sellers.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex h-screen flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
            Vendedores
          </h1>
        </div>
        <DataTableSellers sellersTotal={sellers} />
      </div>
    </>
  );
};

export default SellersPage;
