import type { RouteObject } from "react-router"

import { ROUTES } from "constants/routes"
import HeadProvider from "providers/HeadProvider"

import ProtectedRoute from "components/utils/ProtectedRoute"

import CartPage from "pages/CartPage"
import NotFound from "pages/NotFound"
import WelcomePage from "pages/WelcomePage"
import LoginPage from "pages/auth/LoginPage"
import MePage from "pages/auth/MePage"
import RegisterPage from "pages/auth/RegisterPage"
import CategoriesList from "pages/categories/CategoriesList"
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
      {
        path: ROUTES.login.mask,
        element: <LoginPage />,
      },
      {
        path: ROUTES.register.create(),
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.categories.mask,
            element: <CategoriesList />,
          },
          {
            path: ROUTES.cart.mask,
            element: <CartPage />,
          },
          {
            path: ROUTES.profile.mask,
            element: <MePage />,
          },
        ],
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
