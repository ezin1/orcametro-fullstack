"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { revalidatePath } from "next/cache";
import { FormSchemaServicesUpsert } from "@/app/services/_components/drawer-upsert-service";

export const serviceUpsert = async (data: FormSchemaServicesUpsert) => {
  const { userId, orgId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.services.upsert({
    update: { ...data, userId, id: data.id ?? undefined },
    create: {
      ...data,
      userId,
      id: data.id ?? undefined,
      organizationId: orgId || "",
    },
    where: {
      id: data.id || "",
    },
  });

  revalidatePath("/services");
};
