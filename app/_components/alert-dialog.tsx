import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertDestructive() {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Preencha todos os campos obrigatórios corretamente.
      </AlertDescription>
    </Alert>
  );
}
