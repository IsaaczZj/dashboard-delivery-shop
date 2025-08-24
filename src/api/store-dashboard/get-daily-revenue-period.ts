import { api } from "@/lib/axios";

export async function getDailyRevenuePeriod({
  to,
  from,
}: GetDailyRevenuePeriodQuery) {
  const response = await api.get<GetDailyRevenueResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    },
  );
  return response.data;
}
