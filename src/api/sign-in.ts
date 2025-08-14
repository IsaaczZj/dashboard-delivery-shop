import { api } from "@/lib/axios";
import type { SignInForm } from "@/schemas/authSchemas";

export async function signIn({ email }: SignInForm) {
  await api.post("/authenticate", { email });
}
