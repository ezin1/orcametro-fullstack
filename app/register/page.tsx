import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { FormRegister } from "./_components/form-register";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const userEmail = user.emailAddresses[0].emailAddress;

  console.log(userEmail);
  return (
    <div className="absolute grid h-full w-full items-center justify-center p-2 text-base sm:overflow-y-auto sm:text-lg md:text-sm lg:text-sm">
      <Card>
        <CardHeader className="flex items-center">
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>
            Por favor, finalize seu cadastro para que possamos prosseguir:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 text-center">
          <FormRegister userEmail={userEmail || ""} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
