import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: `eziof.dev@gmail.com <eziof.dev@gmail.com>`,
      to: ["eziofeitt15@gmai.com"],
      subject: "TESTE",
      html: "<h1>TESTE</h1>",
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
