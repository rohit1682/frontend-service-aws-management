import { type ActionCardProps, type QuickActionButtonProps, type ActivityItemProps } from '../../types'

function ActionCard({ 
  title, 
  subtitle, 
  icon, 
  iconBgColor, 
  iconColor, 
  animationDirection,
  animationDelay = '0s',
  className = '',
  children
}: ActionCardProps) {
  const animationClass = animationDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 ${animationClass} border border-gray-100 hover:border-gray-200 group cursor-pointer ${className}`}
      style={{ animationDelay }}
    >
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <div className={`w-6 h-6 ${iconColor} transition-colors duration-300`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors duration-300">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{subtitle}</p>
      
      {children && (
        <div className="space-y-3">
          {children}
        </div>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
    </div>
  )
}

// Quick Action Button Component
function QuickActionButton({ label, icon, color, onClick, href }: QuickActionButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 flex items-center group/button hover:shadow-md hover:scale-[1.02] cursor-pointer"
    >
      <span className={`${color} mr-3 text-lg group-hover/button:scale-110 transition-transform duration-300`}>{icon}</span>
      <span className="group-hover/button:text-gray-800 transition-colors duration-300">{label}</span>
    </button>
  )
}

// Activity Item Component
function ActivityItem({ title, time, status }: ActivityItemProps) {
  const statusColors = {
    success: 'bg-green-50 border-green-400 text-green-400',
    info: 'bg-blue-50 border-blue-400 text-blue-400',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-400',
    error: 'bg-red-50 border-red-400 text-red-400'
  }
  
  return (
    <div className={`flex items-center p-3 rounded-xl ${statusColors[status]} border-l-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02] group/activity`}>
      <div className={`w-2 h-2 ${statusColors[status].split(' ')[2]} rounded-full mr-3 group-hover/activity:scale-125 transition-transform duration-300`}></div>
      <div>
        <p className="text-sm font-medium text-gray-900 group-hover/activity:text-gray-800 transition-colors duration-300">{title}</p>
        <p className="text-xs text-gray-500 group-hover/activity:text-gray-600 transition-colors duration-300">{time}</p>
      </div>
    </div>
  )
}

export default ActionCard
export { QuickActionButton, ActivityItem }
