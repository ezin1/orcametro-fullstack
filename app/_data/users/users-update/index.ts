"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { redirect } from "next/navigation";

export const usersUpdateOrganization = async (organizationId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.users.update({
    where: {
      userId,
    },
    data: {
      organizationId: organizationId,
    },
  });
  redirect("/");
};
