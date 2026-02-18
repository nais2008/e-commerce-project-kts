export const ENDPOINTS = {
  product: {
    list: () => "/products",
    byId: (id: number) => `/products/${id}`,
  },
  categorized: {
    list: () => "product-categories",
    byId: (id: number) => `/product-categories/${id}`,
  },
  auth: {
    login: () => "/auth/local",
    register: () => "/auth/local/register",
  }
}
