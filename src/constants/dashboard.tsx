
import { type StatCardProps, type ActivityItem } from '../types'

// Stat Cards Data
export const STAT_CARDS_DATA: Omit<StatCardProps, 'icon' | 'iconBgColor' | 'iconColor' | 'animationDelay'>[] = [
  {
    title: "Total Accounts",
    value: "12"
  },
  {
    title: "Active Users", 
    value: "247"
  },
  {
    title: "Last Account Onboarded",
    value: "bankify"
  }
]

// Recent Activities Data
export const RECENT_ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: "1",
    title: "EC2 instance started",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: "2", 
    title: "New user added to account",
    time: "1 hour ago",
    status: "info"
  },
  {
    id: "3",
    title: "Cost threshold reached", 
    time: "3 hours ago",
    status: "warning"
  }
]

// Stat Card Icons and Styling Configuration
export const STAT_CARD_CONFIGS = {
  totalAccounts: {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    animationDelay: "0.6s"
  },
  activeUsers: {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600", 
    animationDelay: "0.8s"
  },
  lastAccountOnboarded: {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    animationDelay: "1.0s"
  }
}