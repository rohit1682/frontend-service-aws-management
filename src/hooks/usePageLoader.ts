import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux'
import { setLoading } from '../store/loadingSlice'

export const usePageLoader = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isLoading = useAppSelector((state) => state.loading.isLoading)

  useEffect(() => {
    // Show loader when route changes
    dispatch(setLoading(true))
    
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      dispatch(setLoading(false))
    }, 300) // Quick 300ms loader for smooth transitions

    return () => clearTimeout(timer)
  }, [location.pathname, dispatch])

  const showLoader = () => dispatch(setLoading(true))
  const hideLoader = () => dispatch(setLoading(false))

  return {
    isLoading,
    showLoader,
    hideLoader
  }
}