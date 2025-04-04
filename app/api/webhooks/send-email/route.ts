import { Resend } from "resend";
import SendBudgetEmail from "./model-email";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: `Ézio <onboarding@resend.dev>`,
      to: ["eziof.dev@gmail.com"], // Corrigi um erro no email
      subject: "TESTE",
      react: SendBudgetEmail({
        clientName: "Ézio",
        projectName: "Projeto",
        budgetValue: "R$ 0,00",
        budgetId: "ORÇ-0001",
        validUntil: "30 dias",
        previewText: "Seu orçamento está pronto!",
      }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao enviar e-mail" },
      { status: 500 },
    );
  }
}
