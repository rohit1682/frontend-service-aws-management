import { type ReactNode } from 'react'

// Dashboard Card Types
export type StatCardProps = {
  title: string
  value: string | number
  icon: ReactNode
  iconBgColor: string
  iconColor: string
  animationDelay?: string
  className?: string
}

export type WelcomeCardProps = {
  title: string
  subtitle: string
  logoUrl: string
  className?: string
}

export type ActionCardProps = {
  title: string
  subtitle: string
  icon: ReactNode
  iconBgColor: string
  iconColor: string
  animationDirection: 'left' | 'right'
  animationDelay?: string
  className?: string
  children?: ReactNode
}

// Action Item Types
export type ActionItem = {
  id: string
  label: string
  icon: string
  color: string
  onClick?: () => void
}

export type ActivityItem = {
  id: string
  title: string
  time: string
  status: 'success' | 'info' | 'warning' | 'error'
}

// Quick Action Button Types
export type QuickActionButtonProps = {
  label: string
  icon: string
  color: string
  onClick?: () => void
  href?: string
}

// Activity Item Types
export type ActivityItemProps = {
  title: string
  time: string
  status: 'success' | 'info' | 'warning' | 'error'
}
