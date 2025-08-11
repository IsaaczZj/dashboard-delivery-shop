import z from "zod";

export const signInForm = z.object({
  email: z.email("Digite um email válido"),
});
export type SignInForm = z.infer<typeof signInForm>;


export const signUpForm = z.object({
  email: z.email("Digite um email válido"),
  restaurantName: z
    .string()
    .min(5, "O restaurante precisa ter no mínimo 5 caracteres"),
  managerName: z.string().min(5, "Seu nome precisa ter no mínimo 5 caracteres"),
  phone: z.string(),
});
export type SignUpForm = z.infer<typeof signUpForm>;