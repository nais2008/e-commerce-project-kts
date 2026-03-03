import React from "react"
import { Navigate, Outlet } from "react-router"

import { ROUTES } from "constants/routes"
import { useLocalStore } from "hooks/useLocalStore"
import { observer } from "mobx-react-lite"
import AuthStore from "store/AuthStore"

const ProtectedRoute: React.FC = observer(() => {
  const store = useLocalStore(() => new AuthStore())

  if (!store.isAuthenticated) {
    return <Navigate to={ROUTES.login.mask} replace />
  }

  return <Outlet />
})

export default ProtectedRoute
