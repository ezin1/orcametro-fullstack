import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { db } from "../_lib/prisma";
import DataTableProducts from "./_components/data-table-products";
import { getSellerInfoByEmail } from "../_data/sellers/sellers-info";

const ProductsPage = async () => {
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

  const products = await db.products.findMany({
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
            Produtos
          </h1>
        </div>
        <DataTableProducts
          productsTotal={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </>
  );
};

export default ProductsPage;
