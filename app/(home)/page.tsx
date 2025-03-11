// import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { MyMemberships } from "../utils/clerk/dialog-manage-user-organization";
import {
  pendingSalesMonthlyByOrg,
  salesMonthlyByOrg,
  salesPerSellerByOrg,
  totalRevenueByOrg,
  totalRevenueByOrgMonthly,
} from "../_data/budgets/budget-info";
import {
  CalendarArrowUp,
  CalendarClock,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import SumaryCardMoney from "./components/summary-card-money";
import SumaryCardValue from "./components/summary-card-value";
import SalesPerSeller from "./components/sales-per-seller-chart";

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

  const budgetsInfo = await totalRevenueByOrg();
  const totalRevenueMonthly = await totalRevenueByOrgMonthly();
  const salesMonthly = await salesMonthlyByOrg();
  const pendingSalesMonthly = await pendingSalesMonthlyByOrg();
  const salesPerSeller = await salesPerSellerByOrg();
  console.log(salesPerSeller);
  return (
    <div className="flex h-screen flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-bold sm:text-sm md:text-lg lg:text-2xl">
          Dashboard
        </h1>
      </div>
      <div className="flex w-full grid-cols-3 flex-row p-5 lg:gap-12 2xl:gap-44">
        <SumaryCardMoney
          value={budgetsInfo.totalRevenue}
          title="Faturamento total"
          icon={<DollarSign size={16} className="text-green-400" />}
        />
        <SumaryCardMoney
          value={totalRevenueMonthly}
          title="Faturamento mensal"
          icon={<CalendarArrowUp size={16} className="text-green-400" />}
        />
        <SumaryCardValue
          value={salesMonthly}
          title="Vendas mensal"
          icon={<ShoppingCart size={16} className="text-primary" />}
        />
        <SumaryCardValue
          value={pendingSalesMonthly}
          title="Vendas pendentes do mês"
          icon={<CalendarClock size={16} className="text-white" />}
        />
      </div>
      <div className="flex flex-row justify-between gap-5 px-5">
        <SalesPerSeller salesPerSeller={salesPerSeller} />
        <SalesPerSeller salesPerSeller={salesPerSeller} />
      </div>
      <MyMemberships isOpenDialog={isOpenDialog} orgId={orgId} />
    </div>
  );
};

export default HomePage;
