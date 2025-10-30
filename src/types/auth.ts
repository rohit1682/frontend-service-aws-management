// Auth Component Types
export type TextFieldProps = {
  label: string
  id: string
  error?: string | null
} & React.InputHTMLAttributes<HTMLInputElement>

export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
