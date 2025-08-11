import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const signUpForm = z.object({
  email: z.email("Digite um email válido"),
  restaurantName: z
    .string()
    .min(5, "O restaurante precisa ter no mínimo 5 caracteres"),
  managerName: z.string().min(5, "Seu nome precisa ter no mínimo 5 caracteres"),
  phone: z.string(),
});
type SignUpForm = z.infer<typeof signUpForm>;
export function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpForm) });

  const navigate = useNavigate();
  async function handleLogin(data: SignUpForm) {
    try {
      toast.success("Restaurante cadastrado com sucesso");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
    }
    console.log(data);
  }
  return (
    <div className="p-8">
      <Button
        asChild
        className="absolute top-8 right-8 text-xl font-semibold"
        variant="ghost"
      >
        <Link to="/sign-in">Fazer login</Link>
      </Button>
      <div className="flex w-[450px] flex-col justify-center gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-muted-foreground text-lg">
            Começe já a entender seu negócio
          </p>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register("restaurantName")}
            />
            {errors.restaurantName?.message && (
              <p className="text-start text-red-700">
                {errors.restaurantName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="" {...register("managerName")} />
            {errors.managerName?.message && (
              <p className="text-start text-red-700">
                {errors.managerName?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-email</Label>
            <Input id="email" type="" {...register("email")} />
            {errors.email?.message && (
              <p className="text-start text-red-700">{errors.email?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Seu telefone</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone?.message && (
              <p className="text-start text-red-700">{errors.phone?.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="h-11 w-full cursor-pointer"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>
          <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
            Ao continuar, você concorda com os nossos{" "}
            <a href="#" className="underline underline-offset-4">
              termos de serviço
            </a>{" "}
            e
            <a href="#" className="underline underline-offset-4">
              {" "}
              politicas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
