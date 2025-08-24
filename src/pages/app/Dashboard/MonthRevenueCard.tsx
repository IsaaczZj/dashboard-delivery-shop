import { getMonthRevenue } from "@/api/store-dashboard/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ["metrics", "month-revenue"],
  });


  return (
    <Card>
      <CardHeader className="-mb-2 flex items-center justify-between">
        <CardTitle className="text-xl">Receita total (mês) </CardTitle>
        <DollarSign className="text-muted-foreground size-5" />
      </CardHeader>
      {monthRevenue ? (
        <CardContent className="flex flex-col gap-1">
          <span className="text-3xl font-semibold tracking-wide">
            {(monthRevenue.receipt / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          {monthRevenue?.diffFromLastMonth >= 0 ? (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-emerald-200 dark:text-emerald-400">
                  +{monthRevenue.diffFromLastMonth.toLocaleString("pt-BR")}%
                </span>{" "}
                em relação ao mês passado
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">
                <span className="text-rose-200 dark:text-rose-400">
                  {monthRevenue.diffFromLastMonth}%
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
