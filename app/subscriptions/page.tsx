import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import CardPlan from "./_components/card-plan";
import { getSellerInfoByEmail } from "../_data/sellers/sellers-info";

const SubscripionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
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
    <div className="flex h-screen flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
          Planos
        </h1>
      </div>
      <div>
        <CardPlan plans={arrayPlans} userPlan={userPlan} userId={userId} />
      </div>
    </div>
  );
};

export default SubscripionsPage;
