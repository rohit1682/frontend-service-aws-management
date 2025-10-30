export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface ValidationRule<T = any> {
  field: keyof T
  validator: (value: any, formData?: T) => string | null
  message?: string
}

export interface FormValidationConfig<T = any> {
  rules: ValidationRule<T>[]
  customValidators?: Array<(formData: T) => Record<string, string>>
}