import * as React from "react";

import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/app/_lib/utils";

interface InputLabelInBorderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputLabelInBorder = React.forwardRef<
  HTMLInputElement,
  InputLabelInBorderProps
>(({ className, label, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <Input
        className={cn("pb-2 pl-[calc(1rem+2px)] pr-3 pt-6", className)}
        {...props}
        ref={ref}
      />
      <Label
        className="absolute left-3 top-0 bg-background px-1 text-xs text-muted-foreground"
        style={{ transform: "translateY(-50%)" }}
        htmlFor={props.id}
      >
        {label}
      </Label>
    </div>
  );
});
InputLabelInBorder.displayName = "InputLabelInBorder";

export { InputLabelInBorder };
