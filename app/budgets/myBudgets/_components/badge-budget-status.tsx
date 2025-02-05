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
const BadgeBudgetStatus = ({
  budgetStatus,
  updatedAt,
  expirationDate,
}: BadgeBudgetStatusProps) => {
  if (budgetStatus === BudgetStatus.APPROVED) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="border-[hsl(160,60%,45%)] bg-transparent font-bold text-[hsl(160,60%,45%)] hover:bg-accent">
              <CircleCheck size={13} className="mr-2" />
              Aprovado
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>
                Aprovado em {new Date(updatedAt).toLocaleDateString("pt-BR")} às{" "}
                {new Date(updatedAt).toLocaleTimeString("pt-BR")}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  if (budgetStatus === BudgetStatus.PENDING) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="border-foreground bg-transparent font-bold text-foreground hover:bg-accent">
              <Clock size={13} className="mr-2" />
              Pendente
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>
                Expira em {new Date(expirationDate).toLocaleDateString("pt-BR")}{" "}
                às {new Date(expirationDate).toLocaleTimeString("pt-BR")}
                <br />
                Dias restantes:{" "}
                {Math.floor(
                  (new Date(expirationDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                )}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  if (budgetStatus === BudgetStatus.REJECTED) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="border-destructive bg-transparent font-bold text-destructive hover:bg-accent">
              <CircleX size={13} className="mr-2" />
              Cancelado
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>
                Cancelado em {new Date(updatedAt).toLocaleDateString("pt-BR")}{" "}
                às {new Date(updatedAt).toLocaleTimeString("pt-BR")}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
};

export default BadgeBudgetStatus;
