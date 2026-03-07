import { useRootStore } from "store/globals/root"

export const useAuthStore = () => useRootStore().authStore
export const useCategoriesStore = () => useRootStore().categoriesStore
export const useQueryParamsStore = () => useRootStore().queryParamsStore
export const useCartStore = () => useRootStore().cartStore
