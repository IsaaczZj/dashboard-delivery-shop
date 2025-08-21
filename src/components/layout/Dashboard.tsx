import { Outlet, useNavigate } from "react-router";
import { Header } from "../Header";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { error } from "console";
import { AxiosError } from "axios";

export function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          const code = error.response?.data.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            navigate("/auth", { replace: true });
          }
        }
      },
    );
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8">
        <Outlet />
      </div>
    </div>
  );
}
