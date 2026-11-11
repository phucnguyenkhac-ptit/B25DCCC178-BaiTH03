import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute() {
  const { user } = useAuth()
  const { pathname, search, hash } = useLocation()

  return user
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: pathname + search + hash }} />
}
