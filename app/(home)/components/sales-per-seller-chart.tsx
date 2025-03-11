"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { FormatCurrency } from "@/app/helpers/format-currency";
import { ChartColumnBig } from "lucide-react";

interface SalesPerSellerProps {
  salesPerSeller: {
    name: string | undefined;
    value: number | undefined;
  }[];
}

const SalesPerSeller = ({ salesPerSeller }: SalesPerSellerProps) => {
  // Ordenar os dados em ordem decrescente de valor
  const sortedData = [...salesPerSeller].sort(
    (a, b) => (b.value || 0) - (a.value || 0),
  );

  return (
    <Card className="flex w-[48%] flex-col p-3 shadow-sm shadow-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        <ChartColumnBig size={16} />
        <CardTitle className="text-start text-sm text-muted-foreground">
          Vendas por vendedor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <div className="h-[230px] w-full">
          {" "}
          {/* Ajustado para 230px para dar espaço para margens */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedData}
              margin={{ top: 10, right: 70, left: 10, bottom: 10 }}
            >
              <XAxis type="number" hide />{" "}
              {/* Escondemos o eixo X para economizar espaço */}
              <YAxis
                dataKey="name"
                type="category"
                width={80}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value.length > 12 ? `${value.slice(0, 12)}...` : value
                }
              />
              <Bar dataKey="value" fill="hsl(var(--primary))">
                <LabelList
                  dataKey="value"
                  position="right"
                  fontSize={12}
                  formatter={(value: string) => FormatCurrency(Number(value))}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerSeller;
