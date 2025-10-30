import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

interface User {
  email: string
  sessionId: string
  loginTime: number
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isInitialized: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isInitialized: false,
  isLoading: false,
  error: null,
}

// Session management utilities
const SESSION_STORAGE_KEY = 'auth_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface SessionData {
  user: User
  isAuthenticated: boolean
  expiresAt: number
}

const saveSession = (user: User) => {
  const sessionData: SessionData = {
    user,
    isAuthenticated: true,
    expiresAt: Date.now() + SESSION_DURATION
  }
  
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData))
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData))
  } catch (error) {
    console.error('Failed to save session:', error)
  }
}

const loadSession = (): SessionData | null => {
  try {
    // Try sessionStorage first (cleared on tab close)
    let stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
    
    // If not in sessionStorage, try localStorage (persists across sessions)
    if (!stored) {
      stored = localStorage.getItem(SESSION_STORAGE_KEY)
      
      // If found in localStorage, restore to sessionStorage
      if (stored) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, stored)
      }
    }
    
    if (stored) {
      const sessionData: SessionData = JSON.parse(stored)
      
      // Check if session is expired
      if (Date.now() > sessionData.expiresAt) {
        clearSession()
        return null
      }
      
      return sessionData
    }
  } catch (error) {
    console.error('Failed to load session:', error)
    clearSession()
  }
  
  return null
}

const clearSession = () => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
    localStorage.removeItem(SESSION_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear session:', error)
  }
}

const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Async thunks
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    const sessionData = loadSession()
    return sessionData
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simple validation (in real app, this would be API validation)
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      // Create user session
      const user: User = {
        email,
        sessionId: generateSessionId(),
        loginTime: Date.now()
      }
      
      // Save session
      saveSession(user)
      
      return user
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      return rejectWithValue(message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    clearSession()
    return null
  }
)

// Tab close detection
let isTabClosing = false

const handleBeforeUnload = () => {
  isTabClosing = true
  // Clear session on tab close
  clearSession()
}

const handlePageShow = () => {
  isTabClosing = false
}

// Set up tab close detection
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('pageshow', handlePageShow)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    refreshSession: (state) => {
      if (state.user) {
        saveSession(state.user)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Initialize auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true
        state.isInitialized = false
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.isInitialized = true
        
        if (action.payload) {
          state.isAuthenticated = true
          state.user = action.payload.user
        } else {
          state.isAuthenticated = false
          state.user = null
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false
        state.isInitialized = true
        state.isAuthenticated = false
        state.user = null
      })
      
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = null
      })
  },
})

export const { clearError, refreshSession } = authSlice.actions
export default authSlice.reducer