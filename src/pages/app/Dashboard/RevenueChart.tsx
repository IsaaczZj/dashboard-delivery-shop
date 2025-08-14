import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
const data = [
  { date: "13/12", revenue: 1200 },
  { date: "14/12", revenue: 1234 },
  { date: "15/12", revenue: 4333 },
  { date: "16/12", revenue: 999 },
  { date: "17/12", revenue: 678 },
  { date: "18/12", revenue: 235 },
  { date: "19/12", revenue: 7000 },
  { date: "19/12", revenue: 5000 },
  { date: "19/12", revenue: 6500 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-4">
        <div className="space-y-4">
          <CardTitle className="text-2xl font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="focus-within:outline-none">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            tabIndex={-1}
            data={data}
            className="text-md pointer-events-none"
          >
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={90}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="bumpX"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.rose[700]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
