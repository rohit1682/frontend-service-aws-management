const AUTH_STORAGE_KEY = 'auth_state'

export interface StoredAuthState {
  isAuthenticated: boolean
  user: {
    email: string
  } | null
}

export const saveAuthState = (authState: StoredAuthState): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
  } catch (error) {
    console.error('Failed to save auth state to localStorage:', error)
  }
}

export const loadAuthState = (): StoredAuthState | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load auth state from localStorage:', error)
  }
  return null
}

export const clearAuthState = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear auth state from localStorage:', error)
  }
}