import type { LoginFormData } from '../../interfaces/forms'
import type { ValidationResult, FormValidationConfig } from '../../interfaces/common'
import { validateForm, commonValidators } from './common.validation'

/**
 * Login form specific validators
 */
export const loginValidators = {
  email: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Email is required'

    const emailError = commonValidators.email(value)
    if (emailError) return emailError

    return null
  },

  password: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Password is required'

    const minLengthError = commonValidators.minLength(6)(value)
    if (minLengthError) return 'Password must be at least 6 characters'

    return null
  }
}

/**
 * Login form validation configuration
 */
export const loginFormValidationConfig: FormValidationConfig<LoginFormData> = {
  rules: [
    {
      field: 'email',
      validator: loginValidators.email
    },
    {
      field: 'password',
      validator: loginValidators.password
    }
  ]
}

/**
 * Validate login form data
 */
export const validateLoginForm = (formData: LoginFormData): ValidationResult => {
  return validateForm(formData, loginFormValidationConfig)
}