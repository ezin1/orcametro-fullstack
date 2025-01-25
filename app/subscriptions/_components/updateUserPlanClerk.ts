"use server";

import { clerkClient } from "@clerk/nextjs/server";

const updateUserPlanClerk = async (userId: string, planName: string) => {
  await (
    await clerkClient()
  ).users.updateUser(userId, {
    publicMetadata: {
      subscriptionPlan: planName,
    },
  });
};

export default updateUserPlanClerk;
