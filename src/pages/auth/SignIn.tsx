import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signInForm = z.object({
  email: z.email("Digite um email válido"),
});
type SignInForm = z.infer<typeof signInForm>;
export function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({ resolver: zodResolver(signInForm) });

  async function handleLogin(data: SignInForm) {
    try {
      toast.success("Enviamos um link de autenticação para seu email");
    } catch (error) {
      // toast.error("Credenciais inválidas")
    }
    console.log(data);
  }
  return (
    <div className="p-8">
      <div className="flex w-[450px] flex-col justify-center gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-muted-foreground text-lg">
            Acompanhe suas vendas e informações pelo painel
          </p>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-email</Label>
            <Input id="email" type="" {...register("email")} />
            {errors.email?.message && (
              <p className="text-center text-red-700">Email inválido</p>
            )}
          </div>
          <Button
            type="submit"
            className="h-11 w-full cursor-pointer"
            disabled={isSubmitting}
          >
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
