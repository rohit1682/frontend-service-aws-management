import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook that scrolls to top whenever the route changes
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}