import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { getManagerRestaurant } from "@/api/profile-store/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileT,
} from "@/schemas/updateProfileSchema";
import { updateProfile } from "@/api/profile-store/update-profile";
import { toast } from "sonner";

export function DetailsStoresProfileDialog() {
  const { data: managedRestuarant } = useQuery({
    queryFn: getManagerRestaurant,
    queryKey: ["managed-restaurant"],
    staleTime: Infinity,
  });

  function updateManagerRestaurantCache({
    name,
    description,
  }: UpdateProfileRequest) {
    const cached = queryClient.getQueryData<UpdateProfileRequest>([
      "managed-restaurant",
    ]);
    if (cached) {
      queryClient.setQueryData<UpdateProfileRequest>(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }
    return { cached };
  }

  const queryClient = useQueryClient();
  const { mutateAsync: updateProfileMutate, isPending } = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["managed-restaurant"],
    onMutate: ({ name, description }) => {
      const { cached } = updateManagerRestaurantCache({
        name,
        description,
      });
      toast.success("Perfil atualizado com sucesso!");
      return { previousCache: cached };
    },
    onError: (_, __, context) => {
      if (context?.previousCache) {
        updateManagerRestaurantCache(context.previousCache);
      }
      toast.error("Falha ao atualizar o perfil, tente novamente");
    },
  });
  async function handleUpdateProfile(data: UpdateProfileT) {
    updateProfileMutate(data);
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateProfileT>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: managedRestuarant?.name ?? "",
      description: managedRestuarant?.description ?? "",
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do perfil da sua loja abaixo.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
          <Button type="submit" variant="success" disabled={isPending}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
