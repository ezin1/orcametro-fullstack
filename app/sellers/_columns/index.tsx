// "use client";
// import { Button } from "@/app/_components/ui/button";
// import { Users } from "@prisma/client";
// import { ColumnDef } from "@tanstack/react-table";
// import {PencilIcon, TrashIcon} from "lucide-react";
// export const sellersColumns: ColumnDef<Users>[] = [
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row: { original: transaction } }) => (
//         <TransactionTypeBadge transaction={transaction} />
//       ),
//     },
//   {
//     accessorKey: "name",
//     header: "Nome",
//   },
//   {
//     accessorKey: "actions",
//     header: "Ações",
//     cell: ({ row: { original: seller } }) => {
//       return (
//         <div className="space-x-1">
//             <Button><PencilIcon/></Button>
//             <Button><TrashIcon /></Button>
//         </div>
//       );
//     },
//   },
// ];
