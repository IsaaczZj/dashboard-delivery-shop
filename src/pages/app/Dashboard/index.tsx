import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { MonthRevenueCard } from "./MonthRevenueCard";
import { MonthOrdersAmountCard } from "./MonthOrdersAmountCard";
import { DayOrdersAmountCard } from "./DayOrdersAmountCard";
import { MonthCanceledAmountCard } from "./MonthCanceledAmountCard";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-wide">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledAmountCard />
      </div>
      di
    </div>
  );
}
