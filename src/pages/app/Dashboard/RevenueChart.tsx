import "react-day-picker/style.css";
import { getDailyRevenuePeriod } from "@/api/store-dashboard/get-daily-revenue-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR as ptbr } from "react-day-picker/locale";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import { Calendar, Receipt, X } from "lucide-react";
import { toast } from "sonner";

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { data: dailyRevenuePeriod } = useQuery({
    queryFn: () =>
      getDailyRevenuePeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ["metrics", "daily-revenue-period", dateRange],
  });

  function formatDateRange(dateRange: DateRange | undefined) {
    if (!dateRange?.from) return "Quando";
    if (!dateRange.to) {
      return format(dateRange.from, "d'de' LLLL", { locale: ptBR });
    }
    const formatedDate = `${format(dateRange.from, "d 'de' LLLL", {
      locale: ptBR,
    })} à ${format(dateRange.to, "d 'de' LLLL", { locale: ptBR })}`;

    return formatedDate;
  }

  const chartData = useMemo(() => {
    return dailyRevenuePeriod?.map((chartItem) => {
      return {
        ...chartItem,
        receipt: chartItem.receipt / 100,
      };
    });
  }, [dailyRevenuePeriod]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-4">
        <div className="space-y-4">
          <CardTitle className="text-2xl font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label className="text-xl">Período</Label>
          <button
            className="flex cursor-pointer gap-4 rounded-lg border border-zinc-700 bg-transparent p-4 hover:opacity-80"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <Calendar />
            {formatDateRange(dateRange)}
          </button>

          <div>
            {isDatePickerOpen && (
              <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-4">
                <div className="flex w-full max-w-[350px] flex-col items-center justify-center rounded-xl bg-zinc-900 px-4 py-5">
                  <div className="mb-4 flex w-full justify-end">
                    <button
                      className="cursor-pointer text-zinc-400 hover:text-zinc-200"
                      onClick={() => setIsDatePickerOpen(false)}
                    >
                      <X />
                    </button>
                  </div>
                  <div>
                    <DayPicker
                      mode="range"
                      locale={ptbr}
                      classNames={{
                        month_caption: "text-zinc-100 font-semibold mb-4",
                        chevron: "fill-zinc-400",
                        weekday: "uppercase font-medium text-xs",
                        day: "text-zinc-300 hover:bg-zinc-700 rounded-lg transition-colors",
                        caption_label: "uppercase",
                        today: "border border-purple-300",
                        selected:
                          "bg-purple-300 text-purple-950 font-semibold hover:bg-purple-400",
                        disabled: "text-zinc-300 cursor-not-allowed",
                        range_end: "bg-purple-700",
                        range_start: "bg-purple-700",
                        range_middle: "bg-purple-700",
                      }}
                      selected={dateRange}
                      onSelect={setDateRange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="focus-within:outline-none">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            tabIndex={-1}
            data={chartData}
            className="text-md pointer-events-none"
          >
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={90}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="bumpX"
              strokeWidth={2}
              dataKey="receipt"
              stroke={colors.rose[700]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
