import Image from "next/image";
import { Button } from "../_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.png"
          width={187}
          height={49}
          alt="Orçametro"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          Orçametro é a maneira fácil e rápida de criar orçamentos
          personalizados em minutos. Adicione os itens do orçamento, e nosso
          sistema calculará automaticamente o custo total. Envie seus orçamentos
          diretamente do site para seus clientes e economize tempo e esforço na
          criação.
        </p>
        <SignInButton>
          <Button variant="outline">
            <Image src="/google.png" alt="Icone" width={20} height={20} />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/homeImg.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
