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
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="flex flex-row justify-end space-x-1">
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
