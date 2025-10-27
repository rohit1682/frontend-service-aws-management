import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SidebarLayout from './layouts/SidebarLayout'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // If user is not authenticated and not on login page, redirect to login
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  // If user is authenticated and on root path, redirect to dashboard
  if (isAuthenticated && location.pathname === '/') {
    return <Navigate to="/dashboard" replace />
  }

  // If user is authenticated, show the full layout with sidebar
  if (isAuthenticated) {
    return (
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    )
  }

  // If user is on login page, show without sidebar
  return <Outlet />
}

export default App
