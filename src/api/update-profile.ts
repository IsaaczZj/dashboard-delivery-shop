import { api } from "@/lib/axios";

export async function updateProfile({ name, description }: UpdateProfileRequest) {
  await api.put("/profile", { name, description });
}
