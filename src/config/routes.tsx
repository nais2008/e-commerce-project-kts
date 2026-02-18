import type { RouteObject } from "react-router"

import { ROUTES } from "constants/routes"
import IndexPage from "pages/index"
import NotFound from "pages/not-found"
import ProductsListPage from "pages/product/list"

import App from "../App"

export const routesConfig: RouteObject[] = [
  {
    path: ROUTES.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: ROUTES.products.mask,
        element: <ProductsListPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]
