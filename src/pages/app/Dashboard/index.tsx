
import { MonthRevenueCard } from "./MonthRevenueCard";
import { MonthOrdersAmountCard } from "./MonthOrdersAmountCard";
import { DayOrdersAmountCard } from "./DayOrdersAmountCard";
import { MonthCanceledAmountCard } from "./MonthCanceledAmountCard";
import { RevenueChart } from "./RevenueChart";
import { PopularProductsChart } from "./PopularProdutcsChart";

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
      <div className="grid grid-cols-9 gap-4">
        <RevenueChart />
        <PopularProductsChart/>
      </div>
    </div>
  );
}
