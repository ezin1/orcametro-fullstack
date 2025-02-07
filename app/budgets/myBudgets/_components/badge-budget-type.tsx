import { Badge } from "@/app/_components/ui/badge";
import { BudgetType } from "@prisma/client";
import { Box, CircleIcon, Wrench } from "lucide-react";

interface BadgeBudgetTypeProps {
  budgetType: BudgetType;
}
const BadgeBudgetType = ({ budgetType }: BadgeBudgetTypeProps) => {
  if (budgetType === BudgetType.HYBRID) {
    return (
      <Badge className="bg-danger text-danger hover:bg-danger border-foreground bg-opacity-10 font-bold hover:bg-accent">
        <CircleIcon size={13} className="mr-2" />
        Hibrido
      </Badge>
    );
  }
  if (budgetType === BudgetType.PRODUCT) {
    return (
      <Badge className="bg-[hsl(224.3,76.3%,48%)] font-bold text-white hover:bg-[hsl(224.3,76.3%,38%)]">
        <Box size={13} className="mr-2" />
        Produto
      </Badge>
    );
  }
  if (budgetType === BudgetType.SERVICE) {
    return (
      <Badge className="bg-[hsl(188,86%,53%)] font-bold text-foreground hover:bg-[hsl(188,86%,43%)]">
        <Wrench size={13} className="mr-2" />
        Serviço
      </Badge>
    );
  }
};

export default BadgeBudgetType;
