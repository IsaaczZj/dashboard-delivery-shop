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
import { useState } from "react";

import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR as ptbr } from "react-day-picker/locale";
import { format } from "date-fns";
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
import { Calendar, X } from "lucide-react";

export function RevenueChart() {
  const [day, setDay] = useState<DateRange | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { data: dailyRevenuePeriod } = useQuery({
    queryFn: getDailyRevenuePeriod,
    queryKey: ["metrics", "daily-revenue-period"],
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
            {formatDateRange(day)}
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
                        today: "border border-lime-300",
                        selected:
                          "bg-lime-300 text-lime-950 font-semibold hover:bg-lime-400",
                        disabled: "text-zinc-300 cursor-not-allowed",
                        range_end: "bg-lime-700",
                        range_start: "bg-lime-700",
                        range_middle: "bg-lime-700",
                      }}
                      selected={day}
                      onSelect={setDay}
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
            data={dailyRevenuePeriod}
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
