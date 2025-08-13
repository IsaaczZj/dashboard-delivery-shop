import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between -mb-2">
        <CardTitle className="text-xl">Receita total (mês) </CardTitle>
        <DollarSign className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-3xl font-semibold tracking-wide">R$12,400</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-emerald-200 dark:text-emerald-400">+2%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
