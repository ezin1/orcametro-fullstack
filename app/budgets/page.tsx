import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";

const BudgetsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }
  return (
    <div>
      <p>Budgets Page</p>
    </div>
  );
};

export default BudgetsPage;
