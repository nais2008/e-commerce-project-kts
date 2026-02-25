import React from "react"

import { ReactQueryProvider } from "api/provider"

import { ThemeProvider } from "./ThemeProvider"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReactQueryProvider>
  )
}

export default HeadProvider
