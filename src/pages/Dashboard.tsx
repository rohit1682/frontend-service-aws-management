import { useNavigate } from 'react-router-dom'
import StatCard from '../components/dashboard/StatCard'
import WelcomeCard from '../components/dashboard/WelcomeCard'
import ActionCard, { QuickActionButton, ActivityItem } from '../components/dashboard/ActionCard'
import LogoImage from '../assets/Logo.png'

function Dashboard() {
  const navigate = useNavigate()

  const handleViewReports = () => {
    navigate('/reports')
  }

  const handleManageAccounts = () => {
    navigate('/accounts')
  }

  const handleStartOnboarding = () => {
    navigate('/user-onboard')
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <div className="mb-8">
          <WelcomeCard
            title="Welcome to Managed Serviced Portal"
            subtitle="Monitor your AWS infrastructure, manage accounts, and generate comprehensive reports from your unified dashboard."
            logoUrl={LogoImage}
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Accounts"
            value="12"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            animationDelay="0.6s"
          />

          <StatCard
            title="Active Users"
            value="247"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            animationDelay="0.8s"
          />

          <div className="md:col-span-2 lg:col-span-2">
            <StatCard
              title="Last Account Onboarded"
              value="bankify"
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              }
              iconBgColor="bg-yellow-100"
              iconColor="text-yellow-600"
              animationDelay="1.0s"
            />
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActionCard
            title="Quick Actions"
            subtitle="Access your most frequently used features and tools."
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            iconBgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            iconColor="text-white"
            animationDirection="left"
            animationDelay="0.6s"
          >
            <QuickActionButton
              label="View Reports"
              icon="📊"
              color="text-blue-600"
              onClick={handleViewReports}
            />
            <QuickActionButton
              label="Manage Accounts"
              icon="👥"
              color="text-green-600"
              onClick={handleManageAccounts}
            />
            <QuickActionButton
              label="Start Onboarding"
              icon="🚀"
              color="text-purple-600"
              onClick={handleStartOnboarding}
            />
          </ActionCard>

          <ActionCard
            title="Recent Activity"
            subtitle="Stay updated with your latest AWS activities and changes."
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            iconBgColor="bg-gradient-to-r from-green-500 to-green-600"
            iconColor="text-white"
            animationDirection="right"
            animationDelay="0.8s"
          >
            <ActivityItem
              title="EC2 instance started"
              time="2 minutes ago"
              status="success"
            />
            <ActivityItem
              title="New user added to account"
              time="1 hour ago"
              status="info"
            />
            <ActivityItem
              title="Cost threshold reached"
              time="3 hours ago"
              status="warning"
            />
          </ActionCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


