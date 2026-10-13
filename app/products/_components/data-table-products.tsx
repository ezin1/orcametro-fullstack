"use client";
import { Input } from "@/app/_components/ui/input";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DataTable } from "@/app/_components/ui/data-table";
import { Products } from "@prisma/client";
import { productsColumns } from "../_columns";
import { useEffect, useState } from "react";
import CreateProductButton from "./create-product-button";

interface dataTableProductsProps {
  productsTotal: Products[];
}

const DataTableProducts = ({ productsTotal }: dataTableProductsProps) => {
  const [products, setProducts] = useState<Products[]>(productsTotal);

  const onFilterProducts = (value: string) => {
    const filteredProducts = productsTotal.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });
    if (value === "") {
      setProducts(productsTotal);
    }
    setProducts(filteredProducts);
  };

  useEffect(() => {
    setProducts(productsTotal);
  }, [productsTotal]);

  return (
    <>
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <Input
          placeholder="Filtrar produtos..."
          onChange={(event) => onFilterProducts(event.target.value)}
          className="flex-1 sm:w-[70%] sm:flex-none"
        />
        <CreateProductButton />
      </div>
      <ScrollArea className="h-full min-h-0 w-full flex-1">
        <DataTable
          columns={productsColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableProducts;
