// Auth Context Types
export type AuthContextValue = {
  isAuthenticated: boolean
  isInitialized: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Auth Component Types
export type TextFieldProps = {
  label: string
  id: string
  error?: string | null
} & React.InputHTMLAttributes<HTMLInputElement>

export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
