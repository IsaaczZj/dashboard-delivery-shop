import { api } from "@/lib/axios";

export async function approveOrder({ orderId }: GetOrderParams) {
  await api.patch(`/orders/${orderId}/approve`);
}
