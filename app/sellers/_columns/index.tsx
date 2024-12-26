"use client";
import { Sellers } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import SellerStatusBadge from "../_components/seller-status-badge";
import { DrawerUpsertSeller } from "../_components/drawer-upsert-seller";
import DeleteSellerButton from "../_components/delete-seller-button";

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
          <DrawerUpsertSeller seller={seller} isUpdate={true} />
          <DeleteSellerButton sellerId={seller.sellerId} />
        </div>
      );
    },
  },
];
