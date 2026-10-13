"use client";
import { Input } from "@/app/_components/ui/input";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DataTable } from "@/app/_components/ui/data-table";
import { Budgets } from "@prisma/client";
import { budgetsColumns } from "../_columns";
import { useEffect, useState } from "react";

interface dataTableBudgetsProps {
  budgetsTotal: Budgets[];
}

const DataTableBudgets = ({ budgetsTotal }: dataTableBudgetsProps) => {
  const [budgets, setBudgets] = useState<Budgets[]>(budgetsTotal);

  const onFilterBudgets = (value: string) => {
    const filteredBudgets = budgetsTotal.filter((budget) => {
      return budget.clientName.toLowerCase().includes(value.toLowerCase());
    });
    if (value === "") {
      setBudgets(budgetsTotal);
    }
    setBudgets(filteredBudgets);
  };

  useEffect(() => {
    setBudgets(budgetsTotal);
  }, [budgetsTotal]);

  return (
    <>
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <Input
          placeholder="Filtrar orçamentos..."
          onChange={(event) => onFilterBudgets(event.target.value)}
          className="w-full sm:w-[70%]"
        />
        {/* <CreateBudgetButton /> */}
      </div>
      <ScrollArea className="h-full min-h-0 w-full flex-1">
        <DataTable
          columns={budgetsColumns}
          data={JSON.parse(JSON.stringify(budgets))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableBudgets;
