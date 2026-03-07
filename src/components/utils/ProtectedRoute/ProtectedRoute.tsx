import React from "react"
import { Navigate, Outlet } from "react-router"

import { ROUTES } from "constants/routes"
import { useAuthStore } from "hooks/globalStores"
import { observer } from "mobx-react-lite"

const ProtectedRoute: React.FC = observer(() => {
  const store = useAuthStore()

  if (!store.isAuthenticated) {
    return <Navigate to={ROUTES.login.mask} replace />
  }

  return <Outlet />
})

export default ProtectedRoute
