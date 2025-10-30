import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SidebarLayout from './layouts/SidebarLayout'
import { useAuth } from './hooks/useAuth'
import { usePageLoader } from './hooks/usePageLoader'
import ScrollToTop from './components/ScrollToTop'
import Loader from './utils/Loader'
import './App.css'

function App() {
  const { isAuthenticated } = useAuth()
  const { isLoading } = usePageLoader()
  const location = useLocation()

  // Show loader during page transitions
  if (isLoading) {
    return <Loader fullScreen />
  }

  // If user is not authenticated and not on login page, redirect to login
  if (!isAuthenticated && location.pathname !== '/login') {
    return (
      <>
        <ScrollToTop />
        <Navigate to="/login" replace />
      </>
    )
  }

  // If user is authenticated and on root path, redirect to dashboard
  if (isAuthenticated && location.pathname === '/') {
    return (
      <>
        <ScrollToTop />
        <Navigate to="/dashboard" replace />
      </>
    )
  }

  // If user is authenticated, show the full layout with sidebar
  if (isAuthenticated) {
    return (
      <>
        <ScrollToTop />
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      </>
    )
  }

  // If user is on login page, show without sidebar
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

export default App
