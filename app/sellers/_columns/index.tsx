"use client";
import { Button } from "@/app/_components/ui/button";
import { Sellers } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import SellerStatusBadge from "../_components/seller-status-badge";

export const sellersColumns: ColumnDef<Sellers>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: seller } }) => (
      <SellerStatusBadge seller={seller} />
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({}) => {
      return (
        <div className="flex flex-row space-x-1">
          <Button size="icon">
            <PencilIcon />
          </Button>
          <Button size="icon">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
