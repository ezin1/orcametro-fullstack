import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users-info";
import { DataTable } from "../_components/ui/data-table";
import { sellersColumns } from "./_columns";
import { db } from "../_lib/prisma";
import { ScrollArea } from "../_components/ui/scroll-area";

const SellersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const sellers = await db.sellers.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
            Vendedores
          </h1>
          {/* <AddTransactionButton
            userCanAddTransactions={userCanAddTransactions}
          /> */}
        </div>
        <div className="w-full">
          <ScrollArea>
            <DataTable
              columns={sellersColumns}
              data={JSON.parse(JSON.stringify(sellers))}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default SellersPage;
