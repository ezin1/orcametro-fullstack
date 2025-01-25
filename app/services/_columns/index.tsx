"use client";
import { Services } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DrawerUpsertServices } from "../_components/drawer-upsert-service";
import DeleteServiceButton from "../_components/delete-service-button";

export const servicesColumns: ColumnDef<Services>[] = [
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
    cell: ({ row: { original: service } }) => (
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(service.value))}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: services } }) => {
      return (
        <div className="flex flex-row space-x-1">
          <DrawerUpsertServices
            service={{ ...services, value: Number(services.value) }}
            isUpdate={true}
          />
          <DeleteServiceButton id={services.id} />
        </div>
      );
    },
  },
];
