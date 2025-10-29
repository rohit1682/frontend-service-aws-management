import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SidebarLayout from './layouts/SidebarLayout'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { isAuthenticated, isInitialized } = useAuth()
  const location = useLocation()

  // Show loading spinner while initializing auth state
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

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
