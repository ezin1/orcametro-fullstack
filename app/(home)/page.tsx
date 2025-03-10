// import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { MyMemberships } from "../utils/clerk/dialog-manage-user-organization";
import { totalRevenueByOrg } from "../_data/budgets/budget-info";
import { CalendarArrowUp, DollarSign, ShoppingCart } from "lucide-react";
import SumaryCardMoney from "./components/summary-card-money";
import SumaryCardValue from "./components/summary-card-value";

const HomePage = async () => {
  const { userId, orgId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  let isOpenDialog = true;
  if (orgId) {
    isOpenDialog = false;
  }

  const totalRevenue = await totalRevenueByOrg();
  // const salesMonthly = await salesMonthlyByOrg();
  console.log(totalRevenue);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
          Dashboard
        </h1>
      </div>
      <div className="flex w-full grid-cols-3 flex-row gap-5 p-5">
        <SumaryCardMoney
          value={totalRevenue}
          title="Faturamento total"
          icon={<DollarSign size={16} className="text-green-400" />}
        />
        <SumaryCardMoney
          value={totalRevenue}
          title="Faturamento mensal"
          icon={<CalendarArrowUp size={16} className="text-green-400" />}
        />
        <SumaryCardValue
          value={totalRevenue}
          title="Vendas mensal"
          icon={<ShoppingCart size={16} className="text-primary" />}
        />
      </div>
      <MyMemberships isOpenDialog={isOpenDialog} orgId={orgId} />
    </div>
  );
};

export default HomePage;
