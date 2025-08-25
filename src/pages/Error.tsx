import { Link, useRouteError } from "react-router";
import notFound from "@/assets/img-notfound.svg";
import { Button } from "@/components/ui/button";
export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 px-4">
      <h1 className="text-center text-4xl font-bold">
        Whooops, algo aconteceu
      </h1>
      <p className="text-accent-foreground">
        Um erro aconteceu, olhe os detalhes abaixo
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <img src={notFound} alt="" className="my-4 h-[70vh] text-white" />
      <Button asChild className="h-12 w-[300px]">
        <Link to="/">Voltar </Link>
      </Button>
    </div>
  );
}
