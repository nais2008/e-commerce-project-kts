import type { RouteObject } from "react-router"

import { ROUTES } from "constants/routes"
import HeadProvider from "providers/HeadProvider"

import NotFound from "pages/NotFound"
import WelcomePage from "pages/WelcomePage"
import ProductPage from "pages/product/ProductPage"
import ProductsListPage from "pages/product/ProductsListPage"

import App from "../App"

export const routesConfig: RouteObject[] = [
  {
    path: ROUTES.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: ROUTES.products.mask,
        element: <ProductsListPage />,
      },
      {
        path: ROUTES.product.mask,
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <HeadProvider>
        <NotFound />
      </HeadProvider>
    ),
  },
]
