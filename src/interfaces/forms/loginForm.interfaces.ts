export interface LoginFormData {
  email: string
  password: string
}

export interface LoginFormState {
  loading: boolean
  error: string | null
}