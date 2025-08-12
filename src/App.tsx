import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { ThemeProvider } from "./components/theme/ThemeProvider";

export function App() {
  return (
    <>
      <ThemeProvider storageKey="delivery-shop-theme" defaultTheme="dark">
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
