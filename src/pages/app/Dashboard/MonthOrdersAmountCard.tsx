import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function MonthOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between -mb-2">
        <CardTitle className="text-xl">Pedidos (mês) </CardTitle>
        <Utensils className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-3xl font-semibold tracking-wide">250</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-emerald-200 dark:text-emerald-400">+6%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
