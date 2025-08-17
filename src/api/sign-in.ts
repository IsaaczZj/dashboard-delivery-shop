import { api } from "@/lib/axios";

export async function signIn({ email }: LoginRequest) {
  await api.post<LoginRequest>("/authenticate", { email });
}
