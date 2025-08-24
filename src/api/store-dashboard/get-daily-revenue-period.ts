import { api } from "@/lib/axios";

export async function getDailyRevenuePeriod() {
  const response = await api.get<GetDailyRevenueResponse>(
    "/metrics/daily-receipt-in-period",
  );
  return response.data;
}
