import React from "react"

import { RootStoreProvider } from "store/globals/root"

import ReactQueryProvider from "./ReactQueryProvider"
import { ThemeProvider } from "./ThemeProvider"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <RootStoreProvider>{children}</RootStoreProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}

export default HeadProvider
