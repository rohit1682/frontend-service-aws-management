export interface ReportFormData {
  accountId: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
}

export interface ReportFormErrors {
  accountId?: string
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  dateRange?: string
}

export interface DropdownOption {
  value: string
  label: string
}

export interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  icon: React.ReactNode
  searchable?: boolean
  error?: boolean
}