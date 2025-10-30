import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { loginUser, logoutUser, initializeAuth, clearError } from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, isInitialized, isLoading, error } = useAppSelector(state => state.auth)

  const login = useCallback(async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }))
    return loginUser.fulfilled.match(result)
  }, [dispatch])

  const logout = useCallback(async () => {
    await dispatch(logoutUser())
  }, [dispatch])

  const initialize = useCallback(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  const clearAuthError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    // State
    isAuthenticated,
    user,
    isInitialized,
    isLoading,
    error,
    
    // Actions
    login,
    logout,
    initialize,
    clearError: clearAuthError
  }
}