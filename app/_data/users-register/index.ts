"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { FormSchema } from "@/app/register/_components/form-register";
import { redirect } from "next/navigation";

export const usersRegister = async (data: FormSchema) => {
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
      userPlan: "basic", // Add default value or get from data
      reportsInMonth: 0, // Add default value or get from data
      reportsInMonthUsed: 0, // Add default value or get from data
    },
  });

  redirect("/");
};
