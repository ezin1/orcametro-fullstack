import * as React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/app/_lib/utils";

export interface InputLabelInBorderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

const InputLabelInBorder = React.forwardRef<
  HTMLInputElement,
  InputLabelInBorderProps
>(({ className, label, error, errorMessage, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <Input
        className={cn(
          "pb-2 pl-[calc(1rem+2px)] pr-3 pt-6",
          error && "border-destructive focus:border-destructive",
          className,
        )}
        {...props}
        ref={ref}
      />
      <Label
        className={cn(
          "absolute left-3 top-0 bg-background px-1 text-xs",
          error ? "text-destructive" : "text-muted-foreground",
        )}
        style={{ transform: "translateY(-50%)" }}
        htmlFor={props.id}
      >
        {label}
      </Label>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
});
InputLabelInBorder.displayName = "InputLabelInBorder";

export { InputLabelInBorder };
