// "use client";
// import { Input } from "@/app/_components/ui/input";
// import { ScrollArea } from "@/app/_components/ui/scroll-area";
// import { DataTable } from "@/app/_components/ui/data-table";
// import { Budgets } from "@prisma/client";
// import { budgetsColumns } from "../_columns";
// import { useEffect, useState } from "react";
// import CreateProductButton from "./create-budget-button";
// import CreateBudgetButton from "./create-budget-button";

// interface dataTableBudgetsProps {
//   budgetsTotal: Budgets[];
// }

// const DataTableBudgets = ({ budgetsTotal }: dataTableBudgetsProps) => {
//   const [budgets, setBudgets] = useState<Budgets[]>(budgetsTotal);

//   const onFilterBudgets = (value: string) => {
//     const filteredBudgets = budgetsTotal.filter((budget) => {
//       return budget.clientName.toLowerCase().includes(value.toLowerCase());
//     });
//     if (value === "") {
//       setBudgets(budgetsTotal);
//     }
//     setBudgets(filteredBudgets);
//   };

//   useEffect(() => {
//     setBudgets(budgetsTotal);
//   }, [budgetsTotal]);

//   return (
//     <>
//       <div className="flex w-full items-center justify-between">
//         <Input
//           placeholder="Filtrar orçamentos..."
//           onChange={(event) => onFilterBudgets(event.target.value)}
//           className="w-[70%]"
//         />
//         {/* <CreateBudgetButton /> */}
//       </div>
//       <ScrollArea className="h-[570px] lg:h-[600px] 2xl:h-[820px]">
//         <DataTable
//           columns={budgetsColumns}
//           data={JSON.parse(JSON.stringify(budgets))}
//         />
//       </ScrollArea>
//     </>
//   );
// };

// export default DataTableBudgets;
