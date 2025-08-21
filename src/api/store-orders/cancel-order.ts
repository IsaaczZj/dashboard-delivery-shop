import { api } from "@/lib/axios";

export async function cancelOrder({ orderId }: GetOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`);
}
