import type { ReportFormData, ReportFormErrors } from '../../interfaces/forms/formInterfaceExports'
import type { ValidationResult, FormValidationConfig } from '../../interfaces/common/commonInterfaceExports'
import { validateForm, commonValidators } from './common.validation'

/**
 * Report form specific validators
 */
export const reportValidators = {
  accountId: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Please select an account'
    return null
  },

  startMonth: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Please select start month'
    return null
  },

  startYear: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Please select start year'
    return null
  },

  endMonth: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Please select end month'
    return null
  },

  endYear: (value: string): string | null => {
    const requiredError = commonValidators.required(value)
    if (requiredError) return 'Please select end year'
    return null
  }
}

/**
 * Custom validator for date range
 */
export const validateDateRange = (formData: ReportFormData): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (formData.startYear && formData.endYear && formData.startMonth && formData.endMonth) {
    const startDate = new Date(parseInt(formData.startYear), parseInt(formData.startMonth) - 1)
    const endDate = new Date(parseInt(formData.endYear), parseInt(formData.endMonth) - 1)
    
    if (startDate > endDate) {
      errors.dateRange = 'Start date cannot be after end date'
    }
  }

  return errors
}

/**
 * Report form validation configuration
 */
export const reportFormValidationConfig: FormValidationConfig<ReportFormData> = {
  rules: [
    {
      field: 'accountId',
      validator: reportValidators.accountId
    },
    {
      field: 'startMonth',
      validator: reportValidators.startMonth
    },
    {
      field: 'startYear',
      validator: reportValidators.startYear
    },
    {
      field: 'endMonth',
      validator: reportValidators.endMonth
    },
    {
      field: 'endYear',
      validator: reportValidators.endYear
    }
  ],
  customValidators: [validateDateRange]
}

/**
 * Validate report form data
 */
export const validateReportForm = (formData: ReportFormData): ValidationResult => {
  return validateForm(formData, reportFormValidationConfig)
}

/**
 * Generate month options for dropdowns
 */
export const getMonthOptions = () => [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
]

/**
 * Generate year options for dropdowns
 */
export const getYearOptions = (yearsBack: number = 5) => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: yearsBack + 1 }, (_, i) => {
    const year = currentYear - i
    return { value: year.toString(), label: year.toString() }
  })
}