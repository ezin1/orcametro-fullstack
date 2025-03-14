import type React from "react";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";

interface LabeledInfoProps {
  label: string;
  content: string;
  labelColor?: string;
  contentColor?: string;
  className?: string;
}

export const LabeledInfo: React.FC<LabeledInfoProps> = ({
  label,
  content,
  labelColor = "text-primary",
  contentColor = "text-foreground",
  className = "",
}) => {
  const isObservacoes = label === "Observações";

  return (
    <Card
      className={`relative px-2 pb-2 pt-3 sm:px-4 sm:pb-3 sm:pt-4 ${className} w-full sm:w-auto`}
    >
      <div className="absolute -top-2 left-2 bg-background px-1 sm:-top-3 sm:left-3 sm:px-2">
        <span className={`text-xs font-medium sm:text-sm ${labelColor}`}>
          {label}
        </span>
      </div>

      {isObservacoes ? (
        <ScrollArea className="h-[120px] w-full">
          <div className="pr-4">
            <p
              className={`sm:text-md text-sm ${contentColor} select-text break-all`}
              style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
            >
              {content}
            </p>
          </div>
        </ScrollArea>
      ) : (
        <p
          className={`sm:text-md text-sm ${contentColor} select-text break-words`}
        >
          {content}
        </p>
      )}
    </Card>
  );
};
