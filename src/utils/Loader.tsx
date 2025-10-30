interface LoaderProps {
  message?: string
  fullScreen?: boolean
}

const Loader = ({ 
  message = 'Loading...',
  fullScreen = false
}: LoaderProps) => {
  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-gray-50'
    : 'flex items-center justify-center p-4'

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  )
}

export default Loader