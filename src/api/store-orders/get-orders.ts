import { api } from "@/lib/axios";

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: 0,
    },
  });
  return response.data;
}
