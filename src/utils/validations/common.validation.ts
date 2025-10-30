import type { ValidationResult, ValidationRule, FormValidationConfig } from '../../interfaces/common/commonInterfaceExports'

/**
 * Generic form validation utility
 */
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  config: FormValidationConfig<T>
): ValidationResult => {
  const errors: Record<string, string> = {}

  // Run field-level validations
  for (const rule of config.rules) {
    const fieldValue = formData[rule.field]
    const error = rule.validator(fieldValue, formData)
    
    if (error) {
      errors[rule.field as string] = error
    }
  }

  // Run custom validators
  if (config.customValidators) {
    for (const customValidator of config.customValidators) {
      const customErrors = customValidator(formData)
      Object.assign(errors, customErrors)
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Common validation rules
 */
export const commonValidators = {
  required: (value: any): string | null => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required'
    }
    if (Array.isArray(value) && value.length === 0) {
      return 'This field is required'
    }
    if (typeof value === 'string' && value.trim() === '') {
      return 'This field is required'
    }
    return null
  },

  minLength: (min: number) => (value: string): string | null => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max: number) => (value: string): string | null => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  },

  email: (value: string): string | null => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  pattern: (regex: RegExp, message: string) => (value: string): string | null => {
    if (value && !regex.test(value)) {
      return message
    }
    return null
  },

  fileSize: (maxSizeInBytes: number) => (file: File): string | null => {
    if (file && file.size > maxSizeInBytes) {
      const maxSizeInMB = maxSizeInBytes / (1024 * 1024)
      return `File size must be less than ${maxSizeInMB}MB`
    }
    return null
  },

  fileType: (allowedTypes: string[]) => (file: File): string | null => {
    if (file && !allowedTypes.includes(file.type)) {
      return `File type must be one of: ${allowedTypes.join(', ')}`
    }
    return null
  }
}