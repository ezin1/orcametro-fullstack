"use client";
import { Products } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import DeleteProductButton from "../_components/delete-product-button";
import { DrawerUpsertProducts } from "../_components/drawer-upsert-product";

export const productsColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Nome",
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
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: product } }) => {
      return (
        <div className="flex flex-row space-x-1">
          <DrawerUpsertProducts
            product={{ ...product, value: Number(product.value) }}
            isUpdate={true}
          />
          <DeleteProductButton id={product.id} />
        </div>
      );
    },
  },
];
