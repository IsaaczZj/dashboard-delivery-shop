import { Pizza } from "lucide-react";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="border-foreground/5 bg-muted text-muted-foreground flex h-full flex-col justify-between border-r p-10">
        <div className="text-foreground flex items-center gap-3 text-lg font-medium">
          <Pizza className="size-7" />
          <span className="text-xl font-semibold">Pizza Shop</span>
        </div>
        <span>
          Painel do parceiro &copy; Delivery Shop - {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
