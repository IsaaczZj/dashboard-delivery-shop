import { Outlet } from "react-router";
import { Header } from "../Header";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header/>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <Outlet />
      </div>
    </div>
  );
}
