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
import SalesPerMonth from "./components/sales-per-month-chart";

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

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col space-y-4 overflow-hidden p-4 md:space-y-6 md:p-6">
      <div className="flex w-full shrink-0 items-center justify-between">
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">Dashboard</h1>
      </div>
      <div className="flex min-h-0 flex-1 flex-col space-y-6 overflow-y-auto overflow-x-hidden pb-6 pr-1">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <SalesPerSeller salesPerSeller={salesPerSeller} />
          <SalesPerMonth salesPerMonth={budgetsInfo.salesPerMonth} />
        </div>
      </div>
      <MyMemberships isOpenDialog={isOpenDialog} orgId={orgId} />
    </div>
  );
};

export default HomePage;
