import "react-loading-skeleton/dist/skeleton.css"
import { Outlet } from "react-router"

import HeadProvider from "providers/HeadProvider"

import Layout from "./components/layout/Layout"

function App() {
  return (
    <HeadProvider>
      <Layout>
        <Outlet />
      </Layout>
    </HeadProvider>
  )
}

export default App
