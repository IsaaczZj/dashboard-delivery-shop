import { api } from "@/lib/axios";

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );
  return response.data;
}
