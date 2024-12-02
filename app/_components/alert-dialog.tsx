import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertDestructive() {
  console.log("AlertDestructive");
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Preencha todos os campos obrigatórios.
      </AlertDescription>
    </Alert>
  );
}
