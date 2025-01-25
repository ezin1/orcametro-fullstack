"use client";
import { Input } from "@/app/_components/ui/input";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DataTable } from "@/app/_components/ui/data-table";
import { Services } from "@prisma/client";
import { servicesColumns } from "../_columns";
import { useEffect, useState } from "react";
import CreateServiceButton from "./create-service-button";

interface dataTableServicesProps {
  servicesTotal: Services[];
}

const DataTableServices = ({ servicesTotal }: dataTableServicesProps) => {
  const [services, setServices] = useState<Services[]>(servicesTotal);

  const onFilterServices = (value: string) => {
    const filteredServices = servicesTotal.filter((service) => {
      return service.name.toLowerCase().includes(value.toLowerCase());
    });
    if (value === "") {
      setServices(servicesTotal);
    }
    setServices(filteredServices);
  };

  useEffect(() => {
    setServices(servicesTotal);
  }, [servicesTotal]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="Filtrar serviços..."
          onChange={(event) => onFilterServices(event.target.value)}
          className="w-[70%]"
        />
        <CreateServiceButton />
      </div>
      <ScrollArea className="h-[570px] lg:h-[600px] 2xl:h-[820px]">
        <DataTable
          columns={servicesColumns}
          data={JSON.parse(JSON.stringify(services))}
        />
      </ScrollArea>
    </>
  );
};

export default DataTableServices;
