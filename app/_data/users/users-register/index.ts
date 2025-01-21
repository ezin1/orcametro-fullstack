"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { FormSchemaUserRegister } from "@/app/register/_components/form-register";
import { redirect } from "next/navigation";

export const usersRegister = async (data: FormSchemaUserRegister) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.users.create({
    data: {
      userId,
      isCompany: data.isCompany,
      companyName: data.companyName ?? "",
      companyDocument: data.companyDocument ?? "",
      responsibleName: data.responsibleName,
      responsibleDocument: data.responsibleDocument,
      email: data.email,
      cellphone: data.cellphone,
      phone: data.phone,
      birthDate: data.birthDate,
      postalCode: data.postalCode,
      streetName: data.streetName,
      streetNumber: data.streetNumber,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      userPlan: "No Plan",
      reportsInMonth: 0,
      reportsInMonthUsed: 0,
    },
  });

  redirect("/");
};
