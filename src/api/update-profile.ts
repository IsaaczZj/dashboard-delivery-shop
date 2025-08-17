import { api } from "@/lib/axios";

export async function updateProfile({ name, description }: UpdateProfile) {
  await api.put("/profile", { name, description });
}
