import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { FormatCurrency } from "@/app/helpers/format-currency";
import { ReactNode } from "react";

interface SumaryCardMoneyProps {
  value: number;
  title: string;
  icon: ReactNode;
}

const SumaryCardMoney = ({ value, title, icon }: SumaryCardMoneyProps) => {
  return (
    <Card className="flex w-[250px] flex-col shadow-sm shadow-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        {icon}
        <CardTitle className="text-start text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-start flex items-start">
        <p className="text-2xl font-bold">{FormatCurrency(value)}</p>
      </CardContent>
    </Card>
  );
};

export default SumaryCardMoney;
