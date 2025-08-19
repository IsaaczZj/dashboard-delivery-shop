import { signIn } from "@/api/profile-store/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInForm, type SignInForm } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";

export function SignIn() {
  const { state } = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: state?.email ?? "",
    },
  });

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Bem vindo, link de acesso enviado por e-mail");
    },
    onError: () => {
      toast.error("Credenciais inválidas");
    },
  });

  async function handleLogin(data: SignInForm) {
    await authenticate({ email: data.email });
  }
  return (
    <div className="p-8">
      <Button
        asChild
        className="absolute top-8 right-8 text-xl font-semibold"
        variant="ghost"
      >
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>
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
            <Input id="email" type="email" {...register("email")} />
            {errors.email?.message && (
              <p className="text-center text-red-700">Email inválido</p>
            )}
          </div>
          <Button
            type="submit"
            className="h-11 w-full cursor-pointer"
            disabled={isPending}
          >
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
