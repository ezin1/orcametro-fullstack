"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

interface updateUserPlanProps {
  plan: string;
  userIdSeller: string;
}

export const updateUserPlan = async ({
  plan,
  userIdSeller,
}: updateUserPlanProps) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userUpdated = await db.users.update({
    where: {
      userId: userIdSeller,
    },
    data: {
      userPlan: plan,
    },
  });

  return { userUpdated };
};
