import { getMonthOrdersAmount } from "@/api/store-dashboard/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ["metrics", "month-orders-amount"],
  });
  return (
    <Card>
      <CardHeader className="-mb-2 flex items-center justify-between">
        <CardTitle className="text-xl">Pedidos (mês) </CardTitle>
        <Utensils className="text-muted-foreground size-5" />
      </CardHeader>
      {monthOrdersAmount ? (
        <CardContent className="flex flex-col gap-1">
          <span className="text-3xl font-semibold tracking-wide">
            {monthOrdersAmount?.amount}
          </span>
          {monthOrdersAmount?.diffFromLastMonth >= 0 ? (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-emerald-200 dark:text-emerald-400">
                  +{monthOrdersAmount.diffFromLastMonth.toLocaleString("pt-BR")}
                  %
                </span>{" "}
                em relação ao mês passado
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-rose-200 dark:text-rose-400">
                  {monthOrdersAmount.diffFromLastMonth}%
                </span>{" "}
                em relação ao mês passado
              </p>
            </>
          )}
        </CardContent>
      ) : null}
    </Card>
  );
}
