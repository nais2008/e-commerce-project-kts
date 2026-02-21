import React from "react"

import { ThemeProvider } from "./ThemeProvider"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default HeadProvider
