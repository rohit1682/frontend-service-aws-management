import { ReactNode } from 'react'

type StatCardProps = {
  title: string
  value: string | number
  icon: ReactNode
  iconBgColor: string
  iconColor: string
  animationDelay?: string
  className?: string
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBgColor, 
  iconColor, 
  animationDelay = '0s',
  className = ''
}: StatCardProps) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-slide-in-up border border-gray-100 hover:border-gray-200 ${className}`}
      style={{ animationDelay }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
          <div className={`w-6 h-6 ${iconColor} transition-colors duration-300`}>
            {icon}
          </div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
    </div>
  )
}

export default StatCard
