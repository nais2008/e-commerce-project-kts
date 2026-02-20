import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { routesConfig } from "config/routes.tsx"

import "./index.scss"

const queryClient = new QueryClient()

const router = createBrowserRouter(routesConfig)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
