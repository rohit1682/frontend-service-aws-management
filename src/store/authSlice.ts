import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: {
    email: string
  } | null
  isInitialized: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isInitialized = true
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.isInitialized = true
    },
    initializeAuth: (state, action: PayloadAction<{ isAuthenticated: boolean; user: { email: string } | null }>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user
      state.isInitialized = true
    },
    setInitialized: (state) => {
      state.isInitialized = true
    },
  },
})

export const { loginSuccess, logout, initializeAuth, setInitialized } = authSlice.actions
export default authSlice.reducer