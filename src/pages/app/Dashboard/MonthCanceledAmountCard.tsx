import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban } from "lucide-react";

export function MonthCanceledAmountCard() {
  return (
    <Card>
      <CardHeader className="-mb-2 flex items-center justify-between">
        <CardTitle className="text-xl">Cacelamentos (mês) </CardTitle>
        <Ban className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-3xl font-semibold tracking-wide">18</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-emerald-200 dark:text-emerald-400">-4%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
