import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";
import ContextProvider from "./Context/AuthProvider/ContextProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
