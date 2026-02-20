export const ROUTES = {
  main: {
    mask: "/",
    create: () => "/",
  },
  products: {
    mask: "/products",
    create: () => "/products",
  },
  product: {
    mask: "/products/:id",
    create: (id: string) => `/products/${id}`,
  },
  categories: {
    mask: "/categories",
    create: () => "/categories",
  },
}
