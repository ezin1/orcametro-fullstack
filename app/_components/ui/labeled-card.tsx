import * as React from "react";
import { cn } from "@/app/_lib/utils";
import { Card, CardContent } from "./card";

interface LabeledCardProps {
  label: string;
  labelClassName?: string;
  contentClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const LabeledCard = React.forwardRef<HTMLDivElement, LabeledCardProps>(
  (
    { className, label, labelClassName, contentClassName, children, ...props },
    ref,
  ) => {
    return (
      <Card ref={ref} className={cn("relative pt-4", className)} {...props}>
        <div className="absolute -top-3 left-4 bg-background px-2">
          <span
            className={cn(
              "text-sm font-medium text-foreground",
              labelClassName,
            )}
          >
            {label}
          </span>
        </div>
        <CardContent className={cn("pt-2", contentClassName)}>
          {children}
        </CardContent>
      </Card>
    );
  },
);

LabeledCard.displayName = "LabeledCard";
