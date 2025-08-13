import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="-mb-2 flex items-center justify-between">
        <CardTitle className="text-xl">Pedidos (dia) </CardTitle>
        <Utensils className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-3xl font-semibold tracking-wide">10</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-rose-200 dark:text-rose-400">-4%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
