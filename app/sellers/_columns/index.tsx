"use client";
import { Button } from "@/app/_components/ui/button";
import { Sellers } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";
import SellerStatusBadge from "../_components/seller-status-badge";
import { DrawerEditSeller } from "../_components/drawer-edit-seller";

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
    cell: ({ row: { original: seller } }) => {
      return (
        <div className="flex flex-row space-x-1">
          <DrawerEditSeller sellerId={seller.sellerId} />
          <Button size="icon">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
