import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpForm, type SignUpForm } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { log } from "console";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpForm) });

  const navigate = useNavigate();

  const { mutateAsync: restaurants } = useMutation({
    mutationFn: registerRestaurant,
  });
  async function handleLogin(data: SignUpForm) {
    try {
      await restaurants({
        restaurantName: data.restaurantName,
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
      });
      toast.success("Restaurante cadastrado com sucesso");
      navigate(`/sign-in?email=${data.email}`);
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
      console.log(error)
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
