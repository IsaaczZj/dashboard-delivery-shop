import { api } from "@/lib/axios";
import type { SignUpForm } from "@/schemas/authSchemas";
import axios from "axios";

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: SignUpForm) {
  await api.post("/restaurants", {
    email,
    managerName,
    phone,
    restaurantName,
  });
}
