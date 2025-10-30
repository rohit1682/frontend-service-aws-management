import type { Account } from '../../constants/accounts'

export interface AccountFormData {
  accountName: string
  accountId: string
  activeRegions: string[]
}

export interface AccountFormSubmissionData extends AccountFormData {
  logoFile?: File
}

export interface AccountFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (accountData: AccountFormSubmissionData) => Promise<void>
  account?: Account
  title: string
  mode: 'create' | 'update'
}

export interface AccountFormErrors {
  accountName?: string
  accountId?: string
  activeRegions?: string
  logo?: string
  general?: string
}