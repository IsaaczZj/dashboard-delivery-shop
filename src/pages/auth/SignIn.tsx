import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignIn() {
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-email</Label>
            <Input id="email" type="email" />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
