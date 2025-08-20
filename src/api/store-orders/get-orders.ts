import { api } from "@/lib/axios";

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });
  return response.data;
}
