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

// const COLORS = {

// }

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
              
            >
              {data.map((_,i )=>(
                <Cell key={i} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
