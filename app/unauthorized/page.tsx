import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Button } from "../_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
} from "../_components/ui/alert-dialog";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <AlertDialog open>
        <AlertDialogContent>
          <Card className="max-w-md border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="mb-3 text-2xl font-bold">
                Acesso Não Autorizado
              </CardTitle>
              <CardDescription className="text-base">
                Esta área é restrita apenas para administradores
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Você não possui permissões suficientes para acessar esta página.
                Esta funcionalidade está disponível apenas para usuários com
                privilégios de administrador. Por favor, retorne à página
                inicial ou entre em contato com um administrador.
              </p>
            </CardContent>
            <CardFooter className="mt-3 flex justify-center">
              <Button asChild size="lg">
                <Link href="/budgets/newBudgets" className="text-white">
                  Voltar
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <AlertDialogFooter>
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                Se você acredita que isso é um erro, entre em contato com o
                suporte.
              </p>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
