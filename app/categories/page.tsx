import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/data-table";
import { categoriesColumns } from "./_columns";
import { db } from "../_lib/prisma";
const CategoriesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const categories = await db.categories.findMany({
    where: {
      userId: userId,
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
            Categorias
          </h1>
          {/* <CreateCategoryButton /> */}
        </div>
        <ScrollArea className="h-[570px] lg:h-[600px] 2xl:h-[820px]">
          <DataTable
            columns={categoriesColumns}
            data={JSON.parse(JSON.stringify(categories))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default CategoriesPage;
