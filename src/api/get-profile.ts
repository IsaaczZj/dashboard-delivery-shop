import { api } from "@/lib/axios";

export async function getProfile() {
  const response = await api.get<ProfileRespose>("/me");
  return response.data;
}
