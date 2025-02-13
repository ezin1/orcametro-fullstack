import { usersInfo } from "@/app/_data/users/users-info";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GenerateBudgetComponent from "./_components/generate-budget-component";
import { listAllProducts } from "@/app/_data/products/product-list";
import { listAllServices } from "@/app/_data/services/service-list";
import { listAllSellers } from "@/app/_data/sellers/seller-list";

const NewBudgetsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const products = await listAllProducts();
  const services = await listAllServices();
  const sellers = await listAllSellers();

  return (
    <>
      <div className="flex h-screen w-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
            Novo Orçamento
          </h1>
        </div>

        <GenerateBudgetComponent
          products={JSON.parse(JSON.stringify(products))}
          services={JSON.parse(JSON.stringify(services))}
          sellers={JSON.parse(JSON.stringify(sellers))}
        />
      </div>
    </>
  );
};

export default NewBudgetsPage;
