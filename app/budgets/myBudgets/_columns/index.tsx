"use client";
import { Budgets } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
// import { DrawerUpsertProducts } from "../_components/drawer-upsert-product";
import DeleteBudgetButton from "../_components/delete-budget-button";
import BadgeBudgetType from "@/app/budgets/myBudgets/_components/badge-budget-type";
import BadgeBudgetStatus from "../_components/badge-budget-status";
import { DrawerViewBudgetInfo } from "../_components/drawer-view-budget-info";

export const budgetsColumns: ColumnDef<Budgets>[] = [
  {
    accessorKey: "budgetStatus",
    header: "Status",
    cell: ({ row: { original: budget } }) => {
      return (
        <div>
          <BadgeBudgetStatus budgetStatus={budget.budgetStatus} />
        </div>
      );
    },
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row: { original: product } }) => (
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(product.value))}
      </span>
    ),
  },
  {
    accessorKey: "budgetType",
    header: "Tipo",
    cell: ({ row: { original: budget } }) => {
      return (
        <div>
          <BadgeBudgetType budgetType={budget.budgetType} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: budget } }) => {
      return (
        <div className="flex flex-row space-x-1">
          <DrawerViewBudgetInfo
            budget={{ ...budget, value: Number(budget.value) }}
          />
          <DeleteBudgetButton id={budget.id} />
        </div>
      );
    },
  },
];
