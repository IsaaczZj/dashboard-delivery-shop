import { api } from "@/lib/axios";

export async function getOrder({ orderId }: GetOrderParams) {
  const response = await api.get<GetOrderResponse>(`/orders/${orderId}`);
  return response.data;
}
