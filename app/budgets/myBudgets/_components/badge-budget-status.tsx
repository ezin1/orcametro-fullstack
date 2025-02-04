import { Badge } from "@/app/_components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { BudgetStatus } from "@prisma/client";
import { CircleCheck, CircleX, Clock } from "lucide-react";

interface BadgeBudgetStatusProps {
  budgetStatus: BudgetStatus;
  createdAt: Date;
  expirationDate: Date;
  updatedAt: Date;
}
const BadgeBudgetStatus = ({ budgetStatus }: BadgeBudgetStatusProps) => {
  if (budgetStatus === BudgetStatus.APPROVED) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className="border-[hsl(160,60%,45%)] bg-transparent font-bold text-[hsl(160,60%,45%)] hover:bg-accent">
              <CircleCheck size={13} className="mr-2" />
              Aprovado
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
