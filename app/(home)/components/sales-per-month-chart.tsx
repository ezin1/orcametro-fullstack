/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { FormatCurrency } from "@/app/helpers/format-currency";
import { LineChartIcon } from "lucide-react";

interface SalesPerMonthProps {
  salesPerMonth: {
    month: string;
    totalSales: number;
    count: number;
  }[];
}

const SalesPerMonth = ({ salesPerMonth }: SalesPerMonthProps) => {
  // Ordenar os dados em ordem cronológica (assumindo que os meses estão em português)
  const monthOrder = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const sortedData = [...salesPerMonth].sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
  );

  // Componente personalizado para o tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border border-border bg-background p-2 shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary">
            Faturamento: {FormatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-[hsl(188,86%,53%)]">
            Vendas: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Função personalizada para renderizar a legenda
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="mt-2 flex items-center justify-center text-xs">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="mx-2 flex items-center">
            <div
              className="mr-1 h-3 w-3"
              style={{ backgroundColor: entry.color }}
            />
            <span>
              {entry.value === "totalSales"
                ? "Faturamento"
                : entry.value === "count"
                  ? "Vendas"
                  : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="flex w-[48%] flex-col p-3 shadow-sm shadow-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        <LineChartIcon size={16} />
        <CardTitle className="text-start text-sm text-muted-foreground">
          Faturamento e Vendas por mês
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <div className="h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sortedData}
              margin={{ top: 10, right: 30, left: 10, bottom: 30 }} // Aumentei a margem inferior para a legenda
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value.slice(0, 3).charAt(0).toUpperCase() + value.slice(1, 3)
                }
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => FormatCurrency(value).slice(0, -3)}
                width={60}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={renderLegend}
                verticalAlign="bottom"
                height={1}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="totalSales"
                name="Faturamento"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="count"
                name="Vendas"
                stroke="hsl(188,86%,53%)"
                fill="hsl(188,86%,53%)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerMonth;
