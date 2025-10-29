import { useNavigate } from 'react-router-dom'
import StatCard from '../components/dashboard/StatCard'
import WelcomeCard from '../components/dashboard/WelcomeCard'
import ActionCard, { QuickActionButton, ActivityItem } from '../components/dashboard/ActionCard'
import LogoImage from '../assets/Logo.png'
import { STAT_CARDS_DATA, RECENT_ACTIVITIES_DATA, STAT_CARD_CONFIGS } from '../constants/dashboard.tsx'

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
            title={STAT_CARDS_DATA[0].title}
            value={STAT_CARDS_DATA[0].value}
            icon={STAT_CARD_CONFIGS.totalAccounts.icon}
            iconBgColor={STAT_CARD_CONFIGS.totalAccounts.iconBgColor}
            iconColor={STAT_CARD_CONFIGS.totalAccounts.iconColor}
            animationDelay={STAT_CARD_CONFIGS.totalAccounts.animationDelay}
          />

          <StatCard
            title={STAT_CARDS_DATA[1].title}
            value={STAT_CARDS_DATA[1].value}
            icon={STAT_CARD_CONFIGS.activeUsers.icon}
            iconBgColor={STAT_CARD_CONFIGS.activeUsers.iconBgColor}
            iconColor={STAT_CARD_CONFIGS.activeUsers.iconColor}
            animationDelay={STAT_CARD_CONFIGS.activeUsers.animationDelay}
          />

          <div className="md:col-span-2 lg:col-span-2">
            <StatCard
              title={STAT_CARDS_DATA[2].title}
              value={STAT_CARDS_DATA[2].value}
              icon={STAT_CARD_CONFIGS.lastAccountOnboarded.icon}
              iconBgColor={STAT_CARD_CONFIGS.lastAccountOnboarded.iconBgColor}
              iconColor={STAT_CARD_CONFIGS.lastAccountOnboarded.iconColor}
              animationDelay={STAT_CARD_CONFIGS.lastAccountOnboarded.animationDelay}
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
            {RECENT_ACTIVITIES_DATA.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                time={activity.time}
                status={activity.status}
              />
            ))}
          </ActionCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


