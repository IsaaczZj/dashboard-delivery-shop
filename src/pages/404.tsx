import { Link } from "react-router";
import notFound from "@/assets/img-notfound.svg";
import { Button } from "@/components/ui/button";
export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 px-4">
      <h1 className="text-center text-4xl font-bold">Página não encontrada</h1>
      <img src={notFound} alt="" className="my-4 h-[70vh] text-white" />
      <Button asChild className="h-12 w-[300px]">
        <Link to="/">Voltar </Link>
      </Button>
    </div>
  );
}
