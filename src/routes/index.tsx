import { Dashboard } from "@/pages/app/Dashboard";
import { SignIn } from "@/pages/auth/SignIn";
import { AuthLayout } from "@/pages/layout/AuthLayout";
import { DashboardLayout } from "@/pages/layout/Dashboard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
