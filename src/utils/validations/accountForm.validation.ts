import type { AccountFormData, AccountFormErrors } from '../../interfaces/forms'
import type { ValidationResult, FormValidationConfig } from '../../interfaces/common'
import { validateForm, commonValidators } from './common.validation'

/**
 * Account form specific validators
 */
export const accountValidators = {
  accountName: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return requiredError

    const minLengthError = commonValidators.minLength(2)(value)
    if (minLengthError) return minLengthError

    return null
  },

  accountId: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return requiredError

    const patternError = commonValidators.pattern(
      /^\d{12}$/,
      'Account ID must be exactly 12 digits'
    )(value)
    if (patternError) return patternError

    return null
  },

  activeRegions: (value: string[]): string | null => {
    if (!value || value.length === 0) {
      return 'At least one region must be selected'
    }
    return null
  },

  logoFile: (file: File | null): string | null => {
    if (!file) return null

    const sizeError = commonValidators.fileSize(2 * 1024 * 1024)(file) // 2MB
    if (sizeError) return sizeError

    const typeError = commonValidators.fileType([
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif'
    ])(file)
    if (typeError) return typeError

    return null
  }
}

/**
 * Account form validation configuration
 */
export const getAccountFormValidationConfig = (mode: 'create' | 'update'): FormValidationConfig<AccountFormData> => ({
  rules: [
    {
      field: 'accountName',
      validator: accountValidators.accountName
    },
    ...(mode === 'create' ? [{
      field: 'accountId' as keyof AccountFormData,
      validator: accountValidators.accountId
    }] : []),
    {
      field: 'activeRegions',
      validator: accountValidators.activeRegions
    }
  ]
})

/**
 * Validate account form data
 */
export const validateAccountForm = (
  formData: AccountFormData,
  mode: 'create' | 'update',
  logoFile?: File | null
): ValidationResult => {
  const config = getAccountFormValidationConfig(mode)
  const result = validateForm(formData, config)

  // Validate logo file separately if provided
  if (logoFile) {
    const logoError = accountValidators.logoFile(logoFile)
    if (logoError) {
      result.errors.logo = logoError
      result.isValid = false
    }
  }

  return result
}

/**
 * Parse active regions from string format
 */
export const parseActiveRegions = (activeRegions?: string): string[] => {
  if (!activeRegions || activeRegions.trim() === '') return []

  try {
    // Try to parse as JSON array first
    const parsed = JSON.parse(activeRegions)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // If not JSON, treat as comma-separated string
    return activeRegions.split(',').map(r => r.trim()).filter(r => r)
  }

  return [activeRegions]
}