import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/profile-store/get-profile";
import { getManagerRestaurant } from "@/api/profile-store/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { DetailsStoresProfileDialog } from "./DetailsStoreProfileDialog";

import { logout } from "@/api/profile-store/logout";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function AccontMenu() {
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { data: managedRestuarant, isLoading: isLoadingManagerRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagerRestaurant,
      staleTime: Infinity,
    });

  const { mutateAsync: singOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/auth", { replace: true });
      toast.success("Até a proxima");
    },
  });

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 select-none"
            >
              {isLoadingManagerRestaurant ? (
                <Skeleton className="h-4 w-30" />
              ) : (
                managedRestuarant?.name
              )}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex w-56 flex-col gap-1.5"
          >
            <DropdownMenuLabel className="flex flex-col">
              {isLoadingProfile ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-30" />
                </div>
              ) : (
                <>
                  <span>{profile?.name}</span>
                  <span className="text-muted-foreground text-xs font-normal">
                    {profile?.email}
                  </span>
                </>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger>
              <DropdownMenuItem>
                <Building className="size-5" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem disabled={isSigningOut} asChild>
              <button onClick={() => singOutFn()} className="w-full">
                <LogOut className="size-5" color="#e7000b" />
                <span className="text-[#e7000b]">Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DetailsStoresProfileDialog />
      </Dialog>
    </>
  );
}
