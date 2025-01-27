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
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="Filtrar produtos..."
          onChange={(event) => onFilterProducts(event.target.value)}
          className="w-[70%]"
        />
        <CreateProductButton />
      </div>
      <ScrollArea className="h-[570px] lg:h-[600px] 2xl:h-[820px]">
        <DataTable
          columns={productsColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableProducts;
