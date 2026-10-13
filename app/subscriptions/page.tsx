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
      price: 25.99,
      features: [
        "150 orçamentos semanais",
        "3 usuários",
        "1 método de envio liberado",
      ],
    },
    {
      name: "Standard",
      description: "Plano intermediário",
      price: 33.99,
      features: [
        "Orçamentos Ilimitados",
        "10 usuários",
        "2 métodos de envio liberados",
      ],
    },
    {
      name: "Premium",
      description: "Plano completo",
      price: 55.99,
      features: [
        "Orçamentos Ilimitados",
        "Usuários Ilimitados",
        "Todos os métodos de envio liberados",
      ],
    },
  ];

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col space-y-4 overflow-hidden p-4 md:space-y-6 md:p-6">
      <div className="flex w-full shrink-0 items-center justify-between">
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">Planos</h1>
      </div>
      <div className="flex min-h-0 w-full flex-1">
        <CardPlan plans={arrayPlans} userPlan={userPlan} userId={userId} />
      </div>
    </div>
  );
};

export default SubscripionsPage;
