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
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="Filtrar vendedores..."
          onChange={(event) => onFilterSellers(event.target.value)}
          className="w-[70%]"
        />
        <CreateSellerButton />
      </div>
      <ScrollArea className="h-[570px] lg:h-[600px] 2xl:h-[820px]">
        <DataTable
          columns={sellersColumns}
          data={JSON.parse(JSON.stringify(sellers))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableSellers;
