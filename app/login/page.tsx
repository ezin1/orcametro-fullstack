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
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.png"
          width={187}
          height={49}
          alt="Orçametro"
          className="mb-8"
        />
        <h1 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
          Bem-vindo
        </h1>
        <p className="mb-8 text-sm text-muted-foreground md:text-base lg:text-lg">
          Orçametro é a maneira fácil e rápida de criar orçamentos
          personalizados em minutos. Adicione os itens do orçamento, e nosso
          sistema calculará automaticamente o custo total. Envie seus orçamentos
          diretamente do site para seus clientes e economize tempo e esforço na
          criação.
        </p>
        <SignInButton>
          <Button variant="outline">
            <Image src="/google.png" alt="Icone" width={20} height={20} />
            <span className="text-sm md:text-base lg:text-lg">
              Fazer login ou criar conta
            </span>
          </Button>
        </SignInButton>
      </div>

      <div className="relative hidden h-full w-full lg:block">
        <Image
          src="/homeImg.png"
          alt="Faça login"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </div>
  );
};

export default LoginPage;
