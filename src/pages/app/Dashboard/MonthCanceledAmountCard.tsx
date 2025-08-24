import { getMonthCanceledOrdersAmount } from "@/api/store-dashboard/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Ban } from "lucide-react";

export function MonthCanceledAmountCard() {
  const { data: monthCanceledAmount } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ["metrics", "month-canceled-amount"],
  });

  return (
    <Card>
      <CardHeader className="-mb-2 flex items-center justify-between">
        <CardTitle className="text-xl">Cacelamentos (mês) </CardTitle>
        <Ban className="text-muted-foreground size-5" />
      </CardHeader>
      {monthCanceledAmount ? (
        <CardContent className="flex flex-col gap-1">
          <span className="text-3xl font-semibold tracking-wide">
            {monthCanceledAmount.amount}
          </span>
          {monthCanceledAmount?.diffFromLastMonth < 0 ? (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-emerald-200 dark:text-emerald-400">
                  -
                  {monthCanceledAmount.diffFromLastMonth.toLocaleString(
                    "pt-BR",
                  )}
                  %
                </span>{" "}
                em relação ao mês passado
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-rose-200 dark:text-rose-400">
                  +{monthCanceledAmount.diffFromLastMonth}%
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
