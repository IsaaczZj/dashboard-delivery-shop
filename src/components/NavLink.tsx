import { Link, useLocation, type LinkProps } from "react-router";

interface NavLinkProps extends LinkProps {}
export function NavLink({ ...props }: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-2 text-sm font-medium"
      {...props}
    />
  );
}
