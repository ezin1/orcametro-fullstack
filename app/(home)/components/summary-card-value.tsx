import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { ReactNode } from "react";

interface SumaryCardValueProps {
  value: number;
  title: string;
  icon: ReactNode;
}

const SumaryCardValue = ({ value, title, icon }: SumaryCardValueProps) => {
  return (
    <Card className="flex w-[250px] flex-col shadow-sm shadow-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        {icon}
        <CardTitle className="text-start text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start justify-start">
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default SumaryCardValue;
