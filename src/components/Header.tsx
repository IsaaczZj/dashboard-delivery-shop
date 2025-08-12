import { CookingPot, Home, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./theme/ThemeToggle";
import { AccontMenu } from "./AccontMenu";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <CookingPot className="size-6" />
        <Separator className="h-6" orientation="vertical" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="size-5" />
            Inicio
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="size-5" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <AccontMenu />
        </div>
      </div>
    </div>
  );
}
