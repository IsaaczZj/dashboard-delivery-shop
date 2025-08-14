import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";
const data = [
  { products: "Peperoni", amount: 45 },
  { products: "Mussarela", amount: 40 },
  { products: "Frango", amount: 70 },
  { products: "Calabresa", amount: 33 },
  { products: "Baiana", amount: 56 },
];

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between space-y-4">
          <CardTitle className="text-2xl font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="text-muted-foreground size-5" />
        </div>
      </CardHeader>
      <CardContent className="focus-within:outline-none">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart className="text-md">
            <Pie
              data={data}
              dataKey="amount"
              nameKey="products"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={60}
              strokeWidth={4}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                index,
              }: {
                cx?: number;
                cy?: number;
                midAngle?: number;
                innerRadius?: number;
                outerRadius?: number;
                index?: number;
              }) => {
                if (
                  typeof index !== "number" ||
                  typeof cx !== "number" ||
                  typeof cy !== "number" ||
                  typeof midAngle !== "number" ||
                  typeof innerRadius !== "number" ||
                  typeof outerRadius !== "number"
                )
                  return null;
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) + 20;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-md"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {`${data[index].products.substring(0, 12)} - (${data[index].amount})`}
                  </text>
                );
              }}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                  className="stroke-[#18181b] hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
