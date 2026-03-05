import React from "react"

import { RootStoreProvider } from "store/globals/root"

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
        <CartStoreProvider>
          <RootStoreProvider>{children}</RootStoreProvider>
        </CartStoreProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}

export default HeadProvider
