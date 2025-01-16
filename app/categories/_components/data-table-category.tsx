"use client";
import { Input } from "@/app/_components/ui/input";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DataTable } from "@/app/_components/ui/data-table";
import { Categories } from "@prisma/client";
import { categoriesColumns } from "../_columns";
import { useEffect, useState } from "react";
import CreateCategoryButton from "./create-category-button";

interface dataTableCategoriesProps {
  categoriesTotal: Categories[];
}

const DataTableCategories = ({ categoriesTotal }: dataTableCategoriesProps) => {
  const [categories, setCategories] = useState<Categories[]>(categoriesTotal);

  const onFilterCategories = (value: string) => {
    const filteredCategories = categoriesTotal.filter((category) => {
      return category.name.toLowerCase().includes(value.toLowerCase());
    });
    if (value === "") {
      setCategories(categoriesTotal);
    }
    setCategories(filteredCategories);
  };

  useEffect(() => {
    setCategories(categoriesTotal);
  }, [categoriesTotal]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="Filtrar categorias..."
          onChange={(event) => onFilterCategories(event.target.value)}
          className="w-[70%]"
        />
        <CreateCategoryButton />
      </div>
      <ScrollArea className="h-[570px] lg:h-[600px] 2xl:h-[820px]">
        <DataTable
          columns={categoriesColumns}
          data={JSON.parse(JSON.stringify(categories))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableCategories;
