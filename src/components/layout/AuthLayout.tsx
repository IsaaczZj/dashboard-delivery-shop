import { CookingPot } from "lucide-react";
import { Outlet } from "react-router";
import img from "@/assets/img-login.svg";
export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 overflow-hidden">
      <div className="border-foreground/5 bg-muted text-muted-foreground flex h-full flex-col justify-between border-r p-10">
        <div className="text-foreground flex items-center gap-3 text-lg font-medium">
          <CookingPot className="size-7" />
          <span className="text-xl font-semibold">Delivery Shop</span>
        </div>
        <img src={img} className="max-h-[70vh] w-auto" />

        <span>
          Painel do parceiro &copy; Delivery Shop - {new Date().getFullYear()}
        </span>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
