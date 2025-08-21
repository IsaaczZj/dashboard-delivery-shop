import { api } from "@/lib/axios";

export async function dispatchOrder({ orderId }: GetOrderParams) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
