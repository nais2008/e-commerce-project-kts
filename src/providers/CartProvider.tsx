/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect } from "react"

import { useAuthStore } from "hooks/globalStores"
import { useLocalStore } from "hooks/useLocalStore"
import { useStrictContext } from "hooks/useStrictContext"
import CartStore from "store/CartStore"

const CartStoreContext = createContext<CartStore | null>(null)

interface CartStoreProviderProps {
  children: React.ReactNode
}

export const CartStoreProvider: React.FC<CartStoreProviderProps> = ({
  children,
}) => {
  const authStore = useAuthStore()
  const cartStore = useLocalStore(() => new CartStore())

  useEffect(() => {
    if (authStore.jwt) {
      // cartStore.setJwt(authStore.jwt)
    } else {
      // cartStore.setJwt(null)
    }
  }, [authStore.jwt, cartStore])

  return (
    <CartStoreContext.Provider value={cartStore}>
      {children}
    </CartStoreContext.Provider>
  )
}

export const useCartStore = (): CartStore => {
  return useStrictContext({
    context: CartStoreContext,
    message: "useCartStore must be used within a CartStoreProvider",
  })
}
