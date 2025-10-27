type WelcomeCardProps = {
  title: string
  subtitle: string
  logoUrl: string
  className?: string
}

function WelcomeCard({ title, subtitle, logoUrl, className = '' }: WelcomeCardProps) {
  return (
    <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group ${className}`}>
      <div className="text-center">
        {/* Logo and Welcome */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-700 to-gray-800 rounded-2xl mb-6 animate-bounce hover:scale-110 transition-transform duration-300">
          <img src={logoUrl} alt="Workmates Logo" className="w-12 h-12" />
        </div>
        
        <h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up hover:text-slate-700 transition-colors duration-300" 
          style={{ animationDelay: '0.2s' }}
        >
          {title}
        </h1>
        
        <p 
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up hover:text-gray-700 transition-colors duration-300" 
          style={{ animationDelay: '0.4s' }}
        >
          {subtitle}
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  )
}

export default WelcomeCard
