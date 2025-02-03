import { Badge } from "@/app/_components/ui/badge";
import { BudgetStatus } from "@prisma/client";
import { CircleCheck, CircleX, Clock } from "lucide-react";

interface BadgeBudgetStatusProps {
  budgetStatus: BudgetStatus;
}
const BadgeBudgetStatus = ({ budgetStatus }: BadgeBudgetStatusProps) => {
  if (budgetStatus === BudgetStatus.APPROVED) {
    return (
      <Badge className="border-[hsl(160,60%,45%)] bg-transparent font-bold text-[hsl(160,60%,45%)] hover:bg-accent">
        <CircleCheck size={13} className="mr-2" />
        Aprovado
      </Badge>
    );
  }
  if (budgetStatus === BudgetStatus.PENDING) {
    return (
      <Badge className="border-foreground bg-transparent font-bold text-foreground hover:bg-accent">
        <Clock size={13} className="mr-2" />
        Pendente
      </Badge>
    );
  }
  if (budgetStatus === BudgetStatus.REJECTED) {
    return (
      <Badge className="border-destructive bg-transparent font-bold text-destructive hover:bg-accent">
        <CircleX size={13} className="mr-2" />
        Cancelado
      </Badge>
    );
  }
};

export default BadgeBudgetStatus;
