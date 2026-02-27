import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router"

import "config/configureMobX"
import { routesConfig } from "config/routes.tsx"

import "./index.scss"

const router = createBrowserRouter(routesConfig)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
