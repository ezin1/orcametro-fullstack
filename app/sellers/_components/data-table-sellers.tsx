"use client";
import { Input } from "@/app/_components/ui/input";
import CreateSellerButton from "./register-seller-button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DataTable } from "@/app/_components/ui/data-table";
import { Sellers } from "@prisma/client";
import { sellersColumns } from "../_columns";
import { useEffect, useState } from "react";

interface dataTableSellersProps {
  sellersTotal: Sellers[];
}

const DataTableSellers = ({ sellersTotal }: dataTableSellersProps) => {
  const [sellers, setSellers] = useState<Sellers[]>(sellersTotal);

  const onFilterSellers = (value: string) => {
    const filteredSellers = sellersTotal.filter((seller) => {
      return seller.name.toLowerCase().includes(value.toLowerCase());
    });
    if (value === "") {
      setSellers(sellersTotal);
    }
    setSellers(filteredSellers);
  };

  useEffect(() => {
    setSellers(sellersTotal);
  }, [sellersTotal]);

  return (
    <>
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <Input
          placeholder="Filtrar vendedores..."
          onChange={(event) => onFilterSellers(event.target.value)}
          className="flex-1 sm:w-[70%] sm:flex-none"
        />
        <CreateSellerButton />
      </div>
      <ScrollArea className="h-full min-h-0 w-full flex-1">
        <DataTable
          columns={sellersColumns}
          data={JSON.parse(JSON.stringify(sellers))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableSellers;
