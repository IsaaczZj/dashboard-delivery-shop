import z from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(4, { error: "O nome precisa ter no mínimo 4 caracteres" }),
  description: z
    .string()
    .min(8, { error: "A descrição precisa ter no mínimo 8 caracteres" }),
});
export type UpdateProfileT = z.infer<typeof updateProfileSchema>;
