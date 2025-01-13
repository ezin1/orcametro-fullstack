"use client";

import * as React from "react";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/app/_lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  value: Date;
  onChange?: SelectSingleEventHandler;
  label?: string;
}

export const DatePicker = ({ value, onChange, label }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            "relative pt-4", // Added padding-top to accommodate the label
          )}
        >
          {label && (
            <span className="absolute left-3 top-0 -translate-y-1/2 bg-background px-1 text-xs font-semibold text-muted-foreground">
              {label}
            </span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            new Date(value).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Selecione uma data...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          locale={ptBR}
          captionLayout="dropdown-buttons"
          fromYear={1910}
          toYear={2100}
        />
      </PopoverContent>
    </Popover>
  );
};
