import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { usersInfo } from "../_data/users/users-info";

const ProductsPage = async () => {
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
      <p>Products Page</p>
    </div>
  );
};

export default ProductsPage;
