import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
  message?: string
}

const initialState: LoadingState = {
  isLoading: false,
  message: undefined
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setLoadingWithMessage: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading
      state.message = action.payload.message
    },
    clearLoading: (state) => {
      state.isLoading = false
      state.message = undefined
    }
  }
})

export const { setLoading, setLoadingWithMessage, clearLoading } = loadingSlice.actions
export default loadingSlice.reducer