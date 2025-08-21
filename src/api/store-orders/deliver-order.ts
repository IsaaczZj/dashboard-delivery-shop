import { api } from "@/lib/axios";

export async function deliverOrder({ orderId }: GetOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`);
}
