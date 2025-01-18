// import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";
import { MyMemberships } from "../utils/clerk/dialog-manage-user-organization";

const HomePage = async () => {
  const { userId, orgId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await usersInfo();

  if (!userInfo.verifyIfUserIsRegistered) {
    redirect("/register");
  }

  return (
    <div className="flex h-full justify-center overflow-hidden">
      Home Page <MyMemberships isOpenDialog={true} orgId={orgId} />
    </div>
  );
};

export default HomePage;
