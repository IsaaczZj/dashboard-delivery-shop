import { api } from "@/lib/axios";

export async function getMonthRevenue() {
  const response = await api.get<GetMonthOrdersRevenueResponse>(
    "/metrics/month-receipt",
  );
  return response.data;
}
