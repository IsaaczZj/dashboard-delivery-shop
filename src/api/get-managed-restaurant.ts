import { api } from "@/lib/axios";

export async function getManagerRestaurant() {
  const response = await api.get<GetManagerRestaurant>("/managed-restaurant");
  return response.data;
}
