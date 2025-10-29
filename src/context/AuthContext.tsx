import { createContext, useContext, useMemo, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { type AuthContextValue } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { loginSuccess, logout as logoutAction, initializeAuth, setInitialized } from '../store/authSlice'
import { saveAuthState, loadAuthState, clearAuthState } from '../lib/storage'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, isInitialized } = useAppSelector((state) => state.auth)

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const storedAuthState = loadAuthState()
    if (storedAuthState) {
      dispatch(initializeAuth(storedAuthState))
    } else {
      dispatch(setInitialized())
    }
  }, [dispatch])

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      saveAuthState({ isAuthenticated, user })
    }
  }, [isAuthenticated, user])

  async function login(email: string, _password: string) {
    await new Promise((r) => setTimeout(r, 400))
    dispatch(loginSuccess({ email }))
  }

  function logout() {
    dispatch(logoutAction())
    clearAuthState()
  }

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, isInitialized, login, logout }),
    [isAuthenticated, isInitialized]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


