import { getDayOrdersAmount } from "@/api/store-dashboard/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./MetricCardSkeleton";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="-mb-2 flex items-center justify-between">
        <CardTitle className="text-xl">Pedidos (dia) </CardTitle>
        <Utensils className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-3xl font-semibold tracking-wide">
              {dayOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>

            {dayOrdersAmount.diffFromYesterday >= 0 ? (
              <p className="text-muted-foreground text-sm">
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dayOrdersAmount.diffFromYesterday}%
                </span>{" "}
                em relação a ontem
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                <span className="text-rose-500 dark:text-rose-400">
                  {dayOrdersAmount.diffFromYesterday}%
                </span>{" "}
                em relação a ontem
              </p>
            )}
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
