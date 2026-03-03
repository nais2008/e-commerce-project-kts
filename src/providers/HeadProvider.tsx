import React from "react"

import { AuthStoreContextProvider } from "./AuthProvider"
import { CartStoreProvider } from "./CartProvider"
import ReactQueryProvider from "./ReactQueryProvider"
import { ThemeProvider } from "./ThemeProvider"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <AuthStoreContextProvider>
          <CartStoreProvider>{children}</CartStoreProvider>
        </AuthStoreContextProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}

export default HeadProvider
