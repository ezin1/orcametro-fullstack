import { Separator } from "@/app/_components/ui/separator";
import { usersInfo } from "@/app/_data/users/users-info";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
    <div>
      <p>NewBudgets Page</p>
      <Separator className="" orientation="vertical" />
    </div>
  );
};

export default NewBudgetsPage;
