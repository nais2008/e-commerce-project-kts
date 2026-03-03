/* eslint-disable react-refresh/only-export-components */
import React from "react"

import { useLocalStore } from "hooks/useLocalStore"
import { useStrictContext } from "hooks/useStrictContext"
import AuthStore from "store/AuthStore"

const AuthStoreContext = React.createContext<AuthStore | null>(null)

interface AuthStoreContextProviderProps {
  children: React.ReactNode
}

export const AuthStoreContextProvider: React.FC<
  AuthStoreContextProviderProps
> = ({ children }) => {
  const store = useLocalStore(() => new AuthStore())

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthStore = () => {
  return useStrictContext({
    context: AuthStoreContext,
    message: "AuthStoreContext was not provided",
  })
}
