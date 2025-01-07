import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import CardPlan from "./_components/card-plan";

const SubscripionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  const userPlan = userInfo.verifyIfUserIsRegistered.userPlan;

  const arrayPlans = [
    {
      name: "Basic",
      description: "Plano inicial",
      price: 15.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Standard",
      description: "Plano intermediário",
      price: 23.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Premium",
      description: "Plano completo",
      price: 35.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
  ];

  return (
    <div className="flex h-screen flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
          Planos
        </h1>
      </div>
      <div>
        <CardPlan plans={arrayPlans} userPlan={userPlan} />
      </div>
    </div>
  );
};

export default SubscripionsPage;
