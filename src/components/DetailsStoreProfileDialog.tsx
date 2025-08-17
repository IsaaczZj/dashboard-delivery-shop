import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagerRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setProfileSchame,
  type SetProfileSchema,
} from "@/schemas/setProfileSchema";

export function DetailsStoresProfileDialog() {
  const { data: managedRestuarant } = useQuery({
    queryFn: getManagerRestaurant,
    queryKey: ["managed-restaurant"],
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SetProfileSchema>({
    resolver: zodResolver(setProfileSchame),
    values: {
      name: managedRestuarant?.name ?? "",
      description: managedRestuarant?.description ?? "",
    },
  });

  function updateProfileRestaurant(data: SetProfileSchema) {
    console.log(data);
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do perfil da sua loja abaixo.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(updateProfileRestaurant)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-7">
            <Label className="inline text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>
          {errors.name?.message && (
            <p className="text-destructive ml-10 text-center text-sm">
              {errors.name.message}
            </p>
          )}
          <div className="grid grid-cols-4 items-center gap-7">
            <Label className="inline text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
          {errors.description?.message && (
            <p className="text-destructive ml-10 text-center text-sm">
              {errors.description.message}
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
