import { usersInfo } from "@/app/_data/users/users-info";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GenerateBudgetComponent from "./_components/generate-budget-component";

const NewBudgetsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
            Novo Orçamento
          </h1>
        </div>

        <GenerateBudgetComponent />
      </div>
    </>
  );
};

export default NewBudgetsPage;
