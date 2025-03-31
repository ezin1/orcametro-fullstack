import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { db } from "../_lib/prisma";
import DataTableServices from "./_components/data-table-services";
import { getSellerInfoByEmail } from "../_data/sellers/sellers-info";

const CategoriesPage = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const userEmail = user.emailAddresses[0].emailAddress;

  const sellerInfoByEmail = await getSellerInfoByEmail(userEmail);

  if (sellerInfoByEmail.verifyIfUserIsSeller?.sellerPermission !== "ADMIN") {
    redirect("/unauthorized");
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
      <div className="flex h-screen flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
            Serviços
          </h1>
        </div>
        <DataTableServices
          servicesTotal={JSON.parse(JSON.stringify(services))}
        />
      </div>
    </>
  );
};

export default CategoriesPage;
