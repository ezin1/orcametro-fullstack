import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { db } from "../_lib/prisma";
import DataTableServices from "./_components/data-table-services";

const CategoriesPage = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const services = await db.services.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex h-full min-h-0 w-full flex-1 flex-col space-y-4 overflow-hidden p-4 md:space-y-6 md:p-6">
        <div className="flex w-full shrink-0 items-center justify-between">
          <h1 className="text-lg font-bold md:text-xl lg:text-2xl">Serviços</h1>
        </div>
        <DataTableServices
          servicesTotal={JSON.parse(JSON.stringify(services))}
        />
      </div>
    </>
  );
};

export default CategoriesPage;
