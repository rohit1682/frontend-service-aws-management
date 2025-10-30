import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export const useAuthWithNavigation = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const loginWithNavigation = useCallback(async (email: string, password: string) => {
    const success = await auth.login(email, password)
    
    if (success) {
      navigate('/dashboard')
    }
    
    return success
  }, [auth.login, navigate])

  const logoutWithNavigation = useCallback(async () => {
    await auth.logout()
    navigate('/login')
  }, [auth.logout, navigate])

  return {
    ...auth,
    login: loginWithNavigation,
    logout: logoutWithNavigation
  }
}