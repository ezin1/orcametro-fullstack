"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/_lib/utils";
import { Label } from "./label";

interface SelectLabelInBorderProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

const SelectLabelInBorder = React.forwardRef<
  HTMLButtonElement,
  SelectLabelInBorderProps
>(
  (
    {
      className,
      label,
      error,
      errorMessage,
      children,
      onValueChange,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        <SelectPrimitive.Root
          onValueChange={onValueChange}
          defaultValue={defaultValue}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "pb-2 pl-[calc(1rem+2px)] pr-3 pt-6",
              error && "border-destructive focus:ring-destructive",
              className,
            )}
            {...props}
          >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Trigger>
          <Label
            className={cn(
              "absolute left-3 top-0 bg-background px-1 text-xs text-primary",
              error ? "text-destructive" : "text-muted-foreground",
            )}
            style={{ transform: "translateY(-50%)" }}
          >
            {label}
          </Label>
          {error && errorMessage && (
            <p className="mt-1 text-sm text-destructive">{errorMessage}</p>
          )}
        </SelectPrimitive.Root>
      </div>
    );
  },
);
SelectLabelInBorder.displayName = "SelectLabelInBorder";

export { SelectLabelInBorder };
