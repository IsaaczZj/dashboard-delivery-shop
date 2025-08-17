import { api } from "@/lib/axios";
import type { SignUpForm } from "@/schemas/authSchemas";

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantRequest) {
  await api.post<RegisterRestaurantRequest>("/restaurants", {
    email,
    managerName,
    phone,
    restaurantName,
  });
}
