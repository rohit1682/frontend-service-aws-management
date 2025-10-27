import { type ReactNode } from 'react'

// Navigation Types
export type NavItem = {
  to?: string
  label: string
  end?: boolean
  icon?: ReactNode
  onClick?: () => void
}

export type NavOptionsProps = {
  items: NavItem[]
  className?: string
  onItemClick?: () => void
}
